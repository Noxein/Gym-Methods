'use client'
import React from 'react'
import { FormWrapper } from './FormWrapper'
import { InputGroup } from './InputGroup'
import { FormInputErrors } from './FormInputErrors'
import { CreateAccountOrLogin } from './CreateAccountOrLogin'
import { signIn } from '@/auth'
import { useFormState } from 'react-dom'
import { Login } from '../actions'

export const LoginForm = () => {
  const[status,dispach] = useFormState(Login,{succes:true})
  return (<>
      <FormWrapper
      headerLabel='Login'
      submitBtnText='Zaloguj'
      action={dispach}
      >
        <InputGroup id='email' text='Email' type='email'/>
        <FormInputErrors />
        
        <InputGroup id='password' text='Hasło' type='password'/>
        <FormInputErrors />

      </FormWrapper>
      <CreateAccountOrLogin hasAccount={false}/>
    </>)
}
