import type { APIRoute } from 'astro';
import { setSession } from '../../lib/session';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  console.log('Login API called'); // デバッグ
  
  try {
    // Content-Typeの確認
    const contentType = request.headers.get('content-type');
    console.log('Content-Type:', contentType);

    // リクエストボディの取得
    const text = await request.text();
    console.log('Request body text:', text);

    let username: string;
    let password: string;

    try {
      const body = JSON.parse(text);
      console.log('Parsed body:', body);
      username = body.username;
      password = body.password;

      if (!username || !password) {
        console.error('Missing username or password');
        return new Response(
          JSON.stringify({ success: false, error: 'ユーザー名とパスワードを入力してください。' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return new Response(
        JSON.stringify({ success: false, error: 'リクエストの形式が正しくありません。' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 環境変数の取得
    const ADMIN_USERNAME = import.meta.env.ADMIN_USERNAME;
    const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD;

    console.log('Checking credentials:', { 
      username, 
      envUser: ADMIN_USERNAME,
      match: username === ADMIN_USERNAME && password === ADMIN_PASSWORD 
    });

    // 認証チェック
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // セッションを設定
      setSession(cookies, { username, loggedIn: true });
      console.log('Login successful');

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      console.log('Invalid credentials');
      return new Response(
        JSON.stringify({ success: false, error: 'ユーザー名またはパスワードが違います。' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'サーバーエラーが発生しました。' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};