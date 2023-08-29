import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(request: Request) {
    const requestBody = await request.json()

    // 更新用户姓名
    const updateUser = await prisma.user.update({
        where: {
            id: requestBody.id,
        },
        data: {
            name: requestBody.name,
        },
    })

    return NextResponse.json(updateUser)
}
