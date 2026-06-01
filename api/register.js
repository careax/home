/**
 * api/register.js — Vercel Serverless Function
 * Supabase 적재 성공 후 수강신청 완료 알림 이메일 발송
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

  const { course_name, student_name, email, phone, notes } = req.body || {};

  // Validate
  if (!course_name || !student_name || !email || !phone) {
    return res.status(400).json({ error: 'course_name, student_name, email, phone are required.' });
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

    // 수강신청자와 강사 담당자 모두에게 알림 메일 동시 발송
    const mailOptions = {
      from:    `"CareAX 수강신청" <${process.env.SMTP_USER}>`,
      to:      `${email}, ${notifyEmail}`, // 멀티 수신자 매핑
      subject: `[CareAX 수강신청] ${student_name}님께서 ${course_name} 코스 수강신청을 하셨습니다.`,
      text:    `신청코스: ${course_name}\n이름: ${student_name}\n이메일: ${email}\n연락처: ${phone}\n\n남기실 말씀:\n${notes || '-'}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a;border:1px solid #eee;padding:24px;border-radius:8px;">
          <h2 style="color:#3B82F6;margin-bottom:1.5rem;text-align:center;">CareAX 수강신청 완료</h2>
          <p style="font-size:15px;line-height:1.6;margin-bottom:1.5rem;">
            안녕하세요, <b>${student_name}</b>님.
            CareAX 직무 특강 수강신청이 성공적으로 접수되었습니다. 담당 강사 확인 후 추가 안내 메일을 발송해 드리겠습니다.
          </p>
          <table cellpadding="8" style="width:100%;border-collapse:collapse;background:#f9f9f9;border-radius:6px;overflow:hidden;">
            <tr><td style="font-weight:600;width:120px;border-bottom:1px solid #eee;">신청 코스</td><td style="border-bottom:1px solid #eee;color:#3B82F6;font-weight:600;">${course_name}</td></tr>
            <tr><td style="font-weight:600;border-bottom:1px solid #eee;">신청자 성명</td><td style="border-bottom:1px solid #eee;">${student_name}</td></tr>
            <tr><td style="font-weight:600;border-bottom:1px solid #eee;">이메일 주소</td><td style="border-bottom:1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="font-weight:600;border-bottom:1px solid #eee;">연락처</td><td style="border-bottom:1px solid #eee;">${phone}</td></tr>
            <tr><td style="font-weight:600;">남기실 말씀</td><td>${notes || '-'}</td></tr>
          </table>
          <hr style="margin:2rem 0;border-color:#eee"/>
          <p style="text-align:center;font-size:0.75rem;color:#999;margin-top:2rem;">CareAX · <a href="mailto:careax.rana@gmail.com">careax.rana@gmail.com</a></p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: '수강신청 완료 안내 이메일이 발송되었습니다.' });
  } catch (mailErr) {
    console.error('[register] Email send failed:', mailErr);
    return res.status(500).json({ error: 'Failed to send confirmation email.' });
  }
}
