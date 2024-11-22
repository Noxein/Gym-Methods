'use client'
import { useContext, useEffect, useState } from 'react'
import { ExerciseList } from './ExerciseList'
import { ExerciseType, ExerciseTypes, HistoryExercise, UserExercise } from '@/app/types'
import { SelectedExerciseContext } from './SelectedExerciseContext'
import { Icon } from '../../Icon'
import { ExpandIcon2 } from '@/app/ui/icons/ExpandIcon'
import { DisplayUserExercises } from './DisplayUserExercises'
import { fetchUserExercises, fetchUserExercisesCount } from '@/app/actions'
import { format } from 'date-fns'
import { Input } from '../../ui/Input'
import { Button } from '../../ui/Button'
import { SmallLoaderDiv } from '../../ui/SmallLoaderDiv'
import { ErrorDiv } from '../../ui/ErrorDiv'
import { useTranslations } from 'next-intl'
import { nameTrimmer } from '@/app/lib/utils'

type SearchComponentTypes = {
    exerciseList: (string | UserExercise)[],
    exercises: ExerciseTypes,
}

export const SearchComponent = ({exerciseList,exercises}:SearchComponentTypes) => {
    const [showSearch,setShowSearch] = useState(false)
    const [from,setFrom] = useState<Date>()
    const [to,setTo] = useState<Date>()
    const [currentPage,setCurrentPage] = useState(0)

    const searchExercise = useContext(SelectedExerciseContext)
    const showExerciseList = searchExercise?.showExerciseList
    const selectedExercise = searchExercise?.exercise
    const setShowExerciseList = searchExercise?.setShowExerciseList

    const [fetchedExercises,setFetchedExercises] = useState<HistoryExercise[]>([])
    const [totalItems,setTotalItems] = useState<number>(0)

    const[loading,setLoading] = useState(true)
    const[error,setError] = useState('')

    const handleShowExerciseList = () => {
        setShowExerciseList && setShowExerciseList(true)
    }
    const handleSearch = async (reset:boolean) => {
        if(reset){
            setLoading(true)
            setCurrentPage(1)
            setFetchedExercises([])
            setTotalItems(0)
            const result = await fetchUserExercises(from!,to!,selectedExercise,0)
            if(result.error){
                setError(e(result.error))
                setLoading(false)
                return 
            }
            const count = await handleSearchCount()
            if(count && count.error){
                setError(e(count.error))
                setLoading(false)
                return
            } 
            setFetchedExercises(SortItems(result.data!))
            setCurrentPage(1)
        }else{
            const result = await fetchUserExercises(from!,to!,selectedExercise,currentPage)
            if(result.error){
                setError(e(result.error))
                return setLoading(false)
            }
            const sortedItems = SortItems(result.data!)
            setFetchedExercises(x=>[...x,...sortedItems])
            setCurrentPage(page=>page+1)
        }

        setLoading(false)
    }
    const handleSearchCount = async () => {
        const count = await fetchUserExercisesCount(from!,to!,selectedExercise)
        if(count.error) return { error : count.error }
        setTotalItems(Number(count.data))
    }
    const toggleSearchBar = () => {
        setShowSearch(!showSearch)
    }
    useEffect(()=>{
        handleSearchCount()
        handleSearch(false)
        setCurrentPage(page=>page+1)
    },[])
    const getDataLenght = () => {
        let total = 0
        fetchedExercises.forEach(day=>{
            total = total + day.exercises.length
        })
        return total
    }
    const SortItems = (unsortedExerciseArray:ExerciseType[]) => {
        let obj: HistoryExercise[] = []

        unsortedExerciseArray.forEach((item,index)=>{
            const formatDate = format(item.date!,'dd,MM') // np. '12.09'
            let indexOF = obj.findIndex(x=>format(x.day,'dd,MM') === formatDate) // check if any object in array has same key
            if(indexOF >= 0){ // if there is no index, function returns -1 so we know we need to make new obj
                obj[indexOF].exercises.push(item) //here we have
            }else{
                obj.push({
                    day: item.date!,
                    exercises: [item]
                })
            }
        })
        return obj
    }

    const formattedFrom = from ? format(from,'dd.MM.yyyy') : ''
    const formattedTo = to ? format(to,'dd.MM.yyyy') : ''

    const handleDateChange = (value:string,setter:React.Dispatch<React.SetStateAction<Date | undefined>>) => {
        if(value === '') return setter(undefined)
        setter(new Date(value))
    }
    const t = useTranslations("Home/Profile/Search")
    const u = useTranslations("Utils")
    const d = useTranslations("DefaultExercises")
    const e = useTranslations("Errors")

    const selectedExerciseFormatted = (longVersion:boolean) => {
        if(!selectedExercise) return t("AllExercises")
        const isLong = longVersion ? false : selectedExercise.length>=20

        if(d(nameTrimmer(selectedExercise)).includes('DefaultExercises')){
            if(isLong) return selectedExercise.slice(0,20) + '...'
            return selectedExercise // in case the exercise is created by user and we dont have translation
        }

        if(isLong) return d(nameTrimmer(selectedExercise)).slice(0,20) + '...'

        return d(nameTrimmer(selectedExercise))
    }
  return (
<>
    <div className='text-white'>
        <div className={`fixed z-20 left-0 pt-5 w-full ${showSearch?'top-0':'-top-[140px]'} transition-all bg-dark`}>
            <div className='flex flex-col gap-4'>
                <div className='flex gap-4 mx-5 relative'>
                    <Input labelName={t("From")} type='date' onChange={e=>handleDateChange(e.target.value,setFrom)} disabled={loading}/>
                    <Input labelName={t("To")} type='date' onChange={e=>handleDateChange(e.target.value,setTo)} disabled={loading}/>
                </div>
                <div className='mx-5'>
                    <Button className='w-full' onClick={handleShowExerciseList} isPrimary disabled={loading}>{selectedExerciseFormatted(true)}</Button>
                </div>
            </div>
            <div className={`w-full flex flex-col px-5 bg-marmur mt-2`}>
                <div className='w-full flex justify-between gap-10'>
                    <button onClick={toggleSearchBar} className='flex-1'>
                        <Icon className='flex items-center'>
                            <ExpandIcon2 expanded={showSearch}/>
                        </Icon>
                    </button>
                    {
                        showSearch?
                        <button className={`text-dark font-semibold pl-10 text-right`} onClick={()=>handleSearch(true)}>
                            {u("Search")}
                        </button>:
                        <div className={`flex flex-col text-dark`}>
    
                            <span className={`text-dark`}>
                                {formattedFrom} - {formattedTo}
                            </span>
                            <span className={`text-dark text-right font-semibold text-xl`}>
                                {selectedExerciseFormatted(false)}
                            </span>
    
                        </div>
                    }
                </div>

                <ErrorDiv error={error} className='flex-1 flex items-center'/>

            </div>
        </div>

        <SmallLoaderDiv loading={loading} sClassParent='h-screen flex items-center mb-20'/>
       
        {!loading && <DisplayUserExercises fetchedExercises={fetchedExercises} manyExercises={selectedExercise===''} handleSearch={()=>handleSearch(false)} dataLength={getDataLenght()} totalItems={totalItems}/>}
        
    </div>
    {showExerciseList && 
        <ExerciseList exerciseList={exerciseList} exercises={exercises}/>
    }
</>
  )
}