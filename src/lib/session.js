// src/lib/session.js

const SESSION_SECRET = import.meta.env.SESSION_SECRET || 'default-secret-key';
const COOKIE_NAME = 'session';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 1日間

/**
 * データを暗号化してトークンを生成
 */
function createToken(data) {
  const payload = JSON.stringify(data);
  const base64Payload = btoa(payload);
  
  // HMACの代わりにシンプルな署名を使用
  const signature = hashString(base64Payload + SESSION_SECRET);
  
  return `${base64Payload}.${signature}`;
}

/**
 * 簡易ハッシュ関数
 */
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

/**
 * トークンを検証してデータを取得
 */
function verifyToken(token) {
  try {
    const [base64Payload, signature] = token.split('.');
    
    const expectedSignature = hashString(base64Payload + SESSION_SECRET);
    
    if (signature !== expectedSignature) {
      return null;
    }
    
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

/**
 * セッションをCookieに設定
 */
export function setSession(cookies, data) {
  const token = createToken(data);
  
  cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

/**
 * セッションを取得(同期関数)
 */
export function getSession(cookies) {
  const token = cookies.get(COOKIE_NAME)?.value;
  
  if (!token) {
    return null;
  }
  
  return verifyToken(token);
}

/**
 * セッションを削除
 */
export function deleteSession(cookies) {
  cookies.delete(COOKIE_NAME, { path: '/' });
}
