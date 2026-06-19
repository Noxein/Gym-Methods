import { useState } from 'react'
import { AddExercise } from './AddExercise'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'
import { Button } from '../../ui/Button'
import { useTranslations } from 'next-intl'
import { Input } from '../../ui/Input'

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
        <Input labelName={u("Search")} value={''} onChange={e=>setSearchValue(e.target.value)}/>
        <Button isPrimary onClick={HandleShowModal} className='flex-1 min-w-40'>
            {u("Add")}
        </Button>
        {showModal && <AddExercise setShowModal={setShowModal}/>}

    </div>
  )
}
