'use client'

import { useSession } from 'next-auth/react'
import React from 'react'

const ProfilePage = () => {
    const { data: session } = useSession()

    return (
        <div>
            <h1>Profile Page</h1>
            <hr />
            <div className='flex flex-col'>
                <span>{session?.user?.name || 'No name'}</span>
                <span>{session?.user?.email || 'No email'}</span>
                <span>{session?.user?.image || 'No img'}</span>
                <span>{session?.user?.id || 'No uuid'}</span>
                <span>{session?.user?.roles || 'No role'}</span>
            </div>
            <h1>Session</h1>
            <hr />
            <div className='flex flex-col'>
                <span>{JSON.stringify(session)}</span>
            </div>
        </div>
    )
}

export default ProfilePage
