'use client'
import React, { useState } from 'react'
import { FormWrapper } from './FormWrapper'
import { InputGroup } from './InputGroup'
import { FormInputErrors } from './FormInputErrors'
import { useFormState } from 'react-dom'
import { Login } from '../actions'
import { useRouter } from 'next/navigation'

export const LoginForm = () => {
  const[status,dispach] = useFormState(Login,{error:''})
  const[showPassword,setShowPassword] = useState(false)
  const router = useRouter()

  if(!status.error) router.push('/home')
  return (<>
      <FormWrapper 
      headerLabel='Login'
      submitBtnText='Zaloguj'
      action={dispach}
      hasAccount={false}
      >
        <InputGroup id='email' text='Email' type='email'/>
        <FormInputErrors/>
        
        <InputGroup id='password' text='Hasło' type={showPassword?'text':'password'} showPassword={showPassword} setShowPassword={setShowPassword}/>
        <FormInputErrors errors={[status.error]}/>

      </FormWrapper>
      
    </>)
}
