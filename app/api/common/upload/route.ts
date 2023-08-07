import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import oss from 'ali-oss'
import { upLoadToOss } from '@/app/api/common/upload/alioss'

export async function POST(req: NextResponse) {
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

    console.log('url', url)
    if (err) return NextResponse.json({ error: '上传失败' }, { status: 500 })
    // 将阿里云返回的url 存储的logo_image db

    // 返回前端成功信息
    return NextResponse.json({ url }, { status: 200 })
}
