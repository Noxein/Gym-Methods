import { DetailedHTMLProps, HTMLAttributes, useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
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

// type InputType = {

// } & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// const Input = ({...rest}:InputType) => {
//     const inputRef = useRef<HTMLInputElement|null>(null)

//     const theme = useContext(ThemeContext)
//     return(
//         <input  className={`w-full text-${theme?.colorPallete.accent} border-white bg-${theme?.colorPallete.primary} border-[1px] min-h-10 text-lg rounded-lg pl-4 focus:outline-blue-500`} {...rest} ref={inputRef} onFocus={()=>{inputRef.current?.select()}}/>
//     )
// }

type LabelType = {
    sClass?:string
} & React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>

const Label = ({sClass,...rest}:LabelType) => {
    const theme = useContext(ThemeContext)

    return(
        <label htmlFor=""  className={`text-${theme?.colorPallete.accent} font-light absolute -top-1/3 left-2 bg-${theme?.colorPallete.primary} px-2 ${sClass}`} {...rest}></label>
    )
}