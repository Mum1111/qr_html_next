import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { ApiErrorResponse, ApiSuccessResponse } from '@/types/request'

const prisma = new PrismaClient()

export async function GET() {
    // 获取当前用户id
    const session = await getServerSession(authOptions)

    if (!session) {
        const notAuthResponseData: ApiErrorResponse = {
            message: '未登录，请重新登录！',
            statusCode: 401,
        }
        return NextResponse.json(notAuthResponseData, { status: 401 })
    }

    const logoList = await prisma.logo.findMany({
        where: {
            userId: session.user.id,
        },
    })

    const responseData: ApiSuccessResponse<any[]> = {
        result: logoList,
        message: 'success',
        statusCode: 200,
    }

    // 返回前端成功信息
    return NextResponse.json(responseData, { status: 200 })
}
