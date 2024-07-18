/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: { 
        unoptimized: true,
        domains: ['dev-admin.bookablebiz.website'],
    },
    basePath:'',
}

module.exports = nextConfig
