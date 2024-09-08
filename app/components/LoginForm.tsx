'use client'
import React from 'react'
import { FormWrapper } from './FormWrapper'
import { InputGroup } from './InputGroup'
import { FormInputErrors } from './FormInputErrors'
import { useFormState } from 'react-dom'
import { Login } from '../actions'
import { useRouter } from 'next/navigation'

export const LoginForm = () => {
  const[status,dispach] = useFormState(Login,{error:''})
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
        
        <InputGroup id='password' text='Hasło' type='password'/>
        <FormInputErrors errors={[status.error]}/>

      </FormWrapper>
      
    </>)
}
