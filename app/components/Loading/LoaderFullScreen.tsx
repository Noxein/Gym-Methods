import Image from 'next/image'

export const LoaderFullScreen = () => {
  return(
    <div className="loading loading02 h-screen w-screen flex items-center justify-center">
    <span className='flex justify-center'>
      <Image className='mb-20 mx-auto'  width='300' height='200' src="/mordor.png" alt="Gothic fonts"/>
    </span>
  </div>
  )
}
