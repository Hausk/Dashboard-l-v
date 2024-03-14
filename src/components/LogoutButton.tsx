'use client';

import { Button } from '@nextui-org/react';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

export const LogoutButton = () => {
    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/login' });
    };

    return (
        <Button onClick={handleSignOut} className="btn btn-primary">
            Logout
        </Button>
    );
}