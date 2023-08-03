'use client'

import { Box, Button, Container, TextField } from '@mui/material'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function User() {
    const router = useRouter()

    //TODO: 完成前端的表单操作
    const { data: session } = useSession()

    const handleSubmit = async () => {
        const data = {
            id: session?.user.id,
            name: '测试',
        }

        const res = await fetch('/api/user', {
            method: 'PUT',
            body: JSON.stringify(data),
        })

        console.log('res', await res.json())
    }

    return (
        <Container maxWidth="sm" className="h-screen overflow-hidden">
            <Box
                className=" rounded shrink-0 mt-20 shadow-lg"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px',
                }}
            >
                <div className="mb-5">编辑个人信息</div>
                <TextField
                    id="outlined-basic"
                    sx={{ width: '100%' }}
                    label="修改昵称"
                    variant="outlined"
                />
                <div>
                    <Button
                        variant="contained"
                        className="mt-5 mr-5"
                        onClick={() => handleSubmit()}
                    >
                        提交
                    </Button>
                    <Button
                        variant="outlined"
                        className="mt-5"
                        onClick={() => router.replace('/')}
                    >
                        返回
                    </Button>
                </div>
            </Box>
        </Container>
    )
}
