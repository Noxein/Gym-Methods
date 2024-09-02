'use client'
import { createContext } from "react";
import { TempoType } from "../types";

export const TempoContext = createContext<dataType|null>(null)

type dataType = {
    [key: string]: {
        id: string;
        tempo: TempoType;
    };
}
export const TempoContextProvider = ({children,tempos}:{children:React.ReactNode,tempos: dataType}) => {

    return(
        <TempoContext.Provider value={tempos}>
            {children}
        </TempoContext.Provider>
    )
}