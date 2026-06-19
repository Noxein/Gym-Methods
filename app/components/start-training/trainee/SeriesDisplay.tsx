import TraineeTrainingContext from "@/app/context/TraineeTrainingContext";
import { handleTypes } from "@/app/lib/exercise-list";
import { nameTrimmer } from "@/app/lib/utils";
import { Series, TraineeSetGoal, TraineeSingleExercise } from "@/app/types";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { Icon } from "../../Icon";
import { CheckIcon, CrossIcon } from "@/app/ui/icons/ExpandIcon";
import { TimerContext } from "@/app/context/TimerContext";
import { useExerciseTempos } from "@/app/lib/useExerciseTempos";
import { ExerciseTempo } from "../../ui/ExerciseTempo";

type SeriesDisplayTypes = {
    handleInputChange: (value:number,changedField:'weight'|'repetition'|'time',seriesIndex:number) => void
    handleChange: (handle:string) => void
    flipT: (goalMet: undefined | 'met' | 'notmet', seriesIndex: number) => void,
    flipF: (goalMet: undefined | 'met' | 'notmet', seriesIndex: number) => void,
}

function SeriesDisplay({handleInputChange, handleChange, flipT, flipF}: SeriesDisplayTypes) {
    const {training, currentExerciseIndex, allHandles} = useContext(TraineeTrainingContext)!
    const tempos = useExerciseTempos()

    const currentPlanName = training.name

    const currentExercise = training.exercises[currentExerciseIndex]
    return ( 
            <div className="flex overflow-hidden touch-none">
         
            <div className="relative duration-75 w-[94vw]" >
                <div className={`bg-darkLight rounded-lg px-5 h-[calc(50vh)] w-[94vw] mt-2`}>
                    <div className="text-center text-white text-2xl font-semibold sticky top-0  z-30">
                        <p className="bg-darkLight pt-5">{currentPlanName} - {currentExercise.exercisename}</p>
                        <ExerciseTempo tempo={tempos[currentExercise.exerciseid]?.tempo} className="justify-center bg-darkLight pb-2"/>
                    </div>

                    <ActuallSeries exercise={currentExercise} allHandles={allHandles} handleInputChange={handleInputChange} handleChange={handleChange} flipT={flipT} flipF={flipF}/>
                </div>
            </div>
                
            
        </div> 
     );
}

export default SeriesDisplay;

type SeriesDisplayerTypes = {
    exercise: TraineeSingleExercise,
    allHandles: {
        id: string;
        handlename: string;
    }[],
    handleInputChange: (value:number,changedField:'weight'|'repetition'|'time',seriesIndex:number) => void
    handleChange: (handle:string) => void,
    flipT: (goalMet: undefined | 'met' | 'notmet', seriesIndex: number) => void,
    flipF: (goalMet: undefined | 'met' | 'notmet', seriesIndex: number) => void,
}

const ActuallSeries = ({exercise, allHandles, handleInputChange, handleChange, flipT, flipF}: SeriesDisplayerTypes) => {

    const u = useTranslations("Utils")
    const h = useTranslations("Handles")

    return(
            <div className="flex flex-col gap-2 text-white ">
        
                {exercise.handle && <div className='flex gap-2'>
                    <div className='flex-1 flex flex-col text-lg relative'>
                        <label htmlFor='handle' className='text-marmur font-light text-sm px-2 absolute -top-1/3 left-2 bg-darkLight'>{u("Handle")}</label>
                        <select name="handle" id="side" className='bg-darkLight pl-3 text-marmur border-borderInteractive border-2 rounded-md h-10' onChange={e=>handleChange(e.target.value)} value={JSON.stringify({id:exercise.handle.id,handlename:exercise.handle.handlename})}>
                            {allHandles.map(handle=>{
                                const name = handleTypes.includes(handle.handlename) ? h(nameTrimmer(handle.handlename)) : handle.handlename 
                                return <option value={JSON.stringify(handle)} key={handle.id}>{name}</option>
                            })}
                        </select>
                    </div>
                </div>}
        
        
        
                {exercise.sets.map((goal,index)=>(
                    <SingleSet key={index} training={exercise} goal={goal} seriesIndex={index} handleInputChange={handleInputChange} flipT={flipT} flipF={flipF}/>
                ))}
            </div>
    )
}

type SingleSetTypes = {
    training: TraineeSingleExercise,
    goal: {
        goal: TraineeSetGoal;
        actual: Series;
        isSetCompleted: boolean | undefined;
    },
    seriesIndex: number,
    handleInputChange: (value:number,changedField:'weight'|'repetition'|'time',seriesIndex:number) => void
    flipT: (goalMet: undefined | 'met' | 'notmet', seriesIndex: number) => void,
    flipF: (goalMet: undefined | 'met' | 'notmet', seriesIndex: number) => void,
}

const SingleSet = ({training,goal,seriesIndex, handleInputChange, flipT, flipF}:SingleSetTypes) => {

    const checkIfSetIsMet = () => {
        if(goal.isSetCompleted === undefined) return undefined
        if(goal.isSetCompleted) return 'met'
        return 'notmet'
    }

    const goalMet = checkIfSetIsMet() 
    const repetitions = goal.actual.repeat
    const weight = goal.actual.weight
    const time = goal.actual.time

    return(
        <div className={`px-4 py-2 border-2 border-borderInteractive rounded-lg flex flex-col  ${goalMet!== undefined && goalMet === 'met' ? 'bg-gradient-to-tr from-green-700 to-green' : goalMet!== undefined && goalMet === 'notmet' ? 'bg-gradient-to-r from-red to-red-200' : ''}`}>
            <div className="flex justify-around">
                <CheckobxTrueFalse typeOfCheckbox='green' isChecked={goalMet===undefined ? false : goalMet==='met' ? true : false} isActive={goalMet!==undefined} goalMet={goalMet} seriesIndex={seriesIndex} flipT={flipT} flipF={flipF}/>

                <div className="flex-1 justify-around flex">
                    <span>{goal.goal.repetitionsgoalmin} - {goal.goal.repetitionsgoalmax} x</span>
                    <span>{goal.goal.weightgoal} KG</span>
                    {goal.goal.timegoal && <span>{goal.goal.timegoal} s</span>}
                </div>

                <CheckobxTrueFalse typeOfCheckbox='red' isChecked={goalMet===undefined ? false : goalMet==='notmet' ? true : false} isActive={goalMet!==undefined} goalMet={goalMet} seriesIndex={seriesIndex} flipT={flipT} flipF={flipF}/>
            </div>
            {goalMet === 'notmet' && 
                <div className="flex gap-2 mx-5 mt-2">
                    <DivWithInput spanText="x" value={repetitions} onChange={e=>handleInputChange(Number(e.target.value),"repetition",seriesIndex)}/>
                    <DivWithInput spanText="KG" value={weight} onChange={e=>handleInputChange(Number(e.target.value),"weight",seriesIndex)}/>
                    {goal.goal.timegoal && <DivWithInput spanText="s" value={time} onChange={e=>handleInputChange(Number(e.target.value),"time",seriesIndex)}/>}
                </div>
                }
            
        </div>
    )
}

interface DivWithInput extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    spanText: string,
}
const DivWithInput = ({spanText,...rest}:DivWithInput) => {
    return (
        <div className="flex-1 flex gap-1">
            <input type="number" className="w-full bg-[#ffffff00] border-white rounded border-1 pl-1" {...rest}/> <span>{spanText}</span> 
        </div>
    )
}

interface CheckobxTrueFalseTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    typeOfCheckbox: 'red'|'green',
    isChecked: boolean,
    isActive: boolean,
    goalMet: undefined | 'met' | 'notmet',
    seriesIndex: number,
    flipT: (goalMet: undefined | 'met' | 'notmet', seriesIndex: number) => void,
    flipF: (goalMet: undefined | 'met' | 'notmet', seriesIndex: number) => void,
}

const CheckobxTrueFalse = ({typeOfCheckbox, isChecked, isActive, goalMet, seriesIndex, flipF, flipT, ...rest}: CheckobxTrueFalseTypes) => {

    if(typeOfCheckbox==='green') return (
        <div className={`border-1 ${isActive?'border-white bg-[#ffffff22]':'border-borderInteractive'} ${isChecked? 'bg-green':'bg-green-200'} flex items-center justify-center rounded-lg`} {...rest} onClick={()=>flipT(goalMet, seriesIndex)}>
            <Icon>
                <CheckIcon fill="#fff"/>
            </Icon>
        </div>
         );
    
         return( 
        <div className={`border-1 ${isActive?'border-white bg-[#ffffff22]':'border-borderInteractive'} border-borderInteractive ${isChecked? 'bg-red':'bg-red-200'} flex items-center justify-center rounded-lg`} {...rest} onClick={()=>flipF(goalMet, seriesIndex)}>
            <Icon>
                <CrossIcon fill="#fff" width="20" height="20"/>
            </Icon>
        </div>
         )
}