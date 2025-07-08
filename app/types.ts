export type Series = {
    weight:number,
    repeat:number,
    difficulty: DifficultyLevelType,
    time?: number,
    side: Side,
    id?: string,
}

export type WidgetHomeTypes = {
    sets: Series[],
    date: Date
}

export type AddExerciceReducerType = {
    weight: number,
    repeat: number,
    side: Side,
    series: Series[],
    difficultyLevel: DifficultyLevelType,
    time?: number,
}

export type Side = 'Both' | 'Left' | 'Right'

export type DifficultyLevelType = 'easy'|'medium'|'hard'

export type ActionTypes = {
    type: ActionTypesEnum
    payload?: number | DifficultyLevelType | Series[] | string,
    index?: number
}

export type ActionTypesEnum = 'WEIGHT'|'REPEAT'|'TEMPOUP'|'TEMPODOWN'|'ADDSERIES'|'DIFFICULTY'|'SETSERIESFROMMEMORY'|'DELETESERIES' | 'EDITSERIESKG' | 'EDITSERIESREPEAT' | 'EDITSERIESSIDE' | 'EDITSERIESDIFFICULTY' | 'TIME' | 'EDITSERIESTIME' | 'RESETSTATE' | 'SIDE'

export type UserExercise = {
    id:string,
    exercisename:string,
    timemesure: boolean,
    useshandle: boolean,
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

export type WidgetHomeDaysSum = {[key:string]:{dayWeight:number,dayRepeats:number}}
export type WeekDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
export type WeekDayPL = 'Poniedziałek' | 'Wtorek' | 'Środa' | 'Czwartek' | 'Piątek' | 'Sobota' | 'Niedziela'

export type UserTrainingPlan = {
    id: string,
    userid: string,
    trainingname: string,
    date: Date,
    exercises: TrainingProgression[],
    weekday: WeekDay
}

export type TrainingProgression = {
    exercisename: string,
    exerciseid: string;
    id: string,
    series?:{
        repetitions: number,
        increase: number,
        weightGoal: number,
        id?: string,
    }[]
}

export type ProgressedIndexesType = {
    series:string[],
    goals:string[],
}

export type ExercisesThatRequireTimeMesureOrHandle = {
    id:string,
    exercisename:string
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
    date?: Date,
    sets: Series[],
}

export type ExerciseTypeWithHandle = ExerciseType & { handlename?: string }

export type UserSettings = {
    goal:  'Siła' | 'Hipertrofia' | 'Oba',
    advancmentlevel: 'Początkujący' | 'Średniozaawansowany' | 'Zaawansowany',
    daysexercising: '1' | '2' | '3' | '4' | '5' | '6' | '7',
    favouriteexercises?: string[],
    notfavouriteexercises?: string[],
}

export type HistoryExercise = {
    day: Date,
    exercises:ExerciseTypeWithHandle[]
}

export type LocalStorageTraining = {
    exercises:LocalStorageExercise[],
    currentExerciseIndex: number,
    trainingId: string,
    trainingStartDate: Date,
    trainingNameInLocalStrage: string,
}

export type LocalStorageExercise = {
    id: string,
    exerciseName: string,
    exerciseId: string,
    sets: Series[],
    handle? :{
        handleName: string,
        handleId: string,
    },
    date?: Date,
}

export type SeriesWithExercise = Series & {
    exerciseid: string
    handle?: {
        handleName: string,
        handleId: string,
    }
}

export type InitialReducerType = {
    weight: number,
    repeat: number,
    side: Side,
    series: Series[],
    difficultyLevel: DifficultyLevelType
    time?: number,
    exerciseid: string
    handle?: {
        handleName: string,
        handleId: string,
    }
  }

export type GymExercise = {
    id: string,
    userid: string,
    exerciseid: string,
    date: Date,
    sets: Series[],
    ispartoftraining: boolean,
    trainingid? :string,
    exercisename: string,
    handleid?: string,
    handlename?: string
}

export type Span = 'month'|'quarter'|'year'|'beggining'

export type Status = 'error' | 'loading' | 'idle'

export type SummaryDataFetched = {
    sets: Series[], 
    exercisename: string, 
    date: Date
}

export type BasicSummaryDataType = {
    weight:{date:Date,value:number}[],
    repeats:{date:Date,value:number}[],
}

type cachedType = {
    weight:{date:Date,value:number}[],
    repeats:{date:Date,value:number}[],
    exercises:  {
        name: string,
        data: {date:Date,value:number}[],
    }[]
}

export type CachedSummaryDataType = {
    month?: cachedType
    quarter?: cachedType,
    year?: cachedType,
    beggining?: cachedType,
}

export type ExerciseSummaryType = {
    data: {date:Date,value:number}[],
}

export type SholudAddWeightType = {
    repetitions: number;
    increase: number;
    weightGoal: number;
}

export type ProgressionType = {
    id: string
    repetitions: number;
    increase: number;
    weightGoal: number;
}
export type Progression = {
    id:string,
    userid: string,
    exerciseid:string,
    exercisename:string
    series:{
        id:string,
        increase:number,
        weightGoal:number,
        repetitions:number
    }[]
}
