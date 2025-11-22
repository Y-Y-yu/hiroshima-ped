import type { APIRoute } from 'astro';
import { getSession } from '../../lib/session';
import fs from 'fs';
import path from 'path';

// Vercelでは .vercel/output/static にファイルが配置される
const PDF_DIRECTORY = process.env.NODE_ENV === 'production'
  ? path.join(process.cwd(), '.vercel/output/static/private_pdfs')
  : path.join(process.cwd(), 'public/private_pdfs');

export const prerender = false;

export const GET: APIRoute = async ({ params, cookies }) => {
  // セッションチェック
  const session = getSession(cookies);
  if (!session || !session.loggedIn) {
    return new Response('Unauthorized', { status: 401 });
  }

  const filename = params.filename;

  if (!filename) {
    return new Response('Filename is required', { status: 400 });
  }

  // パストラバーサル対策
  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return new Response('Invalid filename', { status: 400 });
  }

  // 拡張子チェック（PDFのみ許可）
  if (!filename.toLowerCase().endsWith('.pdf')) {
    return new Response('Invalid file type', { status: 400 });
  }

  // ファイルパスの構築
  const filepath = path.join(PDF_DIRECTORY, filename);

  console.log('=== PDF Debug ===');
  console.log('PDF_DIRECTORY:', PDF_DIRECTORY);
  console.log('filepath:', filepath);
  console.log('File exists:', fs.existsSync(filepath));

  try {
    // ファイルの存在確認
    if (!fs.existsSync(filepath)) {
      console.error('ファイルが見つかりません:', filepath);
      return new Response(`File not found: ${filename}`, { status: 404 });
    }

    // ファイルを読み込む
    const fileBuffer = fs.readFileSync(filepath);

    // PDFとして配信
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  } catch (error) {
    console.error('PDF読み込みエラー:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};