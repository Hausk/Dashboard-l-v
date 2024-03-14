'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { signOut } from 'next-auth/react';
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "next-themes"
import { Session } from "next-auth"


export function Sidebar({ className, session }: any) {
  const { theme, setTheme } = useTheme()
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }
    const pathName = usePathname() ?? '/'
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex w-full px-4">
                <Avatar>
                    <AvatarImage src={session?.user.image ?? ''} alt="Image de profil" />
                </Avatar>
                <p className="my-auto pl-5">{session?.user.name ?? ''}</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                  <DropdownMenuItem onClick={toggleTheme} className="cursor-pointer">
                    {theme === "light" ? (
                      <p>Passer en mode sombre</p>
                    ) : (
                      <p>Passer en mode clair</p>
                    )}
                  </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500 cursor-pointer"
                  onClick={(async () => {
                    await signOut({callbackUrl: '/login'})})}
                >Se déconnecter</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          <Separator className="my-5"/>
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Général
          </h2>
          <div className="space-y-1">
            <Button variant={pathName === '/' ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
                <Link href="/">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="10 8 16 12 10 16 10 8" />
                    </svg>
                    Statistiques
                </Link>
            </Button>
            <Button variant={pathName?.startsWith('/works') ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
                <Link href="/works">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                    >
                        <rect width="7" height="7" x="3" y="3" rx="1" />
                        <rect width="7" height="7" x="14" y="3" rx="1" />
                        <rect width="7" height="7" x="14" y="14" rx="1" />
                        <rect width="7" height="7" x="3" y="14" rx="1" />
                    </svg>
                    Catégories
                </Link>
            </Button>
            <Button variant={pathName?.startsWith('/text-edit') ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
                <Link href="/text-edit">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                    >
                        <path d="m16 6 4 14" />
                        <path d="M12 6v14" />
                        <path d="M8 8v12" />
                        <path d="M4 4v16" />
                    </svg>
                    Edition des textes du site
                </Link>
            </Button>
          </div>
          <div className="space-y-1">
            <Button variant={pathName?.startsWith('/users') ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
                <Link href="/users">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                    >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    Gestion des utilisateurs
                    </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}