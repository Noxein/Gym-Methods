import { ActionTypes, AddExerciceReducerType, DifficultyLevel } from "../types";

export const AddExerciceReducer = (state:AddExerciceReducerType,action:ActionTypes):AddExerciceReducerType => {
    if(typeof action.payload === 'number'){
        switch(action.type){
            case 'WEIGHT':
                return { ...state, weight: action.payload };
          
            case "REPEAT":
                return { ...state, repeat: action.payload };
    
            case "TEMPOUP":
                return { ...state, tempoUp: action.payload };
      
            case "TEMPODOWN":
                return { ...state, tempoDown: action.payload };
            case 'EDITSERIESKG':{
                let index = action.index!
                let changeValue = action.payload

                const arr = [...state.series]
                arr[index].weight = changeValue
                return {...state, series: arr}
            }

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
            case 'EDITSERIESTIME':{
                let index = action.index!
                let changeValue = action.payload

                const arr = [...state.series]
                arr[index].time = changeValue
                return {...state, series: arr}
            };
            case 'TIME' :{
                return { ...state, time: action.payload };
            }
        }
    }

    switch (action.type) {
        case "ADDSERIES":
            return { ...state, series: [...state.series, { 
                weight: state.weight,
                repeat: state.repeat,
                difficulty: state.difficultyLevel,
                time: state.time
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
                ...state, series : [], repeat: 0, difficultyLevel: 'easy', tempoDown: 0, tempoUp: 0, time: '', weight: 0
            }
        }
        default:
          return state;
      }
}