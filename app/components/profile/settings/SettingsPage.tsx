'use client'
import { UserSettings } from '@/app/types'
import React, { useState } from 'react'
import { Icon } from '../../Icon'
import { CheckIcon, CrossIcon } from '@/app/ui/icons/ExpandIcon'
import { exerciseList,exercisesArr } from '@/app/lib/exercise-list'
import { SettingsMapper } from './SettingsMapper'
import { saveNewUserSetting } from '@/app/actions'
import { useRouter } from 'next/navigation'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'
import { Select } from '@/app/components/ui/SelectField'
import { Button } from '../../ui/Button'
import { ErrorDiv } from '../../ui/ErrorDiv'
import { SmallLoaderDiv } from '../../ui/SmallLoaderDiv'

type SettingsPageTypes = {
    settings: UserSettings
}

const daysexercising = ['1' , '2' , '3' , '4' , '5' , '6' , '7']
const goal = ['Siła','Hipertrofia','Oba']
const advancmentlevel = ['Początkujący','Średniozaawansowany','Zaawansowany']

type daysexercisingType = '1' | '2' | '3' | '4' | '5' | '6' | '7'
type goalType = 'Siła' | 'Hipertrofia' | 'Oba'
type advancmentlevelType = 'Początkujący' | 'Średniozaawansowany' | 'Zaawansowany'

export const SettingsPage = ({settings}:SettingsPageTypes) => {
    const[userSettings,setUserSettings] = useState<UserSettings>(settings)
    const[showFavourtieExercisesModal,setShowFavourtieExercisesModal] = useState<boolean>(false)
    const[showNotFavourtieExercisesModal,setShowNotFavourtieExercisesModal] = useState<boolean>(false)
    const[loading,setLoading] = useState(false)
    const[error, setError] = useState('')

    const router = useRouter()
    const handleDaysExercisingChange = (value:'1' | '2' | '3' | '4' | '5' | '6' | '7') => {
        if(!daysexercising.includes(value)) return
        let copy = {...userSettings}
        copy.daysexercising = value
        setUserSettings(copy)
    }
    const handleGoalChange = (value:'Siła'|'Hipertrofia'|'Oba') => {
        if(!goal.includes(value)) return
        let copy = {...userSettings}
        copy.goal = value
        setUserSettings(copy)
    }
    const handleAdvancmentLevelChange = (value:'Początkujący'|'Średniozaawansowany'|'Zaawansowany') => {
        if(!advancmentlevel.includes(value)) return
        let copy = {...userSettings}
        copy.advancmentlevel = value
        setUserSettings(copy)
    }
    const handleFavouriteExercisesChange = (exerciseName: string) => {
        if(!exercisesArr.includes(exerciseName)) return
        let copy = {...userSettings}
        if(copy.favouriteexercises?.includes(exerciseName)){
            copy.favouriteexercises = copy.favouriteexercises.filter(x=>x!==exerciseName)
        }else{
            copy.favouriteexercises = [...copy.favouriteexercises!,exerciseName]
        }
        setUserSettings(copy)
    }
    const handNotleFavouriteExercisesChange = (exerciseName: string) => {
        if(!exercisesArr.includes(exerciseName)) return
        let copy = {...userSettings}
        if(copy.notfavouriteexercises?.includes(exerciseName)){
            copy.notfavouriteexercises = copy.notfavouriteexercises.filter(x=>x!==exerciseName)
        }else{
            copy.notfavouriteexercises = [...copy.notfavouriteexercises!,exerciseName]
        }
        setUserSettings(copy)
    }

    const handleSave = async () => {
        setLoading(true)
        const result = await saveNewUserSetting(userSettings)
        if(result?.error){
            setLoading(false)
            return setError('Coś poszło nie tak')
        } 
        setLoading(false)
        return router.push('/home/profile')
    }

    const handleShowFavModal = () => {
        setShowFavourtieExercisesModal(true)
        HideShowHTMLScrollbar('hide')
    }
    const handleShowNotFavModal = () => {
        setShowNotFavourtieExercisesModal(true)
        HideShowHTMLScrollbar('hide')
    }
  return (
    <div className='mt-10 flex flex-col gap-4 mx-5 text-white'>
        <h1 className='text-xl text-center text-white font-semibold'>USTAWIENIA</h1>

            <div className='flex flex-col gap-4 mb-20'>

                <Select labelName='Treningi w tygodniu' valuesToLoop={daysexercising} onChange={e=>handleDaysExercisingChange(e.target.value as daysexercisingType)} defaultValue={userSettings.daysexercising} disabled={loading}/>
    
                <Select labelName='Cel' valuesToLoop={goal} onChange={e=>handleGoalChange(e.target.value as goalType)} defaultValue={userSettings.goal} disabled={loading}/>
            
                <Select labelName='Poziom zaawansowania' valuesToLoop={advancmentlevel} onChange={e=>handleAdvancmentLevelChange(e.target.value as advancmentlevelType)} defaultValue={userSettings.advancmentlevel} disabled={loading}/>
            
            </div>

        <button className='mt-10 bg-marmur p-[1px] flex items-center rounded-lg' onClick={handleShowFavModal} disabled={loading}>
            <span className='bg-dark flex-1 rounded-lg py-3 text-white'>
                Zmień lubiane ćwiczenia
            </span>
            <Icon className='flex items-center px-2 w-10'>
                <CheckIcon height='25'/>
            </Icon>
        </button>

        <button className='bg-marmur p-[1px] flex items-center rounded-lg mb-40' onClick={handleShowNotFavModal} disabled={loading}>
            <span className='bg-dark flex-1 rounded-lg py-3 text-white'>
                Zmień nie lubiane ćwiczenia
            </span>
            <Icon className='flex items-center px-2 w-10'>
                <CrossIcon width='20' />
            </Icon>
        </button>

        <SmallLoaderDiv loading={loading}/>
        <div className='bottom-24 text-white fixed flex right-5 left-5 gap-4'>
            <Button className='flex-1' onClick={handleSave} isPrimary disabled={loading}>Zapisz zmiany</Button>
            <Button className='flex-1' onClick={()=>router.push('/home/profile')} disabled={loading}>Anuluj</Button>
        </div>

        <ErrorDiv  error={error}/>

            {showFavourtieExercisesModal && 
                <FixedDiv showModal={setShowFavourtieExercisesModal}>
                    <SettingsMapper item={exerciseList} currentLevel={0} stateSetter={handleFavouriteExercisesChange} state={userSettings.favouriteexercises!} filterExercises={userSettings.notfavouriteexercises!} favourite={true}/>
                </FixedDiv>
                }
            {showNotFavourtieExercisesModal && 
                <FixedDiv showModal={setShowNotFavourtieExercisesModal}>
                    <SettingsMapper item={exerciseList} currentLevel={0} stateSetter={handNotleFavouriteExercisesChange} state={userSettings.notfavouriteexercises!} filterExercises={userSettings.favouriteexercises!} favourite={false}/>
                </FixedDiv>}
    </div>
  )
}

const FixedDiv = ({children,showModal}:{children:React.ReactNode,showModal:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const handleCloseModal = () => {
        HideShowHTMLScrollbar('show')
        showModal(false)
    }
    return(
        <div className='fixed left-0 top-0 w-screen z-20 backdrop-blur-sm flex justify-center overflow-auto bottom-20'>
            <div className='flex flex-col w-full overflow-y-auto'>
                <button onClick={handleCloseModal} className='py-3 text-white bg-dark border-1 border-marmur mx-5 my-5 rounded-lg'>
                    Powrót
                </button>
                <div className='mx-5'>{children}</div>
            </div>
        </div>
    )
}