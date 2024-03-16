'use client'

import Image from "next/image"

import { cn } from "@/lib/utils"

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  image: any
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function SlugAlbumArtwork({
  image,
  aspectRatio = "square",
  width,
  height,
  className,
  ...props
}: AlbumArtworkProps) {
  return (
    <div className={cn("", className)} {...props}>
      <div className="overflow-hidden rounded-md relative">
        <Image
            src={image.src ?? ''}
            alt={image.id}
            width={image.width}
            height={image.height}
            className={cn(
                "h-auto w-auto object-cover test-image rounded-md",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
            )}
        />
      </div>
    </div>
  )
}