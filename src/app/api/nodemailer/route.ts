// require('dotenv').config();
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { dataProps } from '@/app/_types/dataTypes';

export async function POST(req: Request) {
  // SMTP Transport 설정
  const transporter = nodemailer?.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODE_MAILER_ID,
      pass: process.env.NODE_MAILER_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const data = await req.json();

  const { name, phone_number, email, contents }: dataProps = data;

  if (!data || !phone_number || !email || !contents) {
    return NextResponse.json({ message: 'Bad request' });
  }

  const mailOptions = {
    from: process.env.NODE_MAILER_ID,
    to: process.env.NODE_MAILER_ID,
    subject: '김봉준에게 문의하기',
    html: `
      <div>
        <p>이름 : ${name || ''}</p>
        <p>연락처 : ${phone_number || ''}</p>
        <p>이메일 : ${email || ''}</p>
        <p>내용 : ${contents || ''}</p>
      </div>
    `,
  };

  // 포스트 요청
  if (req?.method === 'POST') {
    try {
      await transporter?.sendMail(mailOptions);

      // await transporter?.sendMail(mailOptions, (err, info) => {
      //   if (err) console.log('err', err);
      //   else console.log('info', info);
      // });

      return NextResponse.json({ success: true });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: error });
    }
  }
  return NextResponse.json({ message: 'Bad request' });
}
