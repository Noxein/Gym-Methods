import React from 'react'
import { CreateAccountOrLogin } from './CreateAccountOrLogin'
import { FormWrapper } from './FormWrapper'
import { InputGroup } from './InputGroup'
import { FormInputErrors } from './FormInputErrors'

export const RegisterForm = () => {
  return (<>
    <FormWrapper
    headerLabel='Rejestracja'
    submitBtnText='Zarejestruj'
    >
      <InputGroup id='email' text='Email' type='email'/>
      <FormInputErrors />

      <InputGroup id='password' text='Hasło' type='password'/>
      <FormInputErrors />

      <InputGroup id='confrimpassword' text='Powtórz hasło' type='password'/>
      <FormInputErrors />
    
    </FormWrapper>

    <CreateAccountOrLogin hasAccount={true}/>
    </>)
}
