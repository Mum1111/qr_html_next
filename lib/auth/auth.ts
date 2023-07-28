import { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
    // 配置你的认证提供者
    providers: [
        GithubProvider({
            // @ts-ignore
            clientId: process.env.GITHUB_ID,
            // @ts-ignore
            clientSecret: process.env.GITHUB_SECRET,
        }),
        // 可以添加其他提供者，比如GitHub、Twitter、Facebook等
    ],
}
