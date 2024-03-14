import NextAuth, { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '@/utils/prisma'
import GoogleProvider from "next-auth/providers/google";

const googleId = process.env.GOOGLE_CLIENT_ID ?? '' as string;
const googlesecret = process.env.GOOGLE_CLIENT_SECRET ?? '' as string;

if (!googleId || !googlesecret) {
    console.log(googleId)
    console.log(googlesecret)
    throw new Error('Missing environment variables for authentication');
}

export const authConfig = {
    providers: [
        GoogleProvider({
            clientId: googleId,
            clientSecret: googlesecret,
        })
    ],
    callbacks: {
        session: async ({ session, user }) => {
            if (session.user) {
                session.user.id = user.id;
            }
            return session;
        },
        signIn ({ user }) {
            if(user.email === 'dbessa.jonathan@gmail.com' || user.email === 'victoriadossantos92190@gmail.com') {
                return true;
            }
            return false;
        },
        async redirect({url, baseUrl}) {
            return '/';
        }
    },
    adapter: PrismaAdapter(prisma)
} satisfies NextAuthOptions

export default NextAuth(authConfig)