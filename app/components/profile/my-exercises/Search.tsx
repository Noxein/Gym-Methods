import React, { useContext, useState } from 'react'
import { AddExercise } from './AddExercise'
import { ThemeContext } from '@/app/context/ThemeContext'

type SearchTypes = {
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
}
export const Search = ({setSearchValue}:SearchTypes) => {
    const[showModal,setShowModal] = useState(false)
    const theme = useContext(ThemeContext)
  return (
    <div className='flex gap-4'>
        <input type="text" onChange={e=>setSearchValue(e.target.value)}
            placeholder='SZUKAJ'
            className={`px-2 py-2 bg-[${theme?.colorPallete.primary}] border-2 border-white rounded-md w-3/4 text-white placeholder:text-gray-100`}
        />
        <button onClick={()=>setShowModal(!showModal)}
            className='px-4 py-2 bg-green-600 border-2 border-white rounded-md flex-1 text-white'
            >DODAJ</button>
        {showModal && <AddExercise setShowModal={setShowModal}/>}
    </div>
  )
}
