import next from 'next';
import type { NextAuthConfig } from 'next-auth';
import { NextURL } from 'next/dist/server/web/next-url';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashBoard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashBoard) {
                if (isLoggedIn) return true;
                return false;
            }
            else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;