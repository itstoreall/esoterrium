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
              <h1 style="text-align: center; color: #4CAF50;">Welcome to Our Service</h1>
              <p style="font-size: 16px; text-align: center;">
                To confirm your email address, please click the link below:
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
                  11 Confirm Email
                </a>
              </div>
              <p style="font-size: 14px; text-align: center; color: #888;">
                11 If you didn’t request this email, you can safely ignore it.
              </p>
            </body>
          </html>
        `;

  const plainTextMessage = `11 Welcome to Our Service! Please confirm your email address by clicking the following link: ${url}.`;

  await transporter.sendMail({
    to: identifier,
    from: provider.from,
    subject: 'Confirm your email address',
    text: plainTextMessage,
    html: customHtmlMessage,
  });
};
