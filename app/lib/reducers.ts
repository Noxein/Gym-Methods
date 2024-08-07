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
                return { ...state, difficultyLevel: action.payload };
            case 'EDITSERIESDIFFICULTY':{
                let index = action.index!
                let changeValue = action.payload

                const arr = [...state.series]
                arr[index].difficulty = changeValue
                return {...state, series: arr}
            }
        }
    }
    switch (action.type) {
        case "ADDSERIES":
            return { ...state, series: [...state.series, { 
                weight: state.weight,
                repeat: state.repeat,
                difficulty: state.difficultyLevel,
            }]};
        case 'SETSERIESFROMMEMORY':
            if(action.payload && typeof action.payload !== 'number' && typeof action.payload !== 'string'){
                return {
                    ...state, series: action.payload
                }
            };
        case 'DELETESERIES':
            return {...state, series: state.series.filter((set,i)=>i!==action.payload)}
        default:
          return state;
      }
}