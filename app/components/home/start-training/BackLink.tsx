'use client'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

export const BackLink = () => {
    const u = useTranslations("Utils")
  return (
    <Link href={'/home/start-training'}>{u("Back")}</Link>
  )
}
