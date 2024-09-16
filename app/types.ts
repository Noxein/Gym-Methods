export type Series = {
    weight:number,
    repeat:number,
    difficulty: DifficultyLevel,
    time?:string,
    side: Side
}

export type ColorPalleteType = {
    primary: string,
    secondary: string,
    accent: string,
}

export type ThemeContextTypes = {
    theme: 'dark'|'light',
    setTheme: React.Dispatch<React.SetStateAction<'dark'|'light'>>,
    colorPallete: ColorPalleteType
}
export type AddExerciceReducerType = {
    weight: number,
    repeat: number,
    tempoUp: number,
    tempoDown: number,
    side: Side,
    series: Series[],
    difficultyLevel: DifficultyLevel,
    time: string,
}

export type Side = 'Both' | 'Left' | 'Right'

export type DifficultyLevel = 'easy'|'medium'|'hard'

export type ActionTypes = {
    type: ActionTypesEnum
    payload?: number | DifficultyLevel | Series[] | string,
    index?: number
}

export type ActionTypesEnum = 'WEIGHT'|'REPEAT'|'TEMPOUP'|'TEMPODOWN'|'ADDSERIES'|'DIFFICULTY'|'SETSERIESFROMMEMORY'|'DELETESERIES' | 'EDITSERIESKG' | 'EDITSERIESREPEAT' | 'EDITSERIESSIDE' | 'EDITSERIESDIFFICULTY' | 'TIME' | 'EDITSERIESTIME' | 'RESETSTATE' | 'SIDE'

export type UserExercise = {
    id:string,
    exercisename:string,
    timemesure: boolean,
}

export type TempoType = {
    up: number,
    uphold:number,
    down: number,
    downhold:number,
}

export type UserExerciseTempo = {
    id: string,
    userid: string,
    exerciseid: string,
    tempo: TempoType,
}

export type UserExerciseTempoReturnType= {
    [key: string]:{id:string,tempo:TempoType}
}

export type ExerciseTypes = {
    Wielostawowe:{
        Gora: string[],
        Dol: string[],

    },
    Izolacyjne:{
        Ramiona: string[],
        Przedramiona: string[],
        Biceps: string[],
        Triceps: string[],
        Klata: string[],
        Plecy: string[],
        Dwuglowe: string[],
        Czworoglowe: string[],
        Brzuch: string[],
        Posladki: string[],
        Lydki: string[],
    }
    userExercises?: UserExercise[]
}

export type SelectedExerciseWithTempo = {
    id:string,
    name:string,
    tempo:{
        up:number,
        uphold:number,
        down:number,
        downhold:number,
    }
}
export type WeekDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
export type WeekDayPL = 'Poniedziałek' | 'Wtorek' | 'Środa' | 'Czwartek' | 'Piątek' | 'Sobota' | 'Niedziela'

export type UserTrainingPlan = {
    id: string,
    userid: string,
    trainingname: string,
    date: Date,
    exercises:{
        exercises: TrainingExerciseType[],
    },
    weekday: WeekDay
}

export type TrainingExerciseType = {
    exercisename: string,
    exerciseid:string,
    id: string,
}

export type UserTrainingInProgress = {
    id: string,
    userid: string,
    exercisesleft: string[],
    iscompleted: boolean,
    trainingid: string,
    datetime: Date,
}

export type LastExerciseType = {
    trainingid: string,
    datetime: Date,
    trainingname: string,
    weekday: WeekDay,
}

export type LastTrainingType = {
    trainingid: string,
    trainingdatetime: Date,
    id: string,
    exerciseid: string,
    sets: { 
        sets: Series[], diffucultyLevel: DifficultyLevel
    },
    date: Date
}

export type GymExercisesDbResult = {
    id: string,
    userid: string,
    exerciseid: string,
    date: Date,
    sets: Series[],
    ispartoftraining: boolean
    trainingid: string,
}

export type ExerciseType = {
    id: string,
    exercisename: string,
    date: Date,
    sets: Series[],
}

export type UserSettings = {
    showtempo: boolean,
    goal:  'Siła' | 'Hipertrofia' | 'Oba',
    advancmentlevel: 'Początkujący' | 'Średniozaawansowany' | 'Zaawansowany',
    daysexercising: '1' | '2' | '3' | '4' | '5' | '6' | '7',
    favouriteexercises?: string[],
    notfavouriteexercises?: string[],
}

export type HistoryExercise = {
    day: Date,
    exercises:ExerciseType[]
}