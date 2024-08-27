import Link from 'next/link'
import React from 'react'

export const ErrorTrainingQuery = ({error}:{error:string}) => {
    return (
        <div className='text-2xl text-white flex -mt-20 flex-col justify-center h-screen'>
            <h1 className='text-center'>{error}</h1>
            <Link href={`/home/profile/my-training-plans`} className='text-center text-blue-300 hover:text-blue-500 border-2 border-white py-2 rounded-md mx-20 mt-5'>Powrót do Treningów</Link>
        </div>
      )
}
