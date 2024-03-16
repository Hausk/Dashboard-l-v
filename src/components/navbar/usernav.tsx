'use client'
import { signOutAction } from "@/actions/auth.action"
import { auth } from "@/auth/auth"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Session } from "next-auth"

export function UserNav({session}: { session: Session}) {
    const name = session.user?.name ?? '';
    const email = session.user?.email ?? 'dbessa@gmail.com';
    const image = session.user?.image ?? '';
    const [firstName, secondName] = name.split(' ');
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full m-auto">
            <Avatar className="h-8 w-8">
              <AvatarImage src={image} alt={name + ' image'} />
              <AvatarFallback>{firstName.charAt(0) + secondName.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => {
            signOutAction();
          }}>
            Se déconnecter
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }