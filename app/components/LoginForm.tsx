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
      console.log(data,data.error)
      setError(data.error)
      return setLoading(false)
    } 
    setLoading(false)
    router.push('/home')
  }

  return (<>
      <h2 className={`self-center text-3xl pb-6 text-white`}>Login</h2>
      <FormWrapper 
      submitBtnText='Zaloguj'
      hasAccount={false}
      >

        <Input labelName='Email' onChange={e=>setEmail(e.target.value)} value={email} disabled={loading}/>
        
        <InputGroup id='password' text='Hasło' type={showPassword?'text':'password'} showPassword={showPassword} onChange={e=>setPassword(e.target.value)} setShowPassword={setShowPassword} disabled={loading}/>

        <SmallLoaderDiv loading={loading}/>
        <ErrorDiv error={error}/>

        <Button className='mt-4' isPrimary onClick={handleLogin} disabled={loading}>
          Zaloguj
        </Button>
      </FormWrapper>
      
    </>)
}
