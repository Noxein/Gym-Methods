'use client'
import { logout } from '@/app/actions'
import { signOut } from '@/auth'
import React from 'react'

export const SignOutBtn = () => {
  return (
    <button onClick={async(e)=>{ await logout()}}>
            Wyloguj
        </button>
  )
}
