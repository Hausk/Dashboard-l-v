"use server";

import prisma from "@/lib/prisma";

export async function getAuthorizedEmail() {
    const users = await prisma.authorizedUser.findMany({})
    const emails = users.map(user => user.email);
    return emails;
}

export async function fetchWorksList() {
    const allWorks = await prisma.work.findMany({
        include: {
            images: {
                where: {
                    pinned: true,
                }
            }
        }
    })
    if (!allWorks) return [];
    return allWorks;
}
export async function fetchRelatedImages(workSlug: string) {
    const workBySlug = await prisma.work.findFirst({
        where: {
            slug: workSlug,
        },
        include: {
            images: true,
        },
    })
    return workBySlug;
}