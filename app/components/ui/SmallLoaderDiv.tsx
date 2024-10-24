import React from 'react'
import { SmallLoader } from '../Loading/SmallLoader'

interface SmallLoaderDiv {
    loading: boolean
}

export const SmallLoaderDiv = ({loading}:SmallLoaderDiv) => {
    if(!loading) return

  return (
    <SmallLoader />
  )
}
