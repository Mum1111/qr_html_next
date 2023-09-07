import NextAuth, { AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authOptions: AuthOptions = {
    // @ts-ignore
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    jwt: {
        maxAge: 60 * 60 * 24 * 30,
    },
    providers: [
        EmailProvider({
            // server: process.env.EMAIL_SERVER,
            // from: process.env.EMAIL_FROM,
            //maxAge: 24 * 60 * 60, // 设置邮箱链接失效时间，默认24小时
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
        // GithubProvider({
        //     // @ts-ignore
        //     clientId: process.env.GITHUB_ID,
        //     // @ts-ignore
        //     clientSecret: process.env.GITHUB_SECRET,
        //     httpOptions: {
        //         timeout: 50000,
        //     },
        // }),
        // ...add more providers here
    ],
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            // @ts-ignore
            session.accessToken = token.accessToken
            if (user) {
                session.user.id = user.id
            } else {
                // @ts-ignore
                session.user.id = token.sub
            }
            return session
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
