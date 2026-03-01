'use client'
import { createContext } from "react";
import { Locale } from "../i18n/config";
import { getUserLocale } from "../i18n/locale";

const LocaleContext = createContext<Locale|null>('en');

export default LocaleContext;

const LocaleProvider = ({children,lang}:{children:React.ReactNode,lang:Locale}) => {
    return(
        <LocaleContext.Provider value={lang as Locale}>
            {children}
        </LocaleContext.Provider>
    )
}

export { LocaleProvider };