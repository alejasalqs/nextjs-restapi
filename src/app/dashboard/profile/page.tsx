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
            </div>
        </div>
    )
}

export default ProfilePage
