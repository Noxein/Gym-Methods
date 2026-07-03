import { addDays, addMonths, getDay, getDaysInMonth, subDays, subMonths } from "date-fns"
import { LocalStorageTraining, ProgressedIndexesType, Series, SeriesWithExercise, TraineePlan, TraineeSingleTraining, TrainingProgression, WeekDay, WeekDayPL } from "../types"
import { setUserLocale } from "../i18n/locale"
import { Locale, locales } from "../i18n/config"
import { getLocale, getTranslations } from "next-intl/server"

export const WeekDayArray = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
export const WeekDayArrayPL = ['Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota','Niedziela']

export const MonthNamesArray = ['January','February','March','April','May',"June","July","August",'September','October','November','December']
export const MonthNamesArrayPL = ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień']
export const MonthNamesArrayVariantPL = ['Stycznia','Lutego','Marca','Kwietnia','Maja','Czerwica','Lipica','Sierpinia','Wrzesienia','Października','Listopada','Grudnia']

export const DifficultyArray = ['easy','medium','hard']
export const DifficultyArrayPL = ['Łatwa','Średnia','Trudna']

export const Goal = ['Siła','Hipertrofia','Oba']
export const Advancmentlevel = ['Początkujący','Średniozaawansowany','Zaawansowany']
export const Daysexercising = ['1','2','3','4','5','6','7']

export const purposeOptions = ['Casual','Trener','Podopieczny trenera']

 
export const GetMonth = (date:Date) => {
    const MonthNumber = date.getMonth()+1
    if(MonthNumber>=10) return String(MonthNumber)
    return `0${String(MonthNumber)}`
}

export const HideShowHTMLScrollbar = (type:'hide' | 'show') => {
    const html = document.querySelector('html')
    if(type === 'hide'){
        html?.classList.add('no-scrollbar')
        if(html?.scrollHeight && html?.scrollHeight > html?.clientHeight){
          html?.classList.add('no-scrollbar-margin')
      }
      return
    }
  html?.classList.remove('no-scrollbar')
  html?.classList.remove('no-scrollbar-margin')
}

export const ConvertEnglishWeekDayToPolish = (weekday:WeekDay) => {
  return WeekDayArrayPL[WeekDayArray.indexOf(weekday)]
}

export const ConvertPolishWeekDayToEnglish = (weekday:WeekDayPL) => {
  return WeekDayArray[WeekDayArrayPL.indexOf(weekday)]
}

export const dayArrayInitializer = () => {
  const dayOfWeekIndex = -1 === getDay(new Date()) - 1 ? 6 : getDay(new Date()) - 1 // What?
  let newArr:Date[] = []
  const today = new Date()
  for(let i = 0; i <= 6 ; i++){
      if(i===dayOfWeekIndex){
          newArr.push(today)
      }else if(i<dayOfWeekIndex){
          newArr.push(subDays(today,dayOfWeekIndex-i))
      }else if(i>dayOfWeekIndex){
          newArr.push(addDays(today,i-dayOfWeekIndex))
      }else{
      }
  }
  return newArr
}

export const localStorageSetter = (name:string,objectToSet:any) => {
  localStorage.setItem(name,JSON.stringify(objectToSet))
}

export const nameTrimmer = (string:string) => {
  return string.replace(/ /g,'').replace(/'/g,'')
}

export const getLang = async () => {
  const lang = typeof window !== 'undefined' && localStorage.getItem('lang')
  if(!lang){
    typeof window !== 'undefined' && localStorage.setItem('lang','en')
    return setUserLocale('en')
  }

  if(!locales.includes(lang as Locale)){
    typeof window !== 'undefined' && localStorage.setItem('lang','en')
    return setUserLocale('en')
  }else{
    setUserLocale(lang as Locale)
  }
  
}

export const checkIfShouldIncreaseDifficulty = (exerciseHistory: Series[],goal?:TrainingProgression) => {
    //DATA ARRAY ALWAYS HAS 2 ELEMENTS 
    if(!goal || !goal.series) return false
    if(exerciseHistory.length < goal.series.length) return false

    let OlderSetsCopy = [...exerciseHistory]
    let shouldIncrease = true


    for(let i = 0 ; i< exerciseHistory.length; i ++){
      let index = goal.series.findIndex((exercisegoal)=>{
        exercisegoal.repetitions! >= exerciseHistory[i].repeat && exercisegoal.weightGoal >= exerciseHistory[i].weight
      })

      if(index<0){
        shouldIncrease = false
        break
      }

      OlderSetsCopy = [...OlderSetsCopy.slice(0,index),...OlderSetsCopy.slice(index+1,OlderSetsCopy.length)]

    }
    
    if(!shouldIncrease) return false

    return goal.series.map(exerciseGoal=>{
      exerciseGoal.weightGoal = exerciseGoal.weightGoal + exerciseGoal.increase
      return exerciseGoal
    })
}

export const getProgressedSeriesIndexes = (series: Series[],goal?:TrainingProgression) => {
  const progressedSeriesIndexes:ProgressedIndexesType = {series:[],goals:[]}
  if(!goal || !goal.series) return progressedSeriesIndexes

  goal.series.sort((a,b)=>{
    if(a.weightGoal>b.weightGoal) return 1
    return -1
  })

  let seriesCopy = [...series].sort((a,b)=>{
    if(a>b) return 1
    return -1
  })

  let goalSeriesCopy = [...goal.series]

  for(let i = 0 ; i<seriesCopy.length; i++){
    let index = goalSeriesCopy.findIndex(goal=>goal.weightGoal <= seriesCopy[i].weight && goal.repetitions <= seriesCopy[i].repeat)
    if(index<0) continue
    progressedSeriesIndexes.goals.push(goalSeriesCopy[index].id!)
    progressedSeriesIndexes.series.push(seriesCopy[i].id!)

    goalSeriesCopy = [...goalSeriesCopy.slice(0,index),...goalSeriesCopy.slice(index+1,goalSeriesCopy.length)]

  }
  return progressedSeriesIndexes
}

export const initializeInputsState = (exerciseid:string,requiresHandle: boolean, requiresTimeMesure: boolean,useremail:string) => {
    
    const data = localStorage.getItem(exerciseid+'training'+useremail)
    if(data){
        const parsedData = JSON.parse(data)
        return parsedData as SeriesWithExercise
    }
    let dataObject: SeriesWithExercise = {
        difficulty: 'easy',
        repeat: 0,
        side: 'Both',
        weight: 0,
        exerciseid,
    }
    if(requiresHandle) {
        dataObject.handle = {
            handleId: 'Sznur',
            handleName: 'Sznur'
        }
    }
    if(requiresTimeMesure){
        dataObject.time = 0
    }
    localStorage.setItem(exerciseid,JSON.stringify(dataObject))
    return dataObject
}

export const CheckIfTrainingExerciseGoalIsMet = (series:Series[],goal:TrainingProgression) => {
  let goalCopy = {...goal}
  if(!goal.series) return goalCopy

  series.sort((a,b)=>{
    if(a.weight>b.weight) return 1
    return -1
  })

  goal.series?.sort((a,b)=>{
    if(a.weightGoal>b.weightGoal) return 1
    return -1
  })

  let goalCopyForSlicing = [...goal.series]
  let shouldIncreaseGoal = true

  for(let i = 0; i< series.length; i ++){
    const index = goalCopyForSlicing.findIndex(goal=>{
      return goal.weightGoal <= series[i].weight && goal.repetitions <= series[i].repeat
    })
    if(index>=0){
      goalCopyForSlicing = [...goalCopyForSlicing.slice(0,index),...goalCopyForSlicing.slice(index+1,goalCopyForSlicing.length)]
    }else{
      shouldIncreaseGoal = false
      continue
    }

  }

  if(shouldIncreaseGoal && goalCopyForSlicing.length === 0){
    //THAT MEANS WE UPDATE THE GOAL
    goalCopy.series?.map(goal=>{
      goal.weightGoal = goal.weightGoal + goal.increase
      return goal
    })

  }
  return goalCopy
}

export const compareBetterSeries = (series1:Series[],series2:Series[]) => {
  const weightPoints = 0.7
  const numberOfRepetitionsPoint = 0.2
  const numberOfSeriesPoints = 0.1

  let series1Points = 0
  let series2Points = 0

  series1Points = getTotalRepetitons(series1,'repeat') * numberOfRepetitionsPoint + getTotalRepetitons(series1,'weight') * weightPoints + series1.length * numberOfSeriesPoints
  series2Points = getTotalRepetitons(series2,'repeat') * numberOfRepetitionsPoint + getTotalRepetitons(series2,'weight') * weightPoints + series2.length * numberOfSeriesPoints

  if(series1Points === series2Points) return {value: 'equal', score: series1Points}
  if(series1Points > series2Points) return {value: 'series1', score: series1Points - series2Points}
  return { value: 'series2', score: series1Points - series2Points}
}

type TraineeTrainingSet = TraineeSingleTraining["exercises"][number]["sets"][number]

const CheckIfTraineeTrainingSetIsProgressive = (set: TraineeTrainingSet) => {
  if(typeof set.isSetCompleted === 'boolean') return set.isSetCompleted

  const repetitionGoalMet = set.actual.repeat >= set.goal.repetitionsgoalmin
  const weightGoalMet = set.goal.weightgoal <= 0 || set.actual.weight >= set.goal.weightgoal
  const timeGoalMet = typeof set.goal.timegoal !== 'number' || set.goal.timegoal <= 0 || (set.actual.time ?? 0) >= set.goal.timegoal

  return repetitionGoalMet && weightGoalMet && timeGoalMet
}

export const GetOverallTraineeTrainingProgression = (training: TraineeSingleTraining): 'progressive' | 'regressive' | 'neutral' => {
  let progressiveSets = 0
  let regressiveSets = 0

  training.exercises.forEach(exercise => {
    exercise.sets.forEach(set => {
      if(CheckIfTraineeTrainingSetIsProgressive(set)){
        progressiveSets++
        return
      }

      regressiveSets++
    })
  })

  if(progressiveSets === regressiveSets) return 'neutral'
  if(progressiveSets > regressiveSets) return 'progressive'
  return 'regressive'
}

const getTotalRepetitons = (series:Series[],name:'repeat'|'weight') => {
  let num = 0
  series.forEach(s=>num = num + s[name])
  return num
}

function site(){
  const datas = document.querySelectorAll('.ng-tns-c3249762721-2')

  let arr = []
  for(let i = 0; i< datas.length; i++){
    if(i <= 1) continue
    const hasClass = datas[i].querySelector('.sticker-percentage')
    const hasLowStickerValue = datas[i].querySelector('.sticker-container')
    if(!hasClass && !hasLowStickerValue) continue

    if(hasLowStickerValue){
      arr.push({element:datas[i],value:0})
      continue
    }
    if(hasClass?.innerHTML.includes('&gt;')){
      arr.push({element:datas[i],value:hasClass.innerHTML.slice(5,-5)})
    }
    arr.push({element:datas[i],value:hasClass?.innerHTML.slice(0,-5)})
  }
  datas.forEach((item,index)=>{
    if(index === 0||index === 1) return
    item.remove()
  })
  const elem = document.querySelector('.content-wrapper')
  const newArr = arr.sort((a,b)=>{
      console.log(a.value,b.value)
    if(Number(a.value) > Number(b.value)) return 1
    return -1
  })
  newArr.forEach(item=>elem?.appendChild(item.element))

}
export const localStorageStringForLongTermPlan = (planName: string) => {
    return `long-term-plan-save-${planName}`
}

export const WSString = process.env.NEXT_PUBLIC_WSSERVER_URL

export const MetaDataTranslations = async () => {
  const locale = await getLocale()
  const t = await getTranslations({locale, namespace: 'Metadata'});
  return t
}

export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: any
): Promise<Blob> {
  const image = new Image();
  image.src = imageSrc;

  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx?.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob!);
    }, "image/jpeg");
  });
}

export const getOffsetDays = (date: Date) => {
  // 0-6, 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  //0 should be 6, 1 should be 0, 2 should be 1, 3 should be 2, 4 should be 3, 5 should be 4, 6 should be 5
  const weekDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  if(weekDay === 0) return 6
  
  return weekDay - 1
}

const offsetDaysNextMonth = (date: Date) => {
  const offsetDays = getOffsetDays(date)
  if(offsetDays === 0) return 0
  return 7 - offsetDays
}

export const offsetDaysPreviousMonthArray = (date: Date) => {
  const newDate = subMonths(date,1)
  const numberOfDaysInMonth = getDaysInMonth(newDate)
  const offsetDays = getOffsetDays(date)

  let arr:Date[] = []
  for(let i = 0 ; i< offsetDays; i++){
    arr.push(new Date(newDate.getFullYear(), newDate.getMonth(), numberOfDaysInMonth-i))
  }
  return arr.reverse()
}

export const offsetDaysNextMonthArray = (date: Date) => {
  const newDate = addMonths(date,1)

  const offsetDays = offsetDaysNextMonth(newDate)
  if(offsetDays === 0) return []

  let arr:Date[] = []
  for(let i = 0 ; i< offsetDays; i++){
    arr.push(new Date(newDate.getFullYear(), newDate.getMonth(), i+1))
  }
  return arr
}

export const TraineePlanErrorChecker = (plan : TraineePlan, locale: Locale) => {
  if(!plan.name || plan.name.trim() === '') return locale === 'en' ? 
    'Plan must have a name' : 
    'Plan musi mieć nazwę'
  if(plan.plan.length === 0) return locale === 'en' ? 
    'Plan must have at least one sub-plan' : 
    'Plan musi mieć przynajmniej jeden podplan'
  for(let i = 0; i< plan.plan.length; i++){
    const subPlan = plan.plan[i]
    if(!subPlan.name || subPlan.name.trim() === '') return locale === 'en' ? 
      `Sub-plan ${i+1} must have a name` : 
      `Podplan ${i+1} musi mieć nazwę`
    if(subPlan.exercises.length === 0) return locale === 'en' ? 
      `Sub-plan ${i+1} must have at least one exercise` : 
      `Podplan ${i+1} musi mieć przynajmniej jedno ćwiczenie`
    for(let j = 0; j< subPlan.exercises.length; j++){
      const exercise = subPlan.exercises[j]
      if(!exercise.exercisename || exercise.exercisename.trim() === '') return locale === 'en' ? 
        `Exercise ${j+1} in sub-plan ${i+1} must have a name` : 
        `Ćwiczenie ${j+1} w podplanie ${i+1} musi mieć nazwę`
      if(exercise.sets.length === 0) return locale === 'en' ? 
        `Exercise ${j+1} in sub-plan ${i+1} must have at least one set` : 
        `Ćwiczenie ${j+1} w podplanie ${i+1} musi mieć przynajmniej jedną serię`
      for(let k = 0; k< exercise.sets.length; k++){
        const set = exercise.sets[k]
        if(set.goal.repetitionsgoalmin <= 0) return locale === 'en' ? 
          `Set ${k+1} in exercise ${j+1} in sub-plan ${i+1} must have a minimum repetition goal greater than 0` : 
          `Zestaw ${k+1} w ćwiczeniu ${j+1} w podplanie ${i+1} musi mieć minimalny cel powtórzeń większy niż 0`
        if(set.goal.repetitionsgoalmax < set.goal.repetitionsgoalmin) return locale === 'en' ? 
          `Set ${k+1} in exercise ${j+1} in sub-plan ${i+1} must have a maximum repetition goal greater than or equal to the minimum repetition goal` : 
          `Zestaw ${k+1} w ćwiczeniu ${j+1} w podplanie ${i+1} musi mieć maksymalny cel powtórzeń większy lub równy minimalnemu celowi powtórzeń`
        if(set.goal.weightgoal < 0) return locale === 'en' ? 
          `Set ${k+1} in exercise ${j+1} in sub-plan ${i+1} must have a weight goal greater than or equal to 0` : 
          `Zestaw ${k+1} w ćwiczeniu ${j+1} w podplanie ${i+1} musi mieć cel wagowy większy lub równy 0`
      }
    }
  }
  return null
  
}

 export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
   let timer: ReturnType<typeof setTimeout>;
   return (...args: Parameters<T>) => {
     clearTimeout(timer);
     timer = setTimeout(() => fn(...args), delay);
   };
 }

export const resolveExerciseName = (nameOrId: string, allExercisesObject?: any): string => {
  // Check if it's a UUID (looks like a UUID pattern)
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(nameOrId)) {
    // Try to find the exercise name from allExercisesObject
    if (allExercisesObject) {
      for (const category in allExercisesObject) {
        const exercises = allExercisesObject[category]
        if (Array.isArray(exercises)) {
          const found = exercises.find((ex: any) => ex.id === nameOrId)
          if (found) {
            return found.exercisename || nameOrId
          }
        }
      }
    }
    return 'Unknown Exercise'
  }
  return nameOrId
}
