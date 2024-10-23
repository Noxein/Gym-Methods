'use client'
import React, { useState } from 'react'
import { FormWrapper } from './FormWrapper'
import { InputGroup } from './InputGroup'
import { useFormState } from 'react-dom'
import { Register } from '../actions'
import { useRouter } from 'next/navigation'
import { ErrorDiv } from './ui/ErrorDiv'

export const RegisterForm = () => {
  const initState = {
    errors: {
      email: [''],
      password: [''],
      confirmpassword: [''],
    }
  }
  const[state,dispach] = useFormState(Register,initState)
  const[showPassword,setShowPassword] = useState(false)
  const[showRepeatPassword,setShowRepeatPassword] = useState(false)
  const router = useRouter()
  if(Object.keys(state.errors).length === 0) router.push('/login')
  return (<>
    <FormWrapper
    headerLabel='Rejestracja'
    submitBtnText='Zarejestruj'
    action={dispach}
    hasAccount={true}
    >
      <InputGroup id='email' text='Email' type='email'/>
      <ErrorDiv error={state?.errors.email && state?.errors.email[0]} className='text-lg -mt-3'/>

      <InputGroup id='password' text='Hasło' type={showPassword?'text':'password'} setShowPassword={setShowPassword} showPassword={showPassword}/>
      <ErrorDiv error={state?.errors.password && state?.errors.password[0]} className='text-lg -mt-3'/>

      <InputGroup id='confirmpassword' text='Powtórz hasło' type={showRepeatPassword?'text':'password'} setShowPassword={setShowRepeatPassword} showPassword={showRepeatPassword}/>
      <ErrorDiv error={state?.errors.confirmpassword && state?.errors.confirmpassword[0]} className='text-lg -mt-3'/>
    
    </FormWrapper>
    </>)
}
