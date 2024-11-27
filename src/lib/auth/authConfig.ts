import NextAuth from 'next-auth'; // User
import Google from 'next-auth/providers/google';
import Nodemailer from 'next-auth/providers/nodemailer';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/src/lib/prisma/client';
import SMTPCreds from '@/src/smtp/SMTPCreds';
import { sendVerificationRequest } from './sendVerificationRequest';
import { clearStaleTokens } from '@/src/lib/auth/clearStaleTokensServerAction';
import { setUserName } from '@/src/lib/auth/setUserNameServerAction';

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: '/auth/sign-in',
    verifyRequest: '/auth/success',
    error: '/auth/error',
  },

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Nodemailer({
      server: SMTPCreds,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    }),
  ],

  callbacks: {
    async jwt({ token, user, session, trigger }) {
      /*
      console.log('------ jwt token ------', token);
      console.log('------ jwt session ------', session);
      console.log('------ jwt user ------', user);
      console.log('------ jwt trigger ------', trigger);
      */

      if (trigger === 'update' && session?.name !== token.name) {
        token.name = session.name;

        try {
          await setUserName(token.name!);
        } catch (err) {
          console.error('Failed to set user name (cfg):', err);
        }
      }

      if (user) {
        await clearStaleTokens();

        /*
        console.log("clearStaleTokens user ==>", user);
        console.log("clearStaleTokens token ==>", token);
        console.log("clearStaleTokens session ==>", session);
        */
        return { ...token, id: user.id };
      }
      return token;
    },

    async session({ session, token }) {
      /*
      console.log('session callback:', { session, token });
      // */
      return { ...session, user: { ...session.user, id: token.id as string } };
    },
  },
});
