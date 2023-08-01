import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@mui/material'

export default function LoginButton() {
    const { data: session }: any = useSession()

    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br />
                {session.user.id}
                <Button variant="contained" onClick={() => signOut()}>
                    {' '}
                    Sign out
                </Button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}
