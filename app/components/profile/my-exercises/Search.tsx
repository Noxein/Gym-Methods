import { useState } from 'react'
import { AddExercise } from './AddExercise'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'
import { Button } from '../../ui/Button'
import { useTranslations } from 'next-intl'

type SearchTypes = {
    setSearchValue: React.Dispatch<React.SetStateAction<string>>,
    showAddModal: boolean,
}
export const Search = ({setSearchValue,showAddModal}:SearchTypes) => {
    const[showModal,setShowModal] = useState(showAddModal)

    const HandleShowModal = () => {
        setShowModal(true)
        HideShowHTMLScrollbar('hide')
    }

    const u = useTranslations("Utils")
  return (
    <div className='flex gap-4'>
        <input type="text" onChange={e=>setSearchValue(e.target.value)}
            placeholder={u("Search")}
            className={`px-2 py-2 bg-dark border-1 border-white rounded-md w-3/4 text-white placeholder:text-gray-100`}
        />
        <Button isPrimary onClick={HandleShowModal} className='flex-1'>
            {u("Add")}
        </Button>
        {showModal && <AddExercise setShowModal={setShowModal}/>}

    </div>
  )
}
