'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { CiBookmarkCheck } from 'react-icons/ci'

interface Props {
    icon: React.ReactNode;
    path: string;
    label: string;
}

export default function SidebarItem({ icon, path, label }: Props) {
    const pathName = usePathname()
    return (
        <li>
            <Link href={path} className={`relative px-4 py-3 flex items-center space-x-4 ${path === pathName ?
                "rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400" :
                "rounded-md text-gray-600 group"}`}>
                {icon}
                <span className="-mr-1 font-medium">{label}</span>
            </Link>
        </li>
    )
}
