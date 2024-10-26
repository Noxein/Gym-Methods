'use client'
import React, { useState } from 'react'
import { FormWrapper } from './FormWrapper'
import { InputGroup } from './InputGroup'
import { Register } from '../actions'
import { useRouter } from 'next/navigation'
import { ErrorDiv } from './ui/ErrorDiv'
import { Button } from './ui/Button'
import { SmallLoaderDiv } from './ui/SmallLoaderDiv'

export const RegisterForm = () => {

  const[showPassword,setShowPassword] = useState(false)
  const[showRepeatPassword,setShowRepeatPassword] = useState(false)

  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[confirmPassword,setConfirmPassword] = useState('')

  const[errors,setErrors] = useState({email:'',password:'',confirmpassword:'',isError:false})
  const[loading,setLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async () => {
    setLoading(true)
    const data = await Register(email,password,confirmPassword)
    if(data.error.isError) {
      setLoading(false)
      return setErrors(data.error)
    }
    router.push('/login')
  }

  return (<>
    <FormWrapper
    submitBtnText='Zarejestruj'
    hasAccount={true}
    >
      <h2 className={`self-center text-3xl pb-6 text-white`}>Rejestracja</h2>

      <InputGroup id='email' text='Email' type='email' onChange={e=>setEmail(e.target.value)} value={email} disabled={loading}/>
      <ErrorDiv error={errors.email} className='text-lg -mt-3'/>

      <InputGroup id='password' text='Hasło' type={showPassword?'text':'password'} setShowPassword={setShowPassword} showPassword={showPassword} onChange={e=>setPassword(e.target.value)} value={password} disabled={loading}/>
      <ErrorDiv error={errors.password} className='text-lg -mt-3'/>

      <InputGroup id='confirmpassword' text='Powtórz hasło' type={showRepeatPassword?'text':'password'} setShowPassword={setShowRepeatPassword} showPassword={showRepeatPassword} onChange={e=>setConfirmPassword(e.target.value)} value={confirmPassword} disabled={loading}/>
      <ErrorDiv error={errors.confirmpassword} className='text-lg -mt-3'/>
      
      <SmallLoaderDiv loading={loading}/>

      <Button className='mt-4' isPrimary onClick={handleRegister} disabled={loading}>
        Zarejestruj
      </Button>
    
    </FormWrapper>
    </>)
}
