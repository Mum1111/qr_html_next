import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'
import { upLoadToOss } from '@/app/api/common/upload/alioss'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    // 获取当前用户id
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    // 获取前端传来的二进制文件
    const formData: FormData = await req.formData()
    // @ts-ignore
    const image: File | null = formData.get('image')
    // 对上传的二进制文件进行判空
    if (!image)
        return NextResponse.json({ error: '文件不能为空' }, { status: 400 })

    const file: ArrayBuffer = await image.arrayBuffer()

    const { url, err } = await upLoadToOss(file)

    if (err) return NextResponse.json({ error: '上传失败' }, { status: 500 })
    // 将阿里云返回的url 存储的logo_image db

    const row = await prisma.logo.create({
        data: {
            imageUrl: url,
            userId: session.user.id,
        },
    })

    // 返回前端成功信息
    return NextResponse.json({ success: '上传成功' }, { status: 200 })
}
