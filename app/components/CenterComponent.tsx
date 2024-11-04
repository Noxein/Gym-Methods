export const CenterComponent = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='w-screen h-screen flex justify-center flex-col'>
        {children}
    </div>
  )
}
