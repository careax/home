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
      from:    `"CareAX 문의하기" <${process.env.SMTP_USER}>`,
      to:      `${email}, ${notifyEmail}`, // 문의자와 운영자 동시 발송
      subject: `[Careax-문의하기] ${name}님의 새로운 문의사항이 접수되었습니다.`,
      text:    `이름: ${name}\n이메일: ${email}\n소속: ${org || '-'}\n\n문의내용:\n${message}\n\n* 문의 사항을 접수해 주셔서 감사합니다. 확인하고 메일로 다시 연락드리겠습니다.`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a;border:1px solid #eee;padding:24px;border-radius:8px;">
          <h2 style="color:#A855F7;margin-bottom:1.5rem;text-align:center;">CareAX 문의 접수 완료</h2>
          <p style="font-size:15px;line-height:1.6;margin-bottom:1.5rem;">
            안녕하세요, <b>${name}</b>님.<br>
            CareAX 문의 사항이 성공적으로 접수되었습니다. 확인 후 기재해주신 이메일로 다시 연락해 드리겠습니다. 감사합니다.
          </p>
          <table cellpadding="8" style="width:100%;border-collapse:collapse;background:#f9f9f9;border-radius:6px;overflow:hidden;">
            <tr><td style="font-weight:600;width:120px;border-bottom:1px solid #eee;">문의자 성명</td><td style="border-bottom:1px solid #eee;">${name}</td></tr>
            <tr><td style="font-weight:600;border-bottom:1px solid #eee;">이메일 주소</td><td style="border-bottom:1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="font-weight:600;border-bottom:1px solid #eee;">소속 소속</td><td style="border-bottom:1px solid #eee;">${org || '-'}</td></tr>
            <tr><td style="font-weight:600;">문의 내용</td><td style="white-space:pre-wrap;line-height:1.6">${message}</td></tr>
          </table>
          <hr style="margin:2rem 0;border-color:#eee"/>
          <p style="text-align:center;font-size:0.75rem;color:#999;margin-top:2rem;">CareAX · <a href="mailto:careax.rana@gmail.com">careax.rana@gmail.com</a></p>
        </div>
      `,
    });

    return res.status(200).json({ message: '알림 이메일이 발송되었습니다.' });
  } catch (mailErr) {
    console.error('[inquire] Email send failed:', mailErr);
    return res.status(500).json({ error: 'Failed to send notification email.' });
  }
}
