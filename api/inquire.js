/**
 * api/inquire.js — Vercel Serverless Function
 * Supabase 적재 성공 후 담당자 알림 이메일 발송
 */
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, org, message } = req.body || {};

  // Validate
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, message are required.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST || 'smtp.gmail.com',
      port:   parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const notifyEmail = process.env.NOTIFY_EMAIL || 'careax.rana@gmail.com';

    await transporter.sendMail({
      from:    `"CareAX 문의" <${process.env.SMTP_USER}>`,
      to:      notifyEmail,
      subject: `[CareAX 문의알림] ${name}님으로부터 새로운 문의가 접수되었습니다.`,
      text:    `이름: ${name}\n이메일: ${email}\n소속: ${org || '-'}\n\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
          <h2 style="color:#A855F7;margin-bottom:1rem">CareAX 문의 접수</h2>
          <table cellpadding="6" style="width:100%;border-collapse:collapse">
            <tr><td style="font-weight:600;width:80px">이름</td><td>${name}</td></tr>
            <tr><td style="font-weight:600">이메일</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="font-weight:600">소속</td><td>${org || '-'}</td></tr>
          </table>
          <hr style="margin:1rem 0;border-color:#eee"/>
          <p style="white-space:pre-wrap;line-height:1.6">${message}</p>
          <p style="margin-top:2rem;font-size:0.75rem;color:#999">CareAX · careax.rana@gmail.com</p>
        </div>
      `,
    });

    return res.status(200).json({ message: '알림 이메일이 발송되었습니다.' });
  } catch (mailErr) {
    console.error('[inquire] Email send failed:', mailErr);
    return res.status(500).json({ error: 'Failed to send notification email.' });
  }
}
