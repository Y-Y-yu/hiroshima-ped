import type { APIRoute } from 'astro';
import { getSession } from '../../lib/session';

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

  // セキュリティチェック: パストラバーサル対策
  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return new Response('Invalid filename', { status: 400 });
  }

  // 拡張子チェック（PDFのみ許可）
  if (!filename.toLowerCase().endsWith('.pdf')) {
    return new Response('Invalid file type', { status: 400 });
  }

  try {
    // XserverのPDFを取得（blog.hiroshima-ped.comに配置）
    const pdfUrl = `https://blog.hiroshima-ped.com/private_pdfs/${encodeURIComponent(filename)}`;
    
    console.log('Fetching PDF from:', pdfUrl);
    
    const response = await fetch(pdfUrl, {
      headers: {
        'Referer': 'https://blog.hiroshima-ped.com',
      },
    });

    if (!response.ok) {
      console.error('PDF fetch failed:', response.status, response.statusText);
      return new Response('File not found', { status: 404 });
    }

    // PDFデータを取得
    const pdfBuffer = await response.arrayBuffer();

    console.log('PDF fetched successfully, size:', pdfBuffer.byteLength);

    // PDFとして配信
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
        'Content-Length': pdfBuffer.byteLength.toString(),
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  } catch (error) {
    console.error('PDF取得エラー:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};