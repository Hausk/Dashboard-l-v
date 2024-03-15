'use client'
import { useSearchParams } from 'next/navigation'
import { CardDescription, CardHeader, CardTitle } from './ui/card'

export default function ErrorMessage() {
    const searchParams = useSearchParams()
    const search = searchParams.get('error')
    return (
        <>
            {search ?
                <CardHeader>
                    <CardTitle className="text-red-500">Compte inconnu</CardTitle>
                    <CardDescription>Connectez vous avec un compte authorisé</CardDescription>
                </CardHeader>
            :
                <CardHeader>
                    <CardTitle>Se connecter</CardTitle>
                    <CardDescription>Connectez vous à votre compte.</CardDescription>
                </CardHeader>
            }
        </>
    )
}