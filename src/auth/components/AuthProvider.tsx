'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

interface Props {
    children: React.ReactNode
}
// Esto se necesita para hacer un hibrido entre cliente y servidor y porder usar el useSession hook
export const AuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
