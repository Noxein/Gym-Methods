import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { Icon } from './Icon'
import { EyeIcon } from '../ui/icons/ExpandIcon'
import { Input } from './ui/Input'

type InputGroupTypes = {
    id:string,
    text:string,
    type?:string,
    showPassword?: boolean,
    setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>,
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const InputGroup = ({id,text,type='text',showPassword,setShowPassword,...rest}:InputGroupTypes) => {
  return (
    <div className='flex flex-col flex-1 relative text-white w-full'>
        <Input labelName={text} type={type} id={id} name={id} {...rest} />

        {setShowPassword && <ShowPassword isOpen={showPassword!} onClick={()=>setShowPassword && setShowPassword(!showPassword)}/>}
    </div>
  )
}

type ShowPasswordTypes = {
    isOpen: boolean
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const ShowPassword = ({isOpen,...rest}:ShowPasswordTypes) => {
    return(
        <Icon {...rest} className='absolute right-2 h-full flex items-center'>
            <EyeIcon isOpen={isOpen}/>
        </Icon>
    )
}