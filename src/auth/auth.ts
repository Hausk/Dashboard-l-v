import Nextauth from "next-auth";
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter'
import Google from 'next-auth/providers/google'
import { env } from "@/env";
import { getAuthorizedEmail } from "@/actions/get.action";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = Nextauth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn ({ user }) {
            const authorizedEmails = await getAuthorizedEmail();
            if(authorizedEmails.includes(user.email ?? '')) {
                return true;
            } else {
                return '/login?error=Unauthorized';
            }
        },

    }
})