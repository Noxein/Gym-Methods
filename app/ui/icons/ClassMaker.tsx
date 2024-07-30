import React from 'react'

export const ClassMaker = () => {
  return (
    <div className='hidden'>
        <div className={`text-[#E7E7E7] bg-[#0D1317] `}>DarkMode</div>
        <div className={`text-[#FC7753] bg-[#FC7753] `}>LightMode</div>
        <div className={`text-[#0D1317] bg-[#E7E7E7] border-b-[#FC7753]`}>DarkMode</div>
    </div>
  )
}
