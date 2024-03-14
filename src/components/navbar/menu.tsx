'use client'
import { Circle, MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Menu() {
    const pathName = usePathname()
    return (
        <Drawer direction="left">
            <DrawerTrigger>
            <MenuIcon size={24} 
                className={"items-center my-auto"}
            />
            </DrawerTrigger>
            <DrawerContent className="w-1/2 h-screen">
                <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col">
                    <Link href="/" className="flex">
                        <Circle strokeWidth={0} size={8} className={cn("mr-2 my-auto opacity-0 bg-primary rounded-full", (pathName == '/' && 'opacity-100'))}/>
                        Dashboard
                    </Link>
                    <Link href="/works" className="flex">
                        <Circle strokeWidth={0} size={8} className={cn("mr-2 my-auto opacity-0 bg-primary rounded-full", (pathName?.startsWith('/works') && 'opacity-100'))}/>
                        Catégories
                    </Link>
                    <Link href="/users" className="flex">
                        <Circle strokeWidth={0} size={8} className={cn("mr-2 my-auto opacity-0 bg-primary rounded-full", (pathName?.startsWith('/users') && 'opacity-100'))}/>
                        Utilisateurs
                    </Link>
                </div>
                <DrawerFooter>
                    <Button>Submit</Button>
                <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}