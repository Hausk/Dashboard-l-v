'use client'
import { Search } from "./navbar/search";
import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import ColorPalette from "./navbar/colors";
import { UserNav } from "./navbar/usernav";
import Menu from "./navbar/menu";

const colors = [
  'text-red-500',
  'text-orange-500',
  'text-blue-500',
  'text-green-500',
  'text-yellow-500',
]

export function NavBar({session}: { session: any}) {
    return (
        <div className="flex-col flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="ml-auto flex w-full space-x-4">
              <Menu />
              <Search />
              <ColorPalette />
              <UserNav session={session}/>
            </div>
          </div>
        </div>
        </div>
    )
}