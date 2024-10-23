import { NextResponse } from 'next/server';

export function middleware(req) {
    const { pathname } = req.nextUrl;

    const protectedRoutes = ['/companies', '/products', '/blogs', '/news-letter', '/subscriber'];
    const publicRoutes = ['/login', '/forgotPassword']

    const isAuthenticated = req.cookies.get('accessToken');

    if (!isAuthenticated && protectedRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (isAuthenticated && publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/', req.url));
    }

}

export const config = {
    matcher: [
        '/((?!api).*)',
    ],
};
