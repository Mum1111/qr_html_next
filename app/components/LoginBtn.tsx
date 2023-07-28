'use client'

import { signIn, useSession, signOut } from 'next-auth/react'

export default function LoginBtn() {
    const { data: session } = useSession()

    console.log('session', session)

    if (session) {
        return (
            <>
                <span className="mr-1">{session.user?.email}</span>
                <button onClick={() => signOut()}>登出</button>
            </>
        )
    }

    return <button onClick={() => signIn()}>登录</button>
}
