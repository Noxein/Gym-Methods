import { useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { Progression, SelectedExerciseWithTempo } from '@/app/types'
import { AddOrUpdateProgression, AddOrUpdateTempo } from '@/app/actions'
import { HideShowHTMLScrollbar, nameTrimmer } from '@/app/lib/utils'
import { Input } from '../../ui/Input'
import { SmallLoaderDiv } from '../../ui/SmallLoaderDiv'
import { Button } from '../../ui/Button'
import { useTranslations } from 'next-intl'
import { v4 as uuidv4 } from 'uuid';
import { Icon } from '../../Icon'
import { TrashIcon } from '@/app/ui/icons/ExpandIcon'

type EditProgressionType = {
    selectedExerciseProgression: Progression|undefined,
    setShowEditTempoModal: React.Dispatch<React.SetStateAction<boolean>>,
    progressions: Progression[],
}
export const EditProgression = ({selectedExerciseProgression,setShowEditTempoModal,progressions}:EditProgressionType) => {
    const[progression,setProgression] = useState(selectedExerciseProgression!)
    const[error,setError] = useState('')
    const[loading,setLoading] = useState(false)

    const handleProgressionChange = (index:number,value:number,target:'increase'|'weightGoal'|'repetitions') => {
        let progressionCopy = {...progression}
        progressionCopy.series[index][target] = value
        setProgression(progressionCopy)
    }
    const HandleUpdateProgression = async () => {
        setLoading(true)
        const isError = await AddOrUpdateProgression(progression)
        if(isError && isError.error){
            setLoading(false)
            return setError(e(isError.error))
        } 
        setShowEditTempoModal(false)
        setLoading(false)
    }
    const HandleCloseModal = () => {
        HideShowHTMLScrollbar('show')
        setShowEditTempoModal(false)
    }

    const handleAddSeries = () => {
        let progressionCopy = {...progression}
        if(progressionCopy.series.length>0){
            const latest = progressionCopy.series[progressionCopy.series.length-1]
            progressionCopy.series.push({id: uuidv4(),increase:latest.increase,repetitions:latest.repetitions,weightGoal:latest.weightGoal})
        }else{
            progressionCopy.series.push({id: uuidv4(),increase:0,repetitions:0,weightGoal:0})
        }
        setProgression(progressionCopy)
    }
    const t = useTranslations("Home/Profile/Set-Progression")
    const d = useTranslations("DefaultExercises")
    const u = useTranslations("Utils")
    const e = useTranslations("Errors")

    const formattedExerciseName = progression.exercisename === progression.exerciseid ? d(nameTrimmer(progression.exercisename)) : progression.exercisename

    const handleDeleteSeries = (index:number) => {
        let progressionCopy = {...progression}
        let filtered = progressionCopy.series.filter((a,i)=>i!==index)
        progressionCopy.series = filtered
        setProgression(progressionCopy)
    }
  return (
    <BlurBackgroundModal>
        <div className={`flex flex-col gap-4 text-xl mx-5 mb-20 py-5 text-white rounded-md w-full`}>
            <div className='text-center pb-2'>{formattedExerciseName}</div>
            <div className='flex flex-col gap-4'>

                <div >
                    <div className='grid grid-cols-[auto,1fr,1fr,1fr,auto] gap-2'>  
                        <div className='font-mono invisible'>0.</div>
                        <p className='flex-1 w-1/3 font-light text-base'>{t('Increase')}</p>
                        <p className='flex-1 w-1/3 font-light text-base'>{t('Repetitions')}</p>
                        <p className='flex-1 w-1/3 font-light text-base'>{t('Weight')}</p>
                        <div className='invisible'>
                            <Icon className='flex items-center justify-center'><TrashIcon fill='#fff'/></Icon>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>  
                    {progression.series.map((singleExerciseProgression,index) => 
                        <div key={singleExerciseProgression.id} className='grid grid-cols-[auto,1fr,1fr,1fr,auto] gap-2'>
                            <p className='font-mono flex items-center justify-center'>{index +1}.</p>
                            <input type="number" className='flex-1 w-full bg-dark border-1 border-borderInteractive rounded-md p-1' value={progression.series[index].increase} onChange={(e)=>handleProgressionChange(index,Number(e.target.value),'increase')}/>
                            <input type="number" className='flex-1 w-full bg-dark border-1 border-borderInteractive rounded-md p-1' value={progression.series[index].repetitions} onChange={(e)=>handleProgressionChange(index,Number(e.target.value),'repetitions')}/>
                            <input type="number" className='flex-1 w-full bg-dark border-1 border-borderInteractive rounded-md p-1' value={progression.series[index].weightGoal} onChange={(e)=>handleProgressionChange(index,Number(e.target.value),'weightGoal')}/>
                            <Icon onClick={()=>handleDeleteSeries(index)} className='flex items-center justify-center'><TrashIcon fill='#fff'/></Icon>
                        </div>
                    )}
                    </div>
                </div>
                {/* <div className='flex flex-col gap-2'>
                    <div className='flex gap-2 ml-4'>
                        <p className='flex-1 w-1/3'>Przyrost</p>
                        <p className='flex-1 w-1/3'>Powtórzenia</p>
                        <p className='flex-1 w-1/3'>Ciężar</p>
                    </div>
                    {progression.series.map((singleExerciseProgression,index) => 
                    <div className='flex gap-2'>
                        <p className='font-mono flex items-center justify-center'>{index +1}.</p>
                        <input type="text" className='flex-1 w-1/3 bg-dark border-1 border-white rounded-md p-1' value={progression.series[index].increase} onChange={(e)=>handleProgressionChange(index,Number(e.target.value),'increase')}/>
                        <input type="text" className='flex-1 w-1/3 bg-dark border-1 border-white rounded-md p-1' value={progression.series[index].repetitions} onChange={(e)=>handleProgressionChange(index,Number(e.target.value),'repetitions')}/>
                        <input type="text" className='flex-1 w-1/3 bg-dark border-1 border-white rounded-md p-1' value={progression.series[index].weightGoal} onChange={(e)=>handleProgressionChange(index,Number(e.target.value),'weightGoal')}/>
                        <Icon onClick={()=>handleDeleteSeries(index)}><TrashIcon fill='#fff'/></Icon>
                    </div>
                    )}
                </div> */}
                <div className='flex flex-col gap-4'>
                    <Button onClick={handleAddSeries}>{t('AddSeries')}</Button>
                </div>
            </div>
            
            <SmallLoaderDiv loading={loading}/>
                
            <div className='flex gap-4 mt-2'>
                
                <Button className='flex-1' onClick={HandleCloseModal} disabled={loading}>{u("Cancel")}</Button>
                <Button className='flex-1' onClick={HandleUpdateProgression} isPrimary disabled={loading}>{u("Save")}</Button>
                
            </div>
            {error && <div className='text-red-600'>{e(error)}</div>}
        </div>
    </BlurBackgroundModal>
  )
}