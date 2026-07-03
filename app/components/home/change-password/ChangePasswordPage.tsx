'use client'
import { changePassword } from '@/app/actions'
import { useRouter } from 'next/navigation'
import { DetailedHTMLProps, HTMLAttributes, useContext, useState } from 'react'
import { Icon } from '../../Icon'
import { EyeIcon } from '@/app/ui/icons/ExpandIcon'
import { ErrorDiv } from '../../ui/ErrorDiv'
import { Button } from '../../ui/Button'
import { SmallLoaderDiv } from '../../ui/SmallLoaderDiv'
import { useTranslations } from 'next-intl'
import { Input } from '../../ui/Input'

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
            return setError(e(data.error))
        } 
        setLoading(false)
        router.push('/home')
    }
    
    const u = useTranslations("Utils")
    const t = useTranslations("Home/Profile/Change-Password")
    const e = useTranslations("Errors")

  return (
    <div className='pt-20 mx-5 flex flex-col gap-4 h-screen'>
        <h1 className='text-white text-center text-2xl'>{t("ChangePassword")}</h1>
        <div className='flex flex-col relative'>
            <Input alwaysActive type={showPassword?'text':'password'} labelName={t("CurrentPassword")} id='password' value={password} onChange={e=>setPassword(e.target.value)} disabled={loading}/>
            <ShowPassword isOpen={showPassword} onClick={()=>!loading && setShowPassword(!showPassword)}/>
        </div>
        <div className='flex flex-col relative'>
            <Input alwaysActive type={showNewpassword?'text':'password'} labelName={t("NewPassword")} id='newpassword' value={newpassword} onChange={e=>setNewpassword(e.target.value)} disabled={loading}/>
            <ShowPassword isOpen={showNewpassword} onClick={()=>!loading && setShowNewpassword(!showNewpassword)}/>
        </div>
        <div className='flex flex-col relative'>
            <Input alwaysActive type={showRepeatnewpassword?'text':'password'} labelName={t("RepeatNewPassword")} id='repeatnewpassword' value={repeatnewpassword} onChange={e=>setRepeatnewpassword(e.target.value)} disabled={loading}/>
            <ShowPassword isOpen={showRepeatnewpassword} onClick={()=>!loading && setShowRepeatnewpassword(!showRepeatnewpassword)}/>
        </div>

        <ErrorDiv error={error} className='text-xl text-center'/>
        <SmallLoaderDiv loading={loading}/>

        <div className='mt-auto flex gap-4 mb-24'>

            <Button className='flex-1' onClick={()=>router.push('/home/profile')} loading={loading}>{u("Cancel")}</Button>
            <Button className=' flex-1' onClick={handleSave} isPrimary loading={loading}>{u("Save")}</Button>

        </div>
    </div>
  )
}

type ShowPasswordTypes = {
    isOpen: boolean
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const ShowPassword = ({isOpen,...rest}:ShowPasswordTypes) => {
    return(
        <Icon {...rest} className='absolute right-2 h-full flex items-center mt-1'>
            <EyeIcon isOpen={isOpen}/>
        </Icon>
    )
}
