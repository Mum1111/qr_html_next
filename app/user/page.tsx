'use client'

import { Box, Button, Container, TextField } from '@mui/material'

export default function User() {
    return (
        <>
            <Container maxWidth="sm" className="h-screen overflow-hidden">
                <Box
                    className=" border-2 border-dashed border-teal-500 rounded shrink-0 mt-20"
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
                    <Button variant="contained" className="mt-5">
                        提交
                    </Button>
                </Box>
            </Container>
        </>
    )
}
