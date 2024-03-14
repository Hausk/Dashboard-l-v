import { authConfig } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from 'next-auth'

export const getAuthSession = async () => {
    const session = await getServerSession(authConfig)
    return session
}