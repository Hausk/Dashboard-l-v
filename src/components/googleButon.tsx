'use client';

import { signIn } from 'next-auth/react';
import { Button } from './ui/button';

export default function GoogleButton() {
    return (
        <Button
        className="w-full"
        variant="outline"
        type="button"
        onClick={() =>
          signIn('google')
        }
        >
        Se connecter avec Google
        </Button>
    )   
}