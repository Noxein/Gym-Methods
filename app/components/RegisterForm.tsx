'use client'
import React from 'react'
import { FormWrapper } from './FormWrapper'
import { InputGroup } from './InputGroup'
import { FormInputErrors } from './FormInputErrors'
import { useFormState } from 'react-dom'
import { Register } from '../actions'
import { useRouter } from 'next/navigation'

export const RegisterForm = () => {
  const initState = {
    errors: {
      email: [''],
      password: [''],
      confirmpassword: [''],
    }
  }
  const[state,dispach] = useFormState(Register,initState)
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
      <FormInputErrors errors={state?.errors.email}/>

      <InputGroup id='password' text='Hasło' type='password'/>
      <FormInputErrors errors={state?.errors.password} />

      <InputGroup id='confirmpassword' text='Powtórz hasło' type='password'/>
      <FormInputErrors errors={state?.errors.confirmpassword} />
    
    </FormWrapper>
    </>)
}
