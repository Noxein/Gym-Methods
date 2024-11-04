'use client'
import { changePassword } from '@/app/actions'
import { useRouter } from 'next/navigation'
import { DetailedHTMLProps, HTMLAttributes, useContext, useState } from 'react'
import { Icon } from '../../Icon'
import { EyeIcon } from '@/app/ui/icons/ExpandIcon'
import { ErrorDiv } from '../../ui/ErrorDiv'
import { Button } from '../../ui/Button'
import { SmallLoaderDiv } from '../../ui/SmallLoaderDiv'

export const ChangePasswordPage = () => {
    const[password,setPassword] = useState('')
    const[newpassword,setNewpassword] = useState('')
    const[repeatnewpassword,setRepeatnewpassword] = useState('')

    const[loading,setLoading] = useState(false)
    const[error,setError] = useState('')

    const[showPassword,setShowPassword] = useState(false)
    const[showNewpassword,setShowNewpassword] = useState(false)
    const[showRepeatnewpassword,setShowRepeatnewpassword] = useState(false)

    const router = useRouter()
    const handleSave = async () => {
        setLoading(true)
        const data = await changePassword(password,newpassword,repeatnewpassword)
        if(data){
            setLoading(false)
            return setError(data.error)
        } 
        setLoading(false)
        router.push('/home')
    }
    
  return (
    <div className='pt-20 mx-5 flex flex-col gap-4 h-screen'>
        <h1 className='text-white text-center text-2xl'>Zmień hasło</h1>
        <div className='flex flex-col relative'>
            <Label htmlFor='password'>Obecne hasło</Label>
            <Input type={showPassword?'text':'password'} id='password' value={password} onChange={e=>setPassword(e.target.value)} disabled={loading}/>
            <ShowPassword isOpen={showPassword} onClick={()=>!loading && setShowPassword(!showPassword)}/>
        </div>
        <div className='flex flex-col relative'>
            <Label htmlFor='newpassword'>Nowe hasło</Label>
            <Input type={showNewpassword?'text':'password'} id='newpassword' value={newpassword} onChange={e=>setNewpassword(e.target.value)} disabled={loading}/>
            <ShowPassword isOpen={showNewpassword} onClick={()=>!loading && setShowNewpassword(!showNewpassword)}/>
        </div>
        <div className='flex flex-col relative'>
            <Label htmlFor='repeatnewpassword'>Powtórz nowe hasło</Label>
            <Input type={showRepeatnewpassword?'text':'password'} id='repeatnewpassword' value={repeatnewpassword} onChange={e=>setRepeatnewpassword(e.target.value)} disabled={loading}/>
            <ShowPassword isOpen={showRepeatnewpassword} onClick={()=>!loading && setShowRepeatnewpassword(!showRepeatnewpassword)}/>
        </div>

        <ErrorDiv error={error} className='text-xl text-center'/>
        <SmallLoaderDiv loading={loading}/>

        <div className='mt-auto flex gap-4 mb-24'>

            <Button className='flex-1' onClick={()=>router.push('/home/profile')} disabled={loading}>Anuluj</Button>
            <Button className=' flex-1' onClick={handleSave} isPrimary disabled={loading}>Zapisz</Button>

        </div>
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

    return(
        <input  className={` w-full text-marmur border-white bg-dark border-[1px] min-h-10 text-lg rounded-lg pl-4 focus:outline-green `} {...rest} />
    )
}

type LabelType = {
    sClass?:string
} & React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>

const Label = ({sClass,...rest}:LabelType) => {

    return(
        <label htmlFor=""  className={`text-marmur font-light absolute -top-1/3 left-2 bg-dark px-2 ${sClass}`} {...rest}></label>
    )
}
