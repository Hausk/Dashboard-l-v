'use client'

import { cn } from '@/lib/utils';
import { saveFile } from "@/actions/create.action";
import { fetchWorksList } from "@/actions/get.action";
import { Button } from "@/components/ui/button"
import { Image as ImageType } from "@prisma/client";
import { useCallback, useEffect, useMemo, useState } from "react"
import DropzoneComponent from 'react-dropzone'
import { motion } from 'framer-motion'
import Image from "next/image";
import { XIcon } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input, Progress } from "@nextui-org/react";
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { AlbumArtwork } from '@/components/album-artwork';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

interface Preview {
    file: File;
    preview: string;
}

export default function Page() {
    const { toast } = useToast()
    const [index, setIndex] = useState(-1);
    const [value, setValue] = useState("");
    // images en base
    const [images, setimages] = useState<ImageType[]>([])
    // Preview on Drop
    const [previewImages, setpreviewImages] = useState<Preview[]>([])
    const [status, setstatus] = useState('');
    const [works, setWorks] = useState<any>([]);
    const [previewIndex, setPreviewIndex] = useState(0)
    const [error, setError] = useState('')
    const [progress, setprogress] = useState(0)
    useEffect(() => {
        async function fetchWorks() {
            const result = await fetchWorksList();
            setWorks(result);
        }
        fetchWorks()
    }, [])
    const onValidate = async (previewImages: Preview[]) => {
        setError('');
        setstatus('loading');
        const form = new FormData()
        previewImages.forEach(preview => {
            form.append('file', preview.file);
        });
        const updatedImages = await saveFile(value, form);
        setstatus('finish')
        setimages(prevImages => [...prevImages, ...updatedImages]);
    }
    const isInvalid = useMemo(() => {
        setError('');
        if (value === "") {
            setError('Le titre ne peut être vide')
            return true;
        } if (works.some((work: any) => work.title.toLowerCase() === value.toLowerCase())) {
            setError('Une catégorie possède déjà ce nom');
            return true;
        }
    }, [value]);
    const onAction = async (previewImages: Preview[]) => {
        setError('');
        setstatus('loading');
        for (let index = 0; index < previewImages.length; index++) {
            setPreviewIndex(index);
            const progressPercentage = Math.floor((index + 1) / previewImages.length * 100); // Calculer la progression en pourcentage
            setprogress(progressPercentage);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        setstatus('finish')
    }
    const onCancel = async (time: number) => {
        if(time) {
            await new Promise(resolve => setTimeout(resolve, 250));
        }
        setpreviewImages([]);
        setError('');
        setstatus('');
        setprogress(0);
    }
    const removeImageAtIndex = (indexToRemove: number) => {
        setpreviewImages(prevImages => prevImages.filter((image, index) => index !== indexToRemove));
    };
    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file: File) => {
          const reader = new FileReader()
          reader.onabort = () => console.log('file reading was aborted')
          reader.onerror = () => console.log('file reading has failed')
          reader.onload = () => {
            setpreviewImages((prevPreviewImages: Preview[]) => [...prevPreviewImages, {
                file: file,
                preview: URL.createObjectURL(file),
            }]);
          }
          reader.readAsArrayBuffer(file)
        })
    }, [])
    return (
        <div className="w-full h-full px-8">
            <div className="flex items-center justify-between py-6 lg:pt-6">
                <h2 className="text-3xl font-bold tracking-tight">Catégorie</h2>
                <div className="my-auto">
                    <Dialog>
                        <DialogTrigger asChild>
                        <Button className="m-auto">Ajouter</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]"> 
                            <DialogHeader>
                                <DialogTitle>Créer une catégorie</DialogTitle>
                                <DialogDescription>
                                    Créer une catégorie en lui donnant un nom, tu pourras la modifier ultérieurement
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input type="text" label="Titre" className="" radius={'sm'} 
                                isInvalid={isInvalid}
                                color={isInvalid ? "danger" : "default"}
                                errorMessage={isInvalid && error}
                                onValueChange={setValue}
                            />
                            </div>
                            {!status &&
                                <DropzoneComponent minSize={0} maxSize={20971520} onDrop={onDrop}>
                                    {({getRootProps, getInputProps, isDragActive, isDragReject, fileRejections,}) => {
                                        const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > 20971520;
                                        return (
                                            <>
                                                <div
                                                    {...getRootProps()}
                                                    className={cn('w-full min-h-24 h-fit p-5 border border-dashed rounded-lg flex cursor-pointer',
                                                        isDragActive
                                                            ? "bg-blue-600 text-white animate-pulse"
                                                            : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
                                                    )}
                                                >
                                                    <input {...getInputProps()} />
                                                    <p className="m-auto text-pretty">
                                                        {!isDragActive && 'Glissez / déposez une ou plusieurs images ici ou cliquez pour en selectionner'}
                                                        {isDragActive && !isDragReject && 'Dépose pour importer'}
                                                        {isDragReject && 'File type not accepted'}
                                                        {isFileTooLarge && (
                                                            <span className='text-orange-500 mt-2'>Image trop volumineuse</span>
                                                        )}
                                                    </p>
                                                </div>
                                                
                                            </>
                                        )
                                    }}
                                </DropzoneComponent>
                            }
                            {(previewImages.length > 0) ?
                                <ScrollArea className="min-h-0 max-h-48 py-5 border-red-500">
                                    <div className="mt-2 w-[100%] mx-auto grid grid-cols-3 gap-4 h-fit transition-opacity">
                                        {previewImages.map((file: any, index: number) => (
                                            <motion.div
                                                key={index}
                                                className="w-full relative flex"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 260,
                                                    damping: 20,
                                                    delay: index / 20
                                                }}
                                            >
                                                <Image
                                                    src={file.preview}
                                                    alt={'Preview n°' + index}
                                                    className='w-full rounded-sm'
                                                    width={100}
                                                    height={100}
                                                />
                                                {!status &&
                                                    <XIcon onClick={() => removeImageAtIndex(index)} className="absolute top-0 right-0 rounded-full bg-red-500 cursor-pointer" />
                                                }
                                            </motion.div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            : null}
                            <div className="w-full flex justify-between">
                            {(status == 'loading') &&
                                <Button className="w-1/2 h-10 flex" variant={'secondary'}>
                                    <p className="p-2">{progress}%&nbsp;</p>
                                    <Progress
                                        aria-label="Downloading..."
                                        size="sm"
                                        value={progress}
                                        className="w-full p-2"
                                        classNames={{
                                            indicator: "bg-gradient-to-r from-red-500 to-red-700",
                                            label: "tracking-wider font-medium text-default-600",
                                            value: "text-foreground/60",
                                        }}
                                    />
                                </Button>
                            }
                            {(status == 'finish') &&
                                <DialogClose asChild>
                                    <Button onClick={() => onCancel(1)} className="w-1/2">Fini</Button>
                                </DialogClose>   
                            }
                            {(!status && isInvalid) &&
                                <Button className="w-1/2" disabled>Valider</Button>
                            }
                            {(!status && !isInvalid) &&
                                <Button onClick={() => onValidate(previewImages)} className="w-1/2">Valider</Button>
                            }
                            <Button onClick={() => onCancel(0)} variant={'secondary'} className="w-1/3">Annuler</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            {status &&
                <div className={
                    cn("absolute z-[9999] bottom-5 right-5 rounded-md", (status == 'finish') ? 'bg-emerald-500': 'bg-slate-700/50')}>
                        {(status == 'finish') ?
                            <div className="flex mx-5 justify-between p-2">
                                <p>Création de la catégorie Terminée</p>
                            </div>
                        :
                            <div>
                                <div className="flex mx-5 justify-between p-2">
                                    <p>Création de la catégorie {value}</p>
                                    <p className="ml-2">{progress}%&nbsp;</p>
                                </div>
                                <Progress
                                aria-label="Downloading..."
                                size="md"
                                value={progress}
                                className="w-full px-5 pb-3"
                                classNames={{
                                    indicator: "bg-gradient-to-r from-red-500 to-red-700",
                                    label: "tracking-wider font-medium text-default-600",
                                    value: "text-foreground/60",
                                }}
                            />
                            </div>
                        }
                </div>
            }
            <Separator className="w-full mx-auto" />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 py-6">
                {works.map((work: any) => (
                <Link key={work.id} href={'/works/' + work.slug}>
                    <AlbumArtwork
                    work={work}
                    className="w-full"
                    aspectRatio="square"
                    width={2000}
                    height={2000}
                    />
                </Link>
                ))}
            </div>
        </div>
    )
}