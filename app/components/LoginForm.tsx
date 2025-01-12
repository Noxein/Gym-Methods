'use client'
import { useState } from 'react'
import { FormWrapper } from './FormWrapper'
import { InputGroup } from './InputGroup'
import { LoginNoFormData } from '../actions'
import { useRouter } from 'next/navigation'
import { ErrorDiv } from './ui/ErrorDiv'
import { SmallLoaderDiv } from './ui/SmallLoaderDiv'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { useTranslations } from 'next-intl'

export const LoginForm = () => {
  const[showPassword,setShowPassword] = useState(false)

  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')

  const[loading,setLoading] = useState(false)
  const[error,setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    setError('')
    setLoading(true)
    const data = await LoginNoFormData(email,password)
    if(data.error){ 
      setError(e(data.error))
      return setLoading(false)
    } 
    setLoading(false)
    router.push('/home')
  }

  const t = useTranslations("Login")
  const e = useTranslations("Errors")

  return (<>
      <h2 className={`self-center text-3xl pb-6 text-white`}> {t("Login")} </h2>
      <FormWrapper 
      submitBtnText={t("Login")}
      hasAccount={false}
      >

        <Input labelName='Email' onChange={e=>setEmail(e.target.value)} value={email} disabled={loading}/>
        
        <InputGroup id='password' text={t("Password")} type={showPassword?'text':'password'} showPassword={showPassword} onChange={e=>setPassword(e.target.value)} setShowPassword={setShowPassword} disabled={loading}/>

        <SmallLoaderDiv loading={loading}/>
        <ErrorDiv error={error}/>

        <Button className='mt-4' isPrimary onClick={handleLogin} disabled={loading}>
          {t("Login")}
        </Button>
      </FormWrapper>
      
    </>)
}
