import { useDispatch } from 'react-redux';
import { types } from '../types/type';
import { fetchCustom }  from '../helper/fetch'
import Swal from 'sweetalert2';
import { Redirect  } from 'react-router-dom';

export const StartSearchNit = ( nit)  =>{
    return async( dispatch) =>{
        
        const resp = await fetchCustom( 'personas/'+nit, { } );
        if( resp.status === 200 ) {
            const body = await resp.json();
          
            dispatch(
                informationPersona(
                {   
                    ...body
                }
            ));
 
        }else{
 
            Swal.fire('La identificación de la empresa no se encuentra registrada', '', 'error')
        }
        
    }
}
export const StartRegistrarPersona = ( obj )  =>{
    return async( dispatch) =>{
        console.log(obj);

        const resp = await fetchCustom( 'personas/', { ...obj }, 'POST');
        if( resp.status === 201 ) {
            const body = await resp.json();
            dispatch(
                informationPersona(
                {   
                    ...body
                }
            ));
            Swal.fire('Guardado exitoso', '',  'success');
        }else{
 
            Swal.fire('ha ocurrido un error', '', 'error')
        }
    }
}

export const StartActualizarPersona = ( obj )  =>{
    return async( dispatch) =>{

        const resp = await fetchCustom( 'personas/'+obj.id, { ...obj }, 'PUT');
        const body = {}
        if( resp.status === 204 ) {           
            
            dispatch(
                LimpiarPersona(
                {   
                  
                }
            ));
            Swal.fire('Guardado exitoso', '',  'success');
        }else{
 
            Swal.fire('ha ocurrido un error', '', 'error')
        }
    }
}
 
const informationPersona = ( persona ) => ({
    type: types.searchNit,
    payload: persona
})

export const startLimpiarPersona = () => {
    return( dispatch ) => {
        dispatch(LimpiarPersona())
    }
}

const LimpiarPersona = () => ({ type: types.limpiar })


