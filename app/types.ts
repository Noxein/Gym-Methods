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
