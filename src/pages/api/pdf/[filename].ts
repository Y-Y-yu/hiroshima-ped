import type { APIRoute } from 'astro';
import { getSession } from '../../../lib/session';
import fs from 'fs';
import path from 'path';

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

  // セキュリティ: パストラバーサル攻撃を防ぐ
  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return new Response('Invalid filename', { status: 400 });
  }

  // PDFファイルのパス
  const filePath = path.join(process.cwd(), 'private_pdfs', filename);

  // ファイルの存在確認
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return new Response('File not found', { status: 404 });
  }

  try {
    // ファイルを読み込む
    const fileBuffer = fs.readFileSync(filePath);

    // PDFとして返す (inline = ブラウザ内表示)
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${encodeURIComponent(filename)}"`, // ← attachmentからinlineに変更
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error reading file:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};