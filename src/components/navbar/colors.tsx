'use client'
import { useTheme } from "next-themes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Circle, LucideSwatchBook } from "lucide-react";
import { Separator } from "../ui/separator";

export default function ColorPalette() {
    const { theme, setTheme } = useTheme()
    return (
        <DropdownMenu>
        <DropdownMenuTrigger><LucideSwatchBook/></DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel><p>Couleurs</p><p className="text-xs text-foreground/50">Changer de couleurs</p></DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setTheme('red')} className="cursor-pointer"><Circle fill='#ef4444' strokeWidth={0} size={8} className="mr-2"/>Rouge</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('green')} className="cursor-pointer"><Circle fill='#10b981' strokeWidth={0} size={8} className="mr-2"/>Vert</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('blue')} className="cursor-pointer"><Circle fill='#3b82f6' strokeWidth={0} size={8} className="mr-2"/>Bleu</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('violet')} className="cursor-pointer"><Circle fill='#8b5cf6' strokeWidth={0} size={8} className="mr-2"/>Violet</DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    )
}