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

  const { course_name, student_name, email, phone, notes, price, lang } = req.body || {};

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
    const computedPrice = price || 150000;
    const isEn = (lang === 'en');

    // Localization texts
    const subject = isEn
      ? `[Careax-Registration] ${student_name} has registered for '${course_name}'. (Est. Revenue +${computedPrice.toLocaleString()} KRW)`
      : `[Careax-수강신청] ${student_name}님이 '${course_name}'를 신청했습니다. (예상매출 +${computedPrice.toLocaleString()}원)`;

    const text = isEn
      ? `Course: ${course_name}\nName: ${student_name}\nEmail: ${email}\nPhone: ${phone}\nAmount: ${computedPrice.toLocaleString()} KRW\n\nMessage:\n${notes || '-'}\n\n* Thank you for registering for the "${course_name}" course. We will review and contact you via email shortly.`
      : `신청코스: ${course_name}\n이름: ${student_name}\n이메일: ${email}\n연락처: ${phone}\n결제금액: ${computedPrice.toLocaleString()}원\n\n남기실 말씀:\n${notes || '-'}\n\n* ${course_name} 강의 신청해 주셔서 감사합니다. 확인하고 메일로 다시 연락드리겠습니다.`;

    const htmlTitle = isEn ? 'Course Registration Complete' : 'CareAX 수강신청 완료';
    const htmlGreeting = isEn
      ? `Thank you for registering for the "${course_name}" course.<br>We will review and contact you via email shortly.`
      : `"${course_name}" 강의 신청해 주셔서 감사합니다.<br>확인하고 메일로 다시 연락드리겠습니다.`;

    const labelCourse = isEn ? 'Course' : '신청 코스';
    const labelName = isEn ? 'Student Name' : '신청자 성명';
    const labelEmail = isEn ? 'Email' : '이메일 주소';
    const labelPhone = isEn ? 'Phone' : '연락처';
    const labelPrice = isEn ? 'Amount' : '결제금액';
    const labelPriceDesc = isEn ? `${computedPrice.toLocaleString()} KRW (Test Payment)` : `${computedPrice.toLocaleString()}원 (테스트 결제)`;
    const labelNotes = isEn ? 'Message' : '남기실 말씀';

    const mailOptions = {
      from:    `"CareAX 수강신청" <${process.env.SMTP_USER}>`,
      to:      `${email}, ${notifyEmail}`, // 멀티 수신자 매핑
      subject: subject,
      text:    text,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a;border:1px solid #eee;padding:24px;border-radius:8px;">
          <h2 style="color:#3B82F6;margin-bottom:1.5rem;text-align:center;">${htmlTitle}</h2>
          <p style="font-size:15px;line-height:1.6;margin-bottom:1.5rem;text-align:center;font-weight:600;color:#111;">
            ${htmlGreeting}
          </p>
          <table cellpadding="8" style="width:100%;border-collapse:collapse;background:#f9f9f9;border-radius:6px;overflow:hidden;margin-top:1.5rem;">
            <tr><td style="font-weight:600;width:120px;border-bottom:1px solid #eee;">${labelCourse}</td><td style="border-bottom:1px solid #eee;color:#3B82F6;font-weight:600;">${course_name}</td></tr>
            <tr><td style="font-weight:600;border-bottom:1px solid #eee;">${labelName}</td><td style="border-bottom:1px solid #eee;">${student_name}</td></tr>
            <tr><td style="font-weight:600;border-bottom:1px solid #eee;">${labelEmail}</td><td style="border-bottom:1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="font-weight:600;border-bottom:1px solid #eee;">${labelPhone}</td><td style="border-bottom:1px solid #eee;">${phone}</td></tr>
            <tr><td style="font-weight:600;border-bottom:1px solid #eee;">${labelPrice}</td><td style="border-bottom:1px solid #eee;color:#A855F7;font-weight:600;">${labelPriceDesc}</td></tr>
            <tr><td style="font-weight:600;">${labelNotes}</td><td>${notes || '-'}</td></tr>
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
