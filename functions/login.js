import { createSession } from "../src/lib/session.js";

export const prerender = false;

export async function POST({ request }) {
  try {
    const { username, password } = await request.json();

    const ADMIN_USERNAME = import.meta.env.ADMIN_USERNAME;
    const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = createSession(username);

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `session=${token}; HttpOnly; Path=/; SameSite=Lax`,
        },
      });
    }

    return new Response(JSON.stringify({ success: false }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Login error:", err);
    return new Response(JSON.stringify({ success: false, error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
