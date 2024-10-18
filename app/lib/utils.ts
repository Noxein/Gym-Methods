import { WeekDay, WeekDayPL } from "../types"

export const WeekDayArray = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
export const WeekDayArrayPL = ['Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota','Niedziela']

export const MonthNamesArray = ['January','February','March','April','May',"June","July","August",'September','October','November','December']
export const MonthNamesArrayPL = ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień']
export const MonthNamesArrayVariantPL = ['Stycznia','Lutego','Marca','Kwietnia','Maja','Czerwica','Lipica','Sierpinia','Wrzesienia','Października','Listopada','Grudzieńa']

export const DifficultyArray = ['easy','medium','hard']
export const DifficultyArrayPL = ['Łatwa','Średnia','Trudna']


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