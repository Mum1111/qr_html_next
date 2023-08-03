import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(request: Request) {
    const requestBody = await request.json()

    //TODO: 需要校验requestBody中的name是否为空 如果为空则抛出错误

    // 更新用户姓名
    const updateUser = await prisma.user.update({
        where: {
            id: requestBody.id,
        },
        data: {
            name: requestBody.name,
        },
    })

    // console.log('users', users)
    console.log('updateUser', updateUser)

    return NextResponse.json(updateUser)
}
