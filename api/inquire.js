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

  const { name, email, org, message, lang } = req.body || {};

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
    const isEn = (lang === 'en');

    // Localization texts
    const subject = isEn
      ? `[Careax-Inquiry] New inquiry from ${name} has been received.`
      : `[Careax-문의하기] ${name}님의 새로운 문의사항이 접수되었습니다.`;

    const text = isEn
      ? `Name: ${name}\nEmail: ${email}\nOrganization: ${org || '-'}\n\nMessage:\n${message}\n\n* Thank you for your inquiry. We will review and contact you via email shortly.`
      : `이름: ${name}\n이메일: ${email}\n소속: ${org || '-'}\n\n문의내용:\n${message}\n\n* 문의 사항을 접수해 주셔서 감사합니다. 확인하고 메일로 다시 연락드리겠습니다.`;

    const htmlTitle = isEn ? 'Inquiry Received' : 'CareAX 문의 접수 완료';
    const htmlGreeting = isEn
      ? `Hello <b>${name}</b>,<br>Your inquiry has been successfully submitted. We will review your message and contact you via email shortly.`
      : `안녕하세요, <b>${name}</b>님.<br>CareAX 문의 사항이 성공적으로 접수되었습니다. 확인 후 기재해주신 이메일로 다시 연락해 드리겠습니다. 감사합니다.`;

    const labelName = isEn ? 'Name' : '문의자 성명';
    const labelEmail = isEn ? 'Email' : '이메일 주소';
    const labelOrg = isEn ? 'Organization' : '소속';
    const labelMessage = isEn ? 'Message' : '문의 내용';

    await transporter.sendMail({
      from:    `"CareAX 문의하기" <${process.env.SMTP_USER}>`,
      to:      `${email}, ${notifyEmail}`, // 문의자와 운영자 동시 발송
      subject: subject,
      text:    text,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a;border:1px solid #eee;padding:24px;border-radius:8px;">
          <h2 style="color:#A855F7;margin-bottom:1.5rem;text-align:center;">${htmlTitle}</h2>
          <p style="font-size:15px;line-height:1.6;margin-bottom:1.5rem;">
            ${htmlGreeting}
          </p>
          <table cellpadding="8" style="width:100%;border-collapse:collapse;background:#f9f9f9;border-radius:6px;overflow:hidden;">
            <tr><td style="font-weight:600;width:120px;border-bottom:1px solid #eee;">${labelName}</td><td style="border-bottom:1px solid #eee;">${name}</td></tr>
            <tr><td style="font-weight:600;border-bottom:1px solid #eee;">${labelEmail}</td><td style="border-bottom:1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="font-weight:600;border-bottom:1px solid #eee;">${labelOrg}</td><td style="border-bottom:1px solid #eee;">${org || '-'}</td></tr>
            <tr><td style="font-weight:600;">${labelMessage}</td><td style="white-space:pre-wrap;line-height:1.6">${message}</td></tr>
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
