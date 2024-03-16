import { fetchRelatedImages } from "@/actions/get.action";
import { SlugAlbumArtwork } from "@/components/slug-album-artwork";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { notFound } from 'next/navigation'

export default async function Page({ params }: {params: {slug: string}}) {
    const data = await fetchRelatedImages(params.slug)
    if (!data) {
        notFound()
    }
    return (
        <div className="w-full h-full space-y-4 px-8 py-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">{data.title}</h2>
                <div className="flex items-center space-x-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button> Ajouter</Button>
                        </DialogTrigger>
                    </Dialog>
                </div>
            </div>
            <Separator />
            <div className="grid grid-cols-3 gap-4">
            {data.images.map((image: any, index: number) => (
                <SlugAlbumArtwork
                    image={image}
                    className="w-full rounded-md"
                    aspectRatio="square"
                />
            ))}
            </div>
        </div>
    )
}