import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import usersData from '@/lib/data/users.json';
import type { User } from '@/lib/interfaces';

const users = usersData as User[];
const USER_COOKIE_NAME = 'user-id';

export function middleware(request: NextRequest) {
  const userIdCookie = request.cookies.get(USER_COOKIE_NAME);
  let userId: string;

  if (userIdCookie?.value) {
    const user = users.find(u => u.id === userIdCookie.value);
    if (user) {
      userId = user.id;
    } else {
      userId = users[0].id;
    }
  } else {
    userId = users[0].id;
  }

  const response = NextResponse.next();
  
  if (!userIdCookie?.value || !users.find(u => u.id === userIdCookie.value)) {
    response.cookies.set(USER_COOKIE_NAME, userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  response.headers.set('x-user-id', userId);

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
