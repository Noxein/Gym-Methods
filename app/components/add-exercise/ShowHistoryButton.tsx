import React from 'react'
import { Icon } from '../Icon'
import { EyeIcon } from '@/app/ui/icons/ExpandIcon'

type ShowHistoryButtonTypes = {
    setShowHistory: React.Dispatch<React.SetStateAction<boolean>>,
    isOpen: boolean,
}

export const ShowHistoryButton = ({setShowHistory,isOpen}:ShowHistoryButtonTypes) => {
  return (
    <button className='bg-dark border-1 border-marmur text-white p-[1px] w-full rounded-lg flex items-center gap-2 mt-5' onClick={()=>setShowHistory(x=>!x)}>
        <div className='py-3 bg-dark rounded-lg pl-8 flex-1 text-left'>
            Historia ćwiczenia
        </div>
        <Icon>
          <EyeIcon isOpen={isOpen} />
        </Icon>
    </button>

  )
}