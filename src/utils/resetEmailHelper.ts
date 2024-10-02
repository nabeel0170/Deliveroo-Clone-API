import nodemailer from 'nodemailer';

export const sendEmail = async (
  email: string,
  token: string,
  expiryTime: Date,
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 2525,
      secure: false,
      auth: {
        user: 'a37c58df2de7f1',
        pass: '7f2c4be855c918',
      },
    });

    const emailResponse = await transporter.sendMail({
      from: '"John Doe',
      to: process.env.ToEmail,
      subject: 'Password Reset Request',
      text: `Hello,

You have requested to reset your password. This token is valid until ${expiryTime}. Please use the following token to reset your password:

Token: ${token}

If you did not request this, please ignore this email.

Best regards,
Your Company`,
      html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Password Reset Request</h2>
      <p>Hello,</p>
      <p>You have requested to reset your password. This token is valid until <strong>${expiryTime}</strong>. Please use the following token to reset your password:</p>
      <h3 style="color: #d9534f;">Token: ${token}</h3>
      <p><a href="http://localhost:3000/login?reset-password&token=${token}&user=${email}" target="_blank" style="text-decoration:none; color:#fff; background-color:#28a745; padding:10px 20px; border-radius:5px;">Reset Password</a></p>
      <p>If you did not request this, please ignore this email.</p>
      <br />
      <p>Best regards,</p>
    </div>
  `,
    });

    console.log(emailResponse);
    if (emailResponse) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
