import { types } from "../types/type";

const initialState = {
     
}

export const PersonaReducer = (state = initialState, action) => {
    
    switch (action.type){

        case types.searchNit:
            return {
                ...state,
                ...action.payload
            }

        case types.limpiar:
            return {
              
            }
    
        default : 
        return state;
    }
}