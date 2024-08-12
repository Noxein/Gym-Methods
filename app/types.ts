export type Series = {
    weight:number,
    repeat:number,
    difficulty: DifficultyLevel
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
    series: Series[],
    difficultyLevel: DifficultyLevel
}

export type DifficultyLevel = 'easy'|'medium'|'hard'

export type ActionTypes = {
    type: ActionTypesEnum
    payload?: number | DifficultyLevel | Series[],
    index?: number
}

export type ActionTypesEnum = 'WEIGHT'|'REPEAT'|'TEMPOUP'|'TEMPODOWN'|'ADDSERIES'|'DIFFICULTY'|'SETSERIESFROMMEMORY'|'DELETESERIES' | 'EDITSERIESKG' | 'EDITSERIESREPEAT' | 'EDITSERIESDIFFICULTY'

export type UserExercise = {
    id:string,
    exercisename:string
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

export type ExerciceTypes = {
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