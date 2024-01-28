import nodemailer from 'nodemailer';

export const sendMail = async () => {
  const transporter = nodemailer.createTransport({
    host: 'alirezafeshki2017@gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'alirezafeshki2017@gmail.com',
      pass: 'alireza1380',
    },
  });

  await transporter.sendMail({
    from: 'alirezafeshki2017@gmail.com',
    to: 'akbariovich@gmail.com',
    subject: 'Test email',
    text: 'new user created',
  });

  return {
    props: {},
  };
};
