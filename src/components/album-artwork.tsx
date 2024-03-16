'use client'

import Image from "next/image"

import { cn } from "@/lib/utils"

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  work: any
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function AlbumArtwork({
  work,
  aspectRatio = "square",
  width,
  height,
  className,
  ...props
}: AlbumArtworkProps) {
  return (
    <div className={cn("space-y-3 border-red-500 border", className)} {...props}>
      <div className="overflow-hidden rounded-md relative">
        {work.images[0]?.src ?
          <Image
            src={work.images[0].src ?? ''}
            alt={work.title}
            width={width}
            height={height}
            className={cn(
              "h-auto w-auto object-cover transition-all hover:scale-105 hover:blur-md test-image",
              aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
            )}
          />
        :
        <div
        className={cn(
          "h-auto w-auto object-cover transition-all hover:scale-105 test-image flex",
          aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
        )}
        >
          <div className="m-auto">
            <p className="text-lg text-center">
              Aucune Image épinglé
            </p>
            <p className="text-center text-md">Veuillez cliquer pour en épingler une</p>
            <p className="text-center text-xs text-red-500">Les catégories sans image épinglé ne seront pas visible sur le site</p>
          </div>
        </div>
        }
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none text-center mb-4">{work.title}</h3>
      </div>
    </div>
  )
}