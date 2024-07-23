import React from 'react'
import { CenterComponent } from './CenterComponent'
import { FormWrapper } from './FormWrapper'
import { InputGroup } from './InputGroup'
import { FormInputErrors } from './FormInputErrors'

export const FirstSetup = () => {
  return (
        <FormWrapper
        headerLabel='Potrzebujemy troche informacj'
        submitBtnText='Dalej'
        >
            <InputGroup id='age' text='Wiek' type='number'/>
            <FormInputErrors />

            <InputGroup id='height' text='Wzrost(cm)' type='number'/>
            <FormInputErrors />

            <InputGroup id='weight' text='Waga' type='number'/>
            <FormInputErrors />

            <label htmlFor='goal'>Jaki jest twój cel</label>
            <select id='goal' name='goal' className='text-black'>
                <option defaultChecked>Więcej ciężaru</option>
                <option>Lepszy wygląd</option>
                <option>Oba</option>
            </select>

            <label htmlFor='advancment'>Poziom zaawansowania</label>
            <select id='advancment' name='advancment' className='text-black' defaultValue={1}>
                <option value={0}>Nigdy nie chodziłem/am na siłownie</option>
                <option value={1}>Początkujący</option>
                <option value={2}>Średnio zaawansowany</option>
                <option value={3}>Zaawanswany</option>
            </select>

            <InputGroup id='maxbencpress' text='Maksymalna waga na ławce w serii(kg)' type='number'/>
            <FormInputErrors />
        </FormWrapper>
  )
}
