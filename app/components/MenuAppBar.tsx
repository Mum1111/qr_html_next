import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { Avatar, Button } from '@mui/material'
import { signIn, signOut, useSession } from 'next-auth/react'
import { teal, grey } from '@mui/material/colors'
import { useRouter } from 'next/navigation'

function stringToColor(string: string) {
    let hash = 0
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff
        color += `00${value.toString(16)}`.slice(-2)
    }
    /* eslint-enable no-bitwise */

    return color
}

function stringAvatar(name: string | undefined | null) {
    if (!name) {
        name = 'hi'
    }
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name[0]}`,
    }
}

export default function MenuAppBar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const { data: session } = useSession()
    const router = useRouter()

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const editUserInfo = () => {
        handleClose()
        router.push('/user')
    }

    const logOut = () => {
        handleClose()
        signOut()
    }

    const logIn = (e: any) => {
        e.preventDefault()
        signIn()
    }

    return (
        <AppBar
            position="fixed"
            color={'transparent'}
            // className="bg-opacity-50 backdrop-blur-md text-black"
        >
            <Toolbar className="flex justify-between h-16">
                <div className="w-100 h-full">
                    <svg className="header_svg">
                        <text
                            className="header_svg_text tracking-wide font-bold"
                            x="50%"
                            y="50%"
                            dy=".35em"
                            textAnchor="middle"
                        >
                            二维码生成
                        </text>
                    </svg>
                </div>
                {session && (
                    <div className="flex items-center">
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            sx={{ flexGrow: 1, color: grey[700] }}
                        >
                            欢迎尊贵的&nbsp;{session.user.email}
                        </Typography>
                        <IconButton
                            size="medium"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <Avatar {...stringAvatar(session.user.email)} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => editUserInfo()}>
                                编辑资料
                            </MenuItem>
                            <MenuItem onClick={() => logOut()}>
                                退出登录
                            </MenuItem>
                        </Menu>
                    </div>
                )}
                {!session && (
                    <>
                        <Button
                            sx={{ color: teal[500] }}
                            onClick={(e) => logIn(e)}
                        >
                            登录
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    )
}
