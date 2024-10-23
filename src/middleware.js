import { NextResponse } from 'next/server';

export function middleware(req) {
    const { pathname } = req.nextUrl;

    const protectedRoutes = ['/companies', '/products', '/blogs', '/news-letter', '/subscriber'];
    const publicRoutes = ['/', '/login', '/forgotPassword']

    const isAuthenticated = req.cookies.get('accessToken');
    let menu = req.cookies.get('accessRoute');
    if (menu) {
        menu = JSON.parse(menu?.value);
    }

    if (!isAuthenticated && protectedRoutes.includes(pathname) || (pathname === "/" && !isAuthenticated)) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (isAuthenticated && publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL(`/${menu[0]}`, req.url));
    }

}

export const config = {
    matcher: [
        '/((?!api).*)',
    ],
};
