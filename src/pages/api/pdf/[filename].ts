import type { APIRoute } from 'astro';
import { getSession } from '../../../lib/session';

// あなたの Xserver の PDF が置いてある URL
const BASE_URL = 'https://blog.hiroshima-ped.com/private_pdfs';

export const prerender = false;

export const GET: APIRoute = ({ params, cookies, redirect }) => {
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

  // Xserver にある PDF の URL にリダイレクト
  const pdfUrl = `${BASE_URL}/${filename}`;
  return redirect(pdfUrl, 302);
};
