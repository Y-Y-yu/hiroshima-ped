import type { APIRoute } from 'astro';
import { getSession } from '../../../lib/session';

export const prerender = false;

export const GET: APIRoute = ({ params, redirect, cookies }) => {
  // セッションチェック
  const session = getSession(cookies);
  if (!session || !session.loggedIn) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  const filename = params.filename;
  
  if (!filename) {
    return new Response('Filename is required', { status: 400 });
  }
  
  // /private_pdfs/ にリダイレクト
  return redirect(`/private_pdfs/${filename}`, 301);
};