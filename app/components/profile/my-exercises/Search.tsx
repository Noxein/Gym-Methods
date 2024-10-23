import React, { useContext, useState } from 'react'
import { AddExercise } from './AddExercise'
import { ThemeContext } from '@/app/context/ThemeContext'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'
import { Button } from '../../ui/Button'

type SearchTypes = {
    setSearchValue: React.Dispatch<React.SetStateAction<string>>,
    showAddModal: boolean,
}
export const Search = ({setSearchValue,showAddModal}:SearchTypes) => {
    const[showModal,setShowModal] = useState(showAddModal)
    const theme = useContext(ThemeContext)
    const HandleShowModal = () => {
        setShowModal(true)
        HideShowHTMLScrollbar('hide')
    }
  return (
    <div className='flex gap-4'>
        <input type="text" onChange={e=>setSearchValue(e.target.value)}
            placeholder='SZUKAJ'
            className={`px-2 py-2 bg-${theme?.colorPallete.primary} border-1 border-white rounded-md w-3/4 text-white placeholder:text-gray-100`}
        />
        <Button isPrimary onClick={HandleShowModal} className='flex-1'>
            DODAJ
        </Button>
        {showModal && <AddExercise setShowModal={setShowModal}/>}

    </div>
  )
}
