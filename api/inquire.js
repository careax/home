/**
 * api/inquire.js — Serverless function (Vercel/Netlify)
 * Neon DB 적재 + 이메일 발송
 *
 * 환경 변수:
 *   DATABASE_URL  — Neon PostgreSQL 연결 문자열
 *   SMTP_HOST     — SMTP 서버 (기본: smtp.gmail.com)
 *   SMTP_PORT     — SMTP 포트 (기본: 587)
 *   SMTP_USER     — 발신 이메일 계정
 *   SMTP_PASS     — 앱 비밀번호 or SMTP 패스워드
 *   NOTIFY_EMAIL  — 알림 수신 이메일 (careax.rana@gmail.com)
 */

import { neon } from '@neondatabase/serverless';
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
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  /* ── 1. Neon DB 적재 ──────────────────────────────────────────── */
  try {
    const sql = neon(process.env.DATABASE_URL);

    // 테이블이 없으면 생성
    await sql`
      CREATE TABLE IF NOT EXISTS inquiries (
        id         SERIAL PRIMARY KEY,
        name       TEXT        NOT NULL,
        email      TEXT        NOT NULL,
        org        TEXT,
        message    TEXT        NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      INSERT INTO inquiries (name, email, org, message)
      VALUES (${name}, ${email}, ${org || null}, ${message})
    `;
  } catch (dbErr) {
    console.error('[inquire] DB error:', dbErr);
    return res.status(500).json({ error: 'DB write failed. Please try again.' });
  }

  /* ── 2. 이메일 발송 ───────────────────────────────────────────── */
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
      subject: `[CareAX 문의] ${name} (${email})`,
      text:    `이름: ${name}\n이메일: ${email}\n소속: ${org || '-'}\n\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
          <h2 style="color:#c9a84c;margin-bottom:1rem">CareAX 새 문의</h2>
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
  } catch (mailErr) {
    // DB 저장은 성공했으므로 메일 실패는 경고만 로깅
    console.warn('[inquire] Email send failed:', mailErr);
  }

  return res.status(200).json({ message: '문의가 접수되었습니다. 곧 연락드리겠습니다.' });
}
