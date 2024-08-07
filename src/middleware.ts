import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';
import { permanentRedirect } from 'next/navigation';

console.log("in middleware")
export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/',],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request,
  cookieName: "__Secure-next-auth.session-token"});
  console.log(token)
  const url = request.nextUrl;
  if (
    token &&
    (url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify') ||
      url.pathname === '/')
  ) {
    console.log("token: "  + token)
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}
