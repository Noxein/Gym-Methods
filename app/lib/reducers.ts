import { v4 } from "uuid";
import { ActionTypes, AddExerciceReducerType, DifficultyLevelType, Side } from "../types";

export const AddExerciceReducer = (state:AddExerciceReducerType,action:ActionTypes):AddExerciceReducerType => {
    if(typeof action.payload === 'number'){
        switch(action.type){
            case 'WEIGHT':
                return { ...state, weight: action.payload };
          
            case "REPEAT":
                return { ...state, repeat: action.payload };
    
            case 'TIME':{
                return { ...state, time: action.payload };
            }
            case 'EDITSERIESKG':{
                let index = action.index!
                let changeValue = action.payload

                const arr = [...state.series]
                arr[index].weight = changeValue
                return {...state, series: arr}
            }
            case 'EDITSERIESTIME':{
                let index = action.index!
                let changeValue = action.payload

                const arr = [...state.series]
                arr[index].time = changeValue
                return {...state, series: arr}
            };
            case 'EDITSERIESREPEAT':{
                let index = action.index!
                let changeValue = action.payload

                const arr = [...state.series]
                arr[index].repeat = changeValue
                return {...state, series: arr}
            }
        }
    }
    if(typeof action.payload === 'string'){
        switch (action.type) {
            case "DIFFICULTY":
                return { ...state, difficultyLevel: action.payload as 'easy'|'medium'|'hard' };
            case 'EDITSERIESDIFFICULTY':{
                let index = action.index!
                let changeValue = action.payload

                const arr = [...state.series]
                arr[index].difficulty = changeValue as 'easy'|'medium'|'hard'
                return {...state, series: arr}
            };
            case 'EDITSERIESSIDE':{
                let index = action.index!
                let changeValue = action.payload

                const arr = [...state.series]
                arr[index].side = changeValue as Side
                return {...state, series: arr}
            }
            case 'SIDE' :{
                return { ...state, side: action.payload as Side };
            }
        }
    }

    switch (action.type) {
        case "ADDSERIES":
            return { ...state, series: [...state.series, { 
                weight: state.weight,
                repeat: state.repeat,
                difficulty: state.difficultyLevel,
                time: state.time,
                side: state.side,
                id: action.payload as string
            }]};
        case 'SETSERIESFROMMEMORY':
            if(action.payload && typeof action.payload !== 'number' && typeof action.payload !== 'string'){
                return {
                    ...state, series: action.payload
                }
            };
        case 'DELETESERIES':
            return {...state, series: state.series.filter((set,i)=>i!==action.payload)};
        case 'RESETSTATE' :{
            return {
                ...state, series : [], repeat: 0, difficultyLevel: 'easy', time: 0, weight: 0, side: 'Both'
            }
        }
        default:
          return state;
      }
}