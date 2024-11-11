import { TabBar } from '@/components/TabBar'
import React from 'react'
import { cookies } from 'next/headers' // solo funciona con server components

export const metadata = {
    title: 'Cookies page',
    description: 'Cookies page SEO'
}

const CookiesPage = async () => {
    // get cookies server side
    const cookieStore = await cookies()
    const cookiesTab = cookieStore.get('selectedTab')?.value ?? '1'
    cookiesTab
    return (
        <div className='grid gri-cols-1 sm:grid-cols-2 gap-3'>
            <div className='flex flex-col'>
                <span className='text-3xl'>Tabs</span>
                <TabBar currentTab={Number(cookiesTab)}/>
            </div>
        </div>
    )
}

export default CookiesPage
