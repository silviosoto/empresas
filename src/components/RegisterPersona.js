
 
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from '../components/useForms'
import { startLimpiarPersona, StartRegistrarPersona, StartActualizarPersona } from '../actions/persona';
import { Redirect } from 'react-router';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
 
export const RegisterPersona = () =>{
     
    const persona = useSelector( state => state.Persona );

    const dispatch = useDispatch();

    var obj = {};
    

    if(  !(Object.keys(persona).length === 0)   ){
       obj =  {
            id : persona.id,
            via: persona.via, 
            email: persona.email, 
            enviomensajes: 1 ,
            Idmunicipio: persona.idMunicipio, 
            idMunicipioNavigation: persona.idMunicipioNavigation, 
            letra: persona.letra, 
            nombreCompania: persona.nombreCompania,
            numero:persona.numero,
            numero2: persona.numero2,
            numeroComplemento: persona.numeroComplemento,
            numeroIdentificacion: persona.numeroIdentificacion,
            primerapellido: persona.primerapellido,
            primerNombre: persona.primerNombre,
            segundoapellido: persona.segundoapellido,
            segundoNombre: persona.segundoNombre,
            telefono: persona.telefono,
            tipoIdentificacion: persona.tipoIdentificacion,
        }
    }
    else{
        obj =  {
            via: "", 
            email: "", 
            enviomensajes: true ,
            Idmunicipio: 0, 
            idMunicipioNavigation: 0, 
            letra: "", 
            nombreCompania: "",
            numero: 0,
            numero2: 0,
            numeroComplemento: "",
            numeroIdentificacion: 0,
            primerapellido: "",
            primerNombre: "",
            segundoapellido: "",
            segundoNombre: "",
            telefono: "",
            tipoIdentificacion: "",
        }
    }

    const [ formoriginValues, handleRegisterPersona ]  = useForm( obj );
    
    var {  
        id,
        via, 
        email , 
        enviomensajes  ,
        Idmunicipio , 
        idMunicipioNavigation , 
        letra , 
        nombreCompania,
        numero ,
        numero2 ,
        numeroComplemento ,
        numeroIdentificacion ,
        primerapellido ,
        primerNombre ,
        segundoapellido ,
        segundoNombre ,
        telefono ,
        tipoIdentificacion  } = formoriginValues;

    const direccion = via +" "+numero+" "+numero2+" "+numeroComplemento; 

    // Guarda los registros en la base de datos  
    const Registrar = (e) =>{
        e.preventDefault();
        // validar formulario
       console.log(numeroIdentificacion);
        if( tipoIdentificacion == "" || tipoIdentificacion == undefined ){            
            Swal.fire('Debe ingresar el tipo de identificacion', '', 'error')
            return; 
        }

        if( numeroIdentificacion == ""  ){
            Swal.fire('Debe ingresar el numero de identificación', '', 'error')
            return; 
        }

        if(tipoIdentificacion != "" && (tipoIdentificacion == "nit" || tipoIdentificacion =="cce" ) ){
            if( nombreCompania == ""){
                Swal.fire('Debe ingresar el la razón social', '', 'error')
                return; 
            }
        }

        if( tipoIdentificacion == "cc"   ){
            if( primerNombre == ""){
                Swal.fire('Debe ingresar el nombre', '', 'error')
                return; 
            }
            if( segundoNombre == ""){
                Swal.fire('Debe ingresar el segundo nombre ', '', 'error')
                return; 
            }
            if( primerapellido == ""){
                Swal.fire('Debe ingresar el primer apellido', '', 'error')
                return; 
            }
            if( segundoapellido == ""){
                Swal.fire('Debe ingresar el segundo apellido', '', 'error')
                return; 
            }
        }
        
        if( email == "" ){
            Swal.fire('Debe ingresar el correo electronico ', '', 'error')
            return; 
        }
        
        if( numero == "" ){
            Swal.fire('Debe ingresar el  numero 1', '', 'error')
            return; 
        }
        
        if( numero2 == "" ){
            Swal.fire('Debe ingresar el  numero 2', '', 'error')
            return; 
        }
        
        if( telefono == "" ){
            Swal.fire('Debe ingresar el telefono ', '', 'error')
            return; 
        }
        
        if( telefono == "" ){
            Swal.fire('Debe ingresar el telefono ', '', 'error')
            return; 
        }
        
        if( enviomensajes ==1 ){
            enviomensajes = true;
        }
        var  send = { 
                id,    
                via, 
                email , 
                enviomensajes  ,
                Idmunicipio: parseInt(Idmunicipio) ,             
                letra , 
                nombreCompania,
                numero: parseInt(numero) ,
                numero2 : parseInt(numero2) ,
                numeroComplemento ,
                numeroIdentificacion: parseInt(numeroIdentificacion)  ,
                primerapellido ,
                primerNombre ,
                segundoapellido ,
                segundoNombre ,
                telefono ,
                tipoIdentificacion
        }
 
        if(  (Object.keys(persona).length === 0)   ){
          
            dispatch(StartRegistrarPersona(send));
        }else{
            dispatch(StartActualizarPersona(send));
        }
    } 
 
    return (
        <div className="App">
          <Container>
              <h2>Datos de la persona natural o juridica que solicita el servicio de tramistes virtuales:</h2>
             

              <Form>
                <Row className="mb-3">
                    <Form.Group as={Col}  >
                        <Form.Label>Tipo identificación *</Form.Label>
                        <Form.Select 
                            name = "tipoIdentificacion" 
                            value = { tipoIdentificacion } 
                            onChange={handleRegisterPersona}
                        >
                            <option value="">[Seleccione]</option>
                            <option value="nit">Nit</option>
                            <option value="cc">CC</option>
                            <option value="cce">CC Extrangera</option>
                        </Form.Select>
                        </Form.Group>

                    <Form.Group as={Col}>
                    <Form.Label>numero indentificación</Form.Label>
                        <Form.Control  
                            value= { numeroIdentificacion }                         
                            name ="numeroIdentificacion"
                            onChange={handleRegisterPersona}
                            type="number" />
                    </Form.Group>

                    <Form.Group as={Col} 
                  
                    controlId="formGridZip">
                    <Form.Label>Nombre/ Razon social *</Form.Label>
                         <Form.Control   
                            name ="nombreCompania"
                            value = { nombreCompania }    
                            onChange = { handleRegisterPersona }             
                            />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Primer Nombre</Form.Label>
                        <Form.Control type="text"
                            value= { primerNombre }                                               
                            name = "primerNombre"
                            onChange={ handleRegisterPersona }   
                        />
                        </Form.Group>

                    <Form.Group as={Col} >
                    <Form.Label>Segundo Nombre</Form.Label>
                        <Form.Control type="text"
                         value= { segundoNombre }                                               
                         name = "segundoNombre"
                         onChange={ handleRegisterPersona }   
                        />
                    </Form.Group>

                    <Form.Group as={Col} >
                    <Form.Label>Primer Apellido</Form.Label>
                         <Form.Control
                          value= { primerapellido }
                          onChange={ handleRegisterPersona }   
                          name = "primerapellido" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} >
                        <Form.Label>Segundo Apellido</Form.Label>
                            <Form.Control 
                             value= { segundoapellido }
                             onChange={ handleRegisterPersona }   
                             name="segundoapellido"
                            />
                        </Form.Group>

                    <Form.Group as={Col}>
                    <Form.Label>Email</Form.Label>
                        <Form.Control
                            value= { email }
                            name="email"
                            onChange={ handleRegisterPersona }   
                            type="email" />
                    </Form.Group>

                    <Form.Group className="mb-3"
                     
                     id="formGridCheckbox">
                    <Form.Check
                        checked= { enviomensajes }
                        // onChange={ handleRegisterPersona }   
                        type="checkbox" 
                        label="Enviar Mensajes"
                         />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} >
                        <Form.Label>via</Form.Label>
                        <Form.Select
                        name="via"
                        value= { via }
                        onChange={ handleRegisterPersona }   
                        >
                            <option value="">[Seleccione]</option>
                            <option value ="calle">Calle</option>
                            <option value ="Carrera" >Carrera</option>                            
                        </Form.Select>
                        </Form.Group>

                    <Form.Group as={Col} >
                    <Form.Label>Nro 1 *</Form.Label>
                        <Form.Control 
                            name="numero"
                            value= { numero }
                            onChange={ handleRegisterPersona }   
                        type="number" />
                    </Form.Group>

                    <Form.Group as={Col} >
                    <Form.Label
                    >Letra</Form.Label>
                        <Form.Control 
                        name="letra"
                        value= { letra }
                        onChange={ handleRegisterPersona }   
                        type="text" />
                    </Form.Group>

                    <Form.Group as={Col} >
                    <Form.Label
                      name="numero2"
                    >Nro2 *</Form.Label>
                        <Form.Control 
                             value= { numero2 }
                             onChange={ handleRegisterPersona }   
                            name="numero2"
                        type="number" />
                    </Form.Group>

                    <Form.Group as={Col} >
                    <Form.Label>Letra</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>

                    <Form.Group as={Col} >
                    <Form.Label >numero complementos</Form.Label>
                        <Form.Control
                        name="numeroComplemento"
                        value= { numeroComplemento }
                        onChange={ handleRegisterPersona }   
                        type="text" />
                    </Form.Group>
                </Row>
 
                <Row className="mb-3">
                     <Form.Group as={Col} >
                        <Form.Label>Dirección *</Form.Label>
                            <Form.Control 
                            name="direccion"
                            value= { direccion }
                            onChange={ handleRegisterPersona }   
                            type="text" />
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label>Municipio *</Form.Label>
                        {/* <Form.Control 
                            name="Idmunicipio"
                            value = { Idmunicipio }
                            onChange={ handleRegisterPersona }   
                            type="number" /> */}


                        <Form.Select
                            name="Idmunicipio"
                            value = { Idmunicipio }
                            onChange={ handleRegisterPersona }   
                        >
                            <option value="">[Seleccione]</option>
                            <option value ="1">Medellin</option>
                            <option value ="2" >Monteria</option>                            
                        </Form.Select>
                        </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label>Telefono *</Form.Label>
                            <Form.Control type="text"
                             value={ telefono }
                             onChange={ handleRegisterPersona }   
                             name="telefono"
                            />
                    </Form.Group>

                </Row>
                <Row className="mb-3">
                    <Button as={Col}variant="danger"  onClick={Registrar}>Continuar </Button> 
                    <Button as={Col} variant="dark" 
                    ><Link to = "/" >Regresar</Link>  </Button> 
                </Row>
                </Form>
          </Container>
        </div>
      );
}