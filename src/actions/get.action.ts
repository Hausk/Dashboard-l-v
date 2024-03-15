"use server";

import prisma from "@/lib/prisma";

export async function getAuthorizedEmail() {
    const users = await prisma.authorizedUser.findMany({})
    const emails = users.map(user => user.email);
    return emails;
}