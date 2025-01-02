import { addDays, getDay, subDays } from "date-fns"
import { Series, TrainingProgression, WeekDay, WeekDayPL } from "../types"
import { setUserLocale } from "../i18n/locale"
import { Locale, locales } from "../i18n/config"

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
  const lang = localStorage.getItem('lang')
  if(!lang){
    localStorage.setItem('lang','en')
    return setUserLocale('en')
  }

  if(!locales.includes(lang as Locale)){
    localStorage.setItem('lang','en')
    return setUserLocale('en')
  }else{
    setUserLocale(lang as Locale)
  }
  
}

export const checkIfShouldIncreaseDifficulty = (exerciseHistory: Series[],goal?:TrainingProgression) => {
    //DATA ARRAY ALWAYS HAS 2 ELEMENTS 
    if(!goal || !goal.series || !goal.increase || !goal.repetitions || !goal.weightGoal) return false
    if(exerciseHistory.length < goal.series) return false

    let OlderSetsCopy = [...exerciseHistory]

    let totalSeriresGoal = 0
    let totalWeightGoal = 0

    for(let i = 0 ; i < exerciseHistory.length ; i ++){
      const index = OlderSetsCopy.findIndex(x=>{
        return x.weight >= goal.weightGoal! && x.repeat >= goal.repetitions!
      })
      
      if(index < 0) break
      
      OlderSetsCopy = [...OlderSetsCopy.slice(0,index),...OlderSetsCopy.slice(index+1,OlderSetsCopy.length)]

      totalSeriresGoal = totalSeriresGoal + 1
      totalWeightGoal = totalWeightGoal + 1
    }

    if(!(totalSeriresGoal >= goal.series)) return false
    if(!(totalWeightGoal >= goal.series)) return false
    
    return {
      weight: goal.weightGoal + goal.increase,
      repetitions: goal.repetitions,
      series: goal.series
    }
}