import './globals.css'
import React, { Suspense } from 'react'
import Loading from '@/app/loading'

export const metadata = {
  title: '二维码',
  description: '二维码生成',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <Suspense fallback={<Loading />}>{props.children}</Suspense>
      </body>
    </html>
  )
}
