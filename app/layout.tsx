'use client'
import './globals.css'
import React, { Suspense } from 'react'
import Loading from '@/app/loading'
import { SessionProvider } from 'next-auth/react'
import { SnackbarProvider } from 'notistack'
import { CssBaseline } from '@mui/material'

// export const metadata = {
//     title: '二维码',
//     description: '二维码生成',
// }

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <html lang="zh-CN">
            <body>
                <SessionProvider>
                    <CssBaseline />
                    <SnackbarProvider maxSnack={3}>
                        <div>{props.children}</div>
                    </SnackbarProvider>
                </SessionProvider>
                {/*<Suspense fallback={<Loading />}>{props.children}</Suspense>*/}
            </body>
        </html>
    )
}
