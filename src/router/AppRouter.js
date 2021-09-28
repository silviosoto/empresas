import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Route ,
    Switch,
    Redirect
  } from 'react-router-dom';
 
import { Persona } from '../components/Persona';
import { RegisterPersona } from '../components/RegisterPersona';
 
 
export const AppRouter = () => {
  
    return (
        <Router>
            <div>
                <Switch>
                    <Route                     
                        exact path="/"
                        component={ Persona } >
                            
                    </Route>
                    <Route                     
                          path="/register"
                        component={ RegisterPersona } >
                    </Route>

                   
                </Switch>
            </div>
        </Router>
    )
}
