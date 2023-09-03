'use client'
import './globals.css'
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { SnackbarProvider } from 'notistack'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '@/config/theme'
import MenuAppBar from '@/app/components/MenuAppBar'

// export const metadata = {
//     title: '二维码',
//     description: '二维码生成',
// }

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <html lang="zh-CN">
            <body>
                <SessionProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <MenuAppBar />
                        <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
                            <div>{props.children}</div>
                        </SnackbarProvider>
                    </ThemeProvider>
                </SessionProvider>
                {/*<Suspense fallback={<Loading />}>{props.children}</Suspense>*/}
            </body>
        </html>
    )
}
