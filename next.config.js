/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'shihongjin-java-learn.oss-cn-chengdu.aliyuncs.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig
