import { combineReducers } from 'redux';
 
import { PersonaReducer } from './personaReducer';
  
export const rootReducer = combineReducers({

    Persona: PersonaReducer,
 
    // TODO: AuthReducer
})

