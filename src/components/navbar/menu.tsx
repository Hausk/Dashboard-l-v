'use client'
import { Circle, MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

export default function Menu() {
    const pathName = usePathname()
    return (
        <Drawer direction="left">
            <DrawerTrigger>
            <MenuIcon size={24} 
                className={"items-center my-auto block lg:hidden"}
            />
            </DrawerTrigger>
            <DrawerContent className="w-1/2 h-screen flex flex-col">
                <DrawerHeader>
                    <DrawerTitle>Admin Panel</DrawerTitle>
                    <DrawerDescription>LIBRE ET VIVANT</DrawerDescription>
                </DrawerHeader>
                <Separator />
                <div className="flex flex-col my-5 gap-4 h-full justify-start">
                    <DrawerClose asChild>
                    <Link href="/" className="flex text-xl">
                        <Circle strokeWidth={0} size={8} className={cn("mr-2 my-auto opacity-0 bg-primary rounded-full", (pathName == '/' && 'opacity-100'))}/>
                        Dashboard
                    </Link>
                    </DrawerClose>
                    <DrawerClose asChild>
                    <Link href="/works" className="flex text-xl">
                        <Circle strokeWidth={0} size={8} className={cn("mr-2 my-auto opacity-0 bg-primary rounded-full", (pathName?.startsWith('/works') && 'opacity-100'))}/>
                        Catégories
                    </Link>
                    </DrawerClose>
                    <DrawerClose asChild>
                    <Link href="/users" className="flex text-xl">
                        <Circle strokeWidth={0} size={8} className={cn("mr-2 my-auto opacity-0 bg-primary rounded-full", (pathName?.startsWith('/users') && 'opacity-100'))}/>
                        Utilisateurs
                    </Link>
                    </DrawerClose>
                    <DrawerClose asChild>
                    <Link href="/settings" className="flex text-xl">
                        <Circle strokeWidth={0} size={8} className={cn("mr-2 my-auto opacity-0 bg-primary rounded-full", (pathName?.startsWith('/settings') && 'opacity-100'))}/>
                        Paramètres
                    </Link>
                    </DrawerClose>
                </div>
                <DrawerFooter>
                    <p className="text-xs text-primary">L&V version 1.0.0</p>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}