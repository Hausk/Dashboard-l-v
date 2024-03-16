'use server'
import prisma from '@/lib/prisma'
import slugify from 'slugify';
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

export async function saveFile(title: string, formData: FormData) {
    const slug = slugify(title);
    const work = await prisma.work.create({
      data: {
        title: title,
        slug: slug,
        updatedAt: new Date(),
      },
    });
    cloudinary.config({
      api_key: process.env.CLOUDINARY_API_KEY ,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      cloud_name:process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    })
    const cloudinaryUpload = [];
    const createdImages = [];
    const files = formData.getAll('file') as File[];
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const uploadPromise: UploadApiResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, function (error, result) {
          if (error || result === undefined) {
            reject(error || new Error("Upload result is undefined."));
            return;
          }
          resolve(result);
        }).end(buffer);
      });
      cloudinaryUpload.push(uploadPromise);
    }
    const uploadResults = await Promise.all(cloudinaryUpload);
    for (const uploadResult of uploadResults) {
      const createdImage = await prisma.image.create({
        data: {
          fileName: uploadResult.public_id,
          src: uploadResult.url,
          workId: work.id,
          width: uploadResult.width,
          height: uploadResult.height,
        }
      });
      createdImages.push(createdImage);
    }
    return createdImages;
  }