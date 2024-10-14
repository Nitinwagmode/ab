// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken'); // Get the token from cookies

  if (!token) {
    // If no token, redirect to the login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow the request to proceed if the token is found
  return NextResponse.next();
}

export const config = {
  matcher: ['/home'], // Protect the /home route
};
