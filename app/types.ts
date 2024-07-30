export type Series = {
    weight:number,
    repeat:number
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