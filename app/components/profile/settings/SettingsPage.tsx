'use client'
import { UserSettings } from '@/app/types'
import { useContext, useState } from 'react'
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
import { useTranslations } from 'next-intl'
import { getUserLocale, setUserLocale } from '@/app/i18n/locale'
import { Locale } from '@/app/i18n/config'
import { LangContext } from '@/app/context/LocaleProvider'

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
        if(copy.favouriteexercises!.includes(exerciseName)){
            copy.favouriteexercises = copy.favouriteexercises!.filter(x=>x!==exerciseName)
        }else{
            copy.favouriteexercises = [...copy.favouriteexercises!,exerciseName]
        }
        setUserSettings(copy)
    }
    const handNotleFavouriteExercisesChange = (exerciseName: string) => {
        if(!exercisesArr.includes(exerciseName)) return
        let copy = {...userSettings}
        if(copy.notfavouriteexercises!.includes(exerciseName)){
            copy.notfavouriteexercises = copy.notfavouriteexercises!.filter(x=>x!==exerciseName)
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
            return setError(e(result.error))
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

    const t = useTranslations("Home/Profile/Settings")
    const u = useTranslations("Utils")
    const l = useTranslations("Languages")
    const e = useTranslations("Errors")
    
    const userLocale = useContext(LangContext)

    const handleChangeLocale = (locale: Locale) => {
        localStorage.setItem('lang',locale)
        setUserLocale(locale as Locale)
    }
  return (
    <div className='mt-10 flex flex-col gap-4 mx-5 text-white'>
        <h1 className='text-xl text-center text-white font-semibold'>{t("Settings")}</h1>

            <div className='flex flex-col gap-4 mb-20'>

                <Select labelName={t("TrainingWeekly")} valuesToLoop={daysexercising} onChange={e=>handleDaysExercisingChange(e.target.value as daysexercisingType)} defaultValue={userSettings.daysexercising} disabled={loading}/>
    
                <Select labelName={t("Goal")} valuesToLoop={goal} onChange={e=>handleGoalChange(e.target.value as goalType)} defaultValue={userSettings.goal} disabled={loading}/>
            
                <Select labelName={t("AdvamcmentLevel")} valuesToLoop={advancmentlevel} onChange={e=>handleAdvancmentLevelChange(e.target.value as advancmentlevelType)} defaultValue={userSettings.advancmentlevel} disabled={loading}/>

                <div className='relative w-full text-white'>
                    <label htmlFor='lang' className='absolute -top-1/4 text-base left-4 px-1 z-20'>
                    <div className='z-20 relative'>{t("Language")}</div>
                    <div className='absolute h-1 w-[105%] bg-dark bottom-[10px] -left-1 text-base text-opacity-0 z-10'></div>
                    </label>
                    
                    <select id='lang' value={userLocale!}  className='bg-dark border-1 border-borderInteractive rounded-lg pl-2 py-2 w-full outline-none z-0 relative' onChange={(e)=>handleChangeLocale(e.target.value as Locale)}>
                        <option value='pl'>{l("Polish")} </option>
                        <option value='en'>{l("English")} </option>
                    </select>
                </div>
            
            </div>

        <button className='mt-10 bg-borderInteractive p-[2px] flex items-center rounded-lg' onClick={handleShowFavModal} disabled={loading}>
            <span className='bg-dark flex-1 rounded-lg py-3 text-white'>
                {t("ChangeLikedExercise")}
            </span>
            <Icon className='flex items-center px-2 w-10'>
                <CheckIcon height='25' fill='#fff'/>
            </Icon>
        </button>

        <button className='bg-borderInteractive p-[2px] flex items-center rounded-lg mb-40' onClick={handleShowNotFavModal} disabled={loading}>
            <span className='bg-dark flex-1 rounded-lg py-3 text-white'>
                {t("ChangeNotLikedExercise")}
            </span>
            <Icon className='flex items-center px-2 w-10'>
                <CrossIcon width='20' fill='#fff'/>
            </Icon>
        </button>

        <SmallLoaderDiv loading={loading}/>
        <div className='bottom-24 text-white fixed flex right-5 left-5 gap-4'>

            <Button className='flex-1' onClick={()=>router.push('/home/profile')} disabled={loading}>{u("Cancel")}</Button>
            <Button className='flex-1' onClick={handleSave} isPrimary disabled={loading}>{u("SaveChanges")}</Button>

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