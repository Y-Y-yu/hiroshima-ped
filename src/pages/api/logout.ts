import type { APIRoute } from 'astro';
import { deleteSession } from '../../lib/session';

export const prerender = false;

export const POST: APIRoute = async ({ cookies, redirect }) => {
  deleteSession(cookies);
  return redirect('/members/login');
};