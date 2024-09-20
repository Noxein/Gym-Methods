'use client'
import { changePassword } from '@/app/actions'
import { ThemeContext } from '@/app/context/ThemeContext'
import { useRouter } from 'next/navigation'
import React, { DetailedHTMLProps, HTMLAttributes, useContext, useState } from 'react'
import { Icon } from '../../Icon'
import { EyeIcon } from '@/app/ui/icons/ExpandIcon'

export const ChangePasswordPage = () => {
    const[password,setPassword] = useState('')
    const[newpassword,setNewpassword] = useState('')
    const[repeatnewpassword,setRepeatnewpassword] = useState('')
    const[error,setError] = useState('')
    const[showPassword,setShowPassword] = useState(false)
    const[showNewpassword,setShowNewpassword] = useState(false)
    const[showRepeatnewpassword,setShowRepeatnewpassword] = useState(false)

    const router = useRouter()
    const handleSave = async () => {
        const result = await changePassword(password,newpassword,repeatnewpassword)
        if(result) return setError(result.error)
        router.push('/home')
    }
    
  return (
    <div className='mt-20 mx-5 flex flex-col gap-4'>
        <div className='flex flex-col flex-1 relative'>
            <Label htmlFor='password'>Obecne hasło</Label>
            <Input type={showPassword?'text':'password'} id='password' value={password} onChange={e=>setPassword(e.target.value)}/>
            <ShowPassword isOpen={showPassword} onClick={()=>setShowPassword(!showPassword)}/>
        </div>
        <div className='flex flex-col flex-1 relative'>
            <Label htmlFor='newpassword'>Nowe hasło</Label>
            <Input type={showNewpassword?'text':'password'} id='newpassword' value={newpassword} onChange={e=>setNewpassword(e.target.value)} />
            <ShowPassword isOpen={showNewpassword} onClick={()=>setShowNewpassword(!showNewpassword)}/>
        </div>
        <div className='flex flex-col flex-1 relative'>
            <Label htmlFor='repeatnewpassword'>Powtórz nowe hasło</Label>
            <Input type={showRepeatnewpassword?'text':'password'} id='repeatnewpassword' value={repeatnewpassword} onChange={e=>setRepeatnewpassword(e.target.value)} />
            <ShowPassword isOpen={showRepeatnewpassword} onClick={()=>setShowRepeatnewpassword(!showRepeatnewpassword)}/>
        </div>
        {error && 
            <div className='text-[#ff4444] text-xl'>
                {error}
            </div>}
        <button className='bg-green text-white rounded-xl py-2 text-xl mt-2' onClick={handleSave}>Zapisz</button>
        <button className='bg-red text-white rounded-xl py-2 text-xl' onClick={()=>router.push('/home/profile')}>Anuluj</button>
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

type InputType = {

} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input = ({...rest}:InputType) => {

    const theme = useContext(ThemeContext)
    return(
        <input  className={` w-full text-${theme?.colorPallete.accent} border-white bg-${theme?.colorPallete.primary} border-[1px] min-h-10 text-lg rounded-lg pl-4 focus:outline-blue-500`} {...rest} />
    )
}

type LabelType = {
    sClass?:string
} & React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>

const Label = ({sClass,...rest}:LabelType) => {
    const theme = useContext(ThemeContext)

    return(
        <label htmlFor=""  className={`text-${theme?.colorPallete.accent} font-light absolute -top-1/3 left-2 bg-${theme?.colorPallete.primary} px-2 ${sClass}`} {...rest}></label>
    )
}
