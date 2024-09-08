import React from 'react'

export const ClassMaker = () => {
  return (
    <div className='hidden'>
        <div className={`text-[#E7E7E7] bg-[#0D1317] border-[#E7E7E7] bg-marmur`}>DarkMode</div>
        <div className={`text-[#576CA8] bg-[#576CA8] border-[#576CA8]`}>LightMode</div>
        <div className={`text-[#0D1317] bg-[#E7E7E7] border-b-[#576CA8] bg-dark text-marmur ml-10`}>DarkMode</div>
        <div className="hidden ml-4 bg-blue-700"></div>
            <div className="hidden ml-6"></div>
            <div className="hidden ml-12 text-dark"></div>
    </div>
  )
}
