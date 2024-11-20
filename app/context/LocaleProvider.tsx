'use client'
import { createContext } from "react";

export const LangContext = createContext<dataType|null>(null)
 
type dataType = string

export const TempoContextProvider = ({children,tempos}:{children:React.ReactNode,tempos: dataType}) => {

    return(
        <LangContext.Provider value={tempos}>
            {children}
        </LangContext.Provider>
    )
}