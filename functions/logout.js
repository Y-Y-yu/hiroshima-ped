import { destroySession } from "../src/lib/session.js";

export const prerender = false;

export async function POST({ request }) {
  const cookie = request.headers.get("cookie") || "";
  const token = cookie.match(/session=([^;]+)/)?.[1];

  if (token) {
    destroySession(token);
  }

  return new Response(null, {
    status: 302,
    headers: {
      "Set-Cookie": "session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax",
      Location: "/members/login",
    },
  });
}
