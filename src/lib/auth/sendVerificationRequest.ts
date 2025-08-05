'use server';

import { NodemailerConfig } from 'next-auth/providers/nodemailer';
import { createTransport } from 'nodemailer';

export const sendVerificationRequest: (params: {
  identifier: string;
  url: string;
  expires: Date;
  provider: NodemailerConfig;
  token: string;
  request: Request;
}) => Promise<void> = async ({ identifier, url, provider }) => {
  const transporter = createTransport(provider.server);

  const customHtmlMessage = `
          <html>
            <body>
              <h1 style="text-align: center; color: #225695;">Welcome to Esoterrium</h1>
              <p style="font-size: 16px; text-align: center;">
                Follow the link below to confirm your email address:
              </p>
              <div style="text-align: center; margin: 20px 0;">
                <a
                  href="${url}"
                  style="
                    display: inline-block;
                    padding: 10px 20px;
                    font-size: 18px;
                    background-color: #4CAF50;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                  "
                >
                  Confirm Email
                </a>
              </div>
              <p style="font-size: 14px; text-align: center; color: #888;">
                If you did not request this email, you can just ignore it.
              </p>
            </body>
          </html>
        `;

  const plainTextMessage = `Welcome to Esoterrium! Please confirm your email address by clicking the following link: ${url}`;

  await transporter.sendMail({
    to: identifier,
    from: provider.from,
    subject: 'Confirm Email',
    text: plainTextMessage,
    html: customHtmlMessage,
  });
};
