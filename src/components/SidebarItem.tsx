import React from 'react'
import { CiBookmarkCheck } from 'react-icons/ci'

interface Props {
    label: string;
    isActive: boolean;
}

export default function SidebarItem({ label, isActive }: Props) {
    return (
        <li>
            <a href="#" className={`relative px-4 py-3 flex items-center space-x-4 ${isActive ?
                "rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400" :
                "rounded-md text-gray-600 group"}`}>
                <CiBookmarkCheck size={30} />
                <span className="-mr-1 font-medium">{label}</span>
            </a>
        </li>
    )
}
