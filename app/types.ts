export type Series = {
    weight:number,
    repeat:number
}

export type ThemeContextTypes = {
    theme: 'dark'|'light',
    setTheme: React.Dispatch<React.SetStateAction<'dark'|'light'>>
}