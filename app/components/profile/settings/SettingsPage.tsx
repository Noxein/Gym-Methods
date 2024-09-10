'use client'
import { ThemeContext } from '@/app/context/ThemeContext'
import { UserSettings } from '@/app/types'
import React, { useContext, useState } from 'react'
import { Icon } from '../../Icon'
import { CheckIcon, CrossIcon } from '@/app/ui/icons/ExpandIcon'
import { Mapper } from '../../first-setup/Mapper'
import { exerciseList,exercisesArr } from '@/app/lib/exercise-list'
import { SettingsMapper } from './SettingsMapper'
import { fiflakQuery, saveNewUserSetting } from '@/app/actions'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { useRouter } from 'next/navigation'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'

type SettingsPageTypes = {
    settings: UserSettings
}

const showTempo = ['Tak','Nie']
const daysexercising = ['1' , '2' , '3' , '4' , '5' , '6' , '7']
const goal = ['Siła','Hipertrofia','Oba']
const advancmentlevel = ['Początkujący','Średniozaawansowany','Zaawansowany']

type showTempoType = 'Tak'|'Nie'
type daysexercisingType = '1' | '2' | '3' | '4' | '5' | '6' | '7'
type goalType = 'Siła' | 'Hipertrofia' | 'Oba'
type advancmentlevelType = 'Początkujący' | 'Średniozaawansowany' | 'Zaawansowany'

export const SettingsPage = ({settings}:SettingsPageTypes) => {
    const[userSettings,setUserSettings] = useState<UserSettings>(settings)
    const[showFavourtieExercisesModal,setShowFavourtieExercisesModal] = useState<boolean>(false)
    const[showNotFavourtieExercisesModal,setShowNotFavourtieExercisesModal] = useState<boolean>(false)
    const[error, setError] = useState('')

    const router = useRouter()
    console.log(settings)
    const handleTempoChange = (value:'Tak'|'Nie') => {
        if(!showTempo.includes(value)) return
        const bool = value === 'Tak'
        let copy = {...userSettings}
        copy.showtempo = bool
        setUserSettings(copy)
    }
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
        const result = await saveNewUserSetting(userSettings)
        if(result?.error) setError('Coś poszło nie tak')
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
    <div className='mt-10 flex flex-col gap-4 mx-5'>
        <h1 className='text-xl text-center text-white font-semibold'>USTAWIENIA</h1>

        <div className='flex gap-4'>
            <div className='flex flex-col flex-1 relative'>
                <Label htmlFor='tempo'>Pokazuj tempo</Label>
                <Select id='tempo' list={showTempo} defaultValue={userSettings.showtempo?'Tak':'Nie'} onChange={e=>handleTempoChange(e.target.value as showTempoType)}/>
            </div>
            <div className='flex flex-col flex-1 relative'>
                <Label htmlFor='daysexercising'>Treningi w tygodniu</Label>
                <Select id='daysexercising'  list={daysexercising} defaultValue={userSettings.daysexercising} onChange={e=>handleDaysExercisingChange(e.target.value as daysexercisingType)}/>
            </div>
        </div>

        <div className='flex flex-col flex-1 relative'>
            <Label htmlFor='goal'>Cel</Label>
            <Select id='goal' list={goal} defaultValue={userSettings.goal} onChange={e=>handleGoalChange(e.target.value as goalType)}/>
        </div>

        <div className='flex flex-col flex-1 relative'>
            <Label htmlFor='advancmentlevel'>Cel</Label>
            <Select id='advancmentlevel' list={advancmentlevel} defaultValue={userSettings.advancmentlevel} onChange={e=>handleAdvancmentLevelChange(e.target.value as advancmentlevelType)}/>
        </div>

        <div className='mt-10 bg-marmur p-[1px] flex items-center rounded-lg' onClick={handleShowFavModal}>
            <button className='bg-dark flex-1 rounded-lg py-3 text-white'>
                Zmień lubiane ćwiczenia
            </button>
            <Icon className='flex items-center px-2 w-10'>
                <CheckIcon height='25'/>
            </Icon>
        </div>

        <div className='bg-marmur p-[1px] flex items-center rounded-lg mb-40' onClick={handleShowNotFavModal}>
            <button className='bg-dark flex-1 rounded-lg py-3 text-white'>
                Zmień nie lubiane ćwiczenia
            </button>
            <Icon className='flex items-center px-2 w-10'>
                <CrossIcon width='20' />
            </Icon>
        </div>

        <div className='bottom-24 text-white fixed flex right-5 left-5 gap-4'>
          <button className={`flex-1 bg-green text-white py-3 rounded-md`} onClick={handleSave}>Zapisz zmiany</button>
          <button className={`flex-1 bg-red text-white rounded-md`} onClick={()=>router.push('/home/profile')}>Anuluj</button>
        </div>
        {error && <div className='text-red'>{error}</div>}

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


type LabelType = {
    sClass?:string
} & React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>

const Label = ({sClass,...rest}:LabelType) => {
    const theme = useContext(ThemeContext)

    return(
        <label htmlFor=""  className={`text-${theme?.colorPallete.accent} font-light absolute -top-1/3 left-2 bg-${theme?.colorPallete.primary} px-2 ${sClass}`} {...rest}></label>
    )
}

type SelectType = {
    list: string[],
} & React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

const Select = ({list,...rest}:SelectType) => {
    return(
        <select {...rest} className='py-3 bg-dark border-1 border-marmur rounded-lg text-white px-2'>
            {list.map(item=>(
                <option key={item} value={item}>{item}</option>
            ))}
        </select>
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