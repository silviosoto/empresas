
 
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from '../components/useForms'
import { StartSearchNit } from '../actions/persona';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


export const Persona = () =>{
    
    const dispatch = useDispatch();
  
    const [ formoriginValues, handleSearchNit ]  = useForm( {
      nit: ""
    } );
  
    const { nit } =  formoriginValues;
  
    const SearchNit = (e) =>{
      e.preventDefault();
      
      if( nit == ""){
        Swal.fire('Digite el NIT', '', 'error')
        return ;
      }
   
      dispatch( StartSearchNit( nit) );
    }
 
    const { id } = useSelector( state => state.Persona );
    
    if(  id  ){
        return ( <Redirect to="/register" /> );
    }

 

    return (
        <div className="App">
          <Container>
            <Row className="mx-0">
              <h1>Inscripción al servicio</h1>
              <p>Ingrese el NIT de la persona natural o juridica para la que realizará 
                 el tramite, sin incluir el digito de verificación. Luego seleccione Continuar para completar su solicitud</p>
                 <Form>
                <Row>
                  <Col>
                    <Form.Control placeholder="NIT" 
                        defaultValue = { nit } 
                        type="number"
                        name="nit"
                        onChange={handleSearchNit}
                     />
                  </Col>
                  <Col>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button variant="danger"
                    onClick={SearchNit}
                    >Continuar </Button> 
                  </Col>
                  <Col>
                  <Button variant="dark"  ><Link to = "/register" >Registrar</Link>  </Button> 
                  </Col>
                </Row>
              </Form>
              
            </Row>
          
          </Container>
        </div>
      );
}