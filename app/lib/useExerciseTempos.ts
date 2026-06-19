'use client'

import { useEffect, useState } from "react";
import { getAllTempos } from "../actions";
import { UserExerciseTempoReturnType } from "../types";

export const useExerciseTempos = () => {
    const [tempos, setTempos] = useState<UserExerciseTempoReturnType>({})

    useEffect(() => {
        let isMounted = true

        const fetchTempos = async () => {
            try{
                const fetchedTempos = await getAllTempos()
                if(isMounted){
                    setTempos(fetchedTempos)
                }
            }catch{
                if(isMounted){
                    setTempos({})
                }
            }
        }

        fetchTempos()

        return () => {
            isMounted = false
        }
    }, [])

    return tempos
}
