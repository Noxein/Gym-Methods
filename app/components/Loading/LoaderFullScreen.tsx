import Image from 'next/image'
import React from 'react'

export const LoaderFullScreen = () => {
  // return (
  //   <div className="flex justify-center items-center w-lvw h-lvh">
  //       <span className="loader"></span>
  //   </div>
  // )
  return(
    <div className="loading loading02 h-screen w-screen flex items-center justify-center">
    <span className='flex justify-center'>
      <Image className='mb-20 mx-auto'  width='300' src="https://see.fontimg.com/api/rf5/nRM8M/ZTU2OTZhZWU0YTliNDhlMGI0N2Q0NDYxOWUzNjYwMmUub3Rm/TU9SRE9S/evil-sound.png?r=fs&h=200&w=1000&fg=ffffff&bg=FFFFFF00&tb=1&s=200" alt="Gothic fonts"/>
    </span>
  </div>
  )
}
