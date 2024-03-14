/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        domains: ['res.cloudinary.com'],
    },
    experimental: {
        serverActions: {
          bodySizeLimit: '10000mb',
        },
    },
};

export default nextConfig;
