/**
 * api/config.js — Vercel Serverless Function
 * 프론트엔드가 환경변수의 Supabase 자격증명을 안전하게 조회할 수 있도록 함
 */
export default function handler(req, res) {
  // CORS 및 캐시 방지 헤더 설정
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  res.status(200).json({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  });
}
