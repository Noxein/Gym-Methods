'use client'
import { WSString } from "@/app/lib/utils";
import { UserPurposeType } from "@/app/types";
import { createContext, useEffect, useRef, useState } from "react";

const TraineeHomeContext = createContext<TraineeHomeContextType | null>(null)

export default TraineeHomeContext;

type TraineeHomeContextType = {
    connectedTrainees: string[]
}

type TrainerHomeContextProviderProps = {
    children: React.ReactNode,
    ids: string[],
    userid: string,
    userPurpose: UserPurposeType
}
export const TrainerHomeContextProvidr = ({children,ids, userid, userPurpose}: TrainerHomeContextProviderProps) => {

    const wsRef = useRef<WebSocket | null>(null)
    const [connectedTrainees, setConnectedTrainees] = useState<string[]>([])  

    useEffect(() => {
        if(ids.length === 0) return

        wsRef.current = new WebSocket(`${WSString}/trainee-training`)

        wsRef.current.onopen = async () => {
            console.log('WebSocket connected');
            wsRef.current?.send(JSON.stringify({type: "TRAINER_HOME",traineesIds: ids, userid,userPurpose}))
        }

        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data)

            if(data.type === 'CONNECTED_TRAINEES'){
                const trineesIds = data.traineesIds
                if(trineesIds.length === 0) return
                console.log('Received connected trainees:', trineesIds);
                setConnectedTrainees(trineesIds)
            }
            console.log('Received WebSocket message:', data);
        }
        
        return () => {
            wsRef.current?.close()
        }
    }, [])
    return(
        <TraineeHomeContext.Provider value={{ connectedTrainees }}>
            {children}
        </TraineeHomeContext.Provider>
    )
}