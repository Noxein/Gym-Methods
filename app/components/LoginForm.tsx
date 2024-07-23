import React from 'react'
import { FormWrapper } from './FormWrapper'
import { InputGroup } from './InputGroup'
import { FormInputErrors } from './FormInputErrors'
import { CreateAccountOrLogin } from './CreateAccountOrLogin'

export const LoginForm = () => {
  return (<>
      <FormWrapper
      headerLabel='Login'
      submitBtnText='Zaloguj'
      >
        <InputGroup id='email' text='Email' type='email'/>
        <FormInputErrors />
        
        <InputGroup id='password' text='Hasło' type='password'/>
        <FormInputErrors />

      </FormWrapper>
      <CreateAccountOrLogin hasAccount={false}/>
    </>)
}
