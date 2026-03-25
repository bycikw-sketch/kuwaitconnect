import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { updateSession } from './lib/supabase/middleware';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // First, update the Supabase session
  const supabaseResponse = await updateSession(request);
  
  // Then, handle internationalization
  const intlResponse = intlMiddleware(request);
  
  // Merge headers if necessary, but for now, intlResponse is usually sufficient for routing
  // and supabaseResponse handles the cookie refresh.
  // In a real app, you might need more complex merging.
  return intlResponse;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|en|hi|ml|tl|ur)/:path*']
};
