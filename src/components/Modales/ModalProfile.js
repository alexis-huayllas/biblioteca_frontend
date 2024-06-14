import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from '../../handler/useForm';
import axios from 'axios';
import SweetAlertHandler from '../Alerta/Sweetalerthandler';
import SweetAlertHandlerConfirm from '../Alerta/Sweetalerthandlerconfirm';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import FormularioField from '../Formularios/FormularioField';
import { endPointsusuario } from '../../constantes/endpoints';
import ModalForms from './ModalForms';
import ModalFormsContraseña from './ModalFormsContraseña';
import { Link } from 'react-router-dom';

const ModalProfile =  ({estado}) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

//console.log('dataselect',dataselect);

    const [token] = useState(localStorage.getItem('token'));
    const [nombreuser] = useState(localStorage.getItem('nombre'));
    const [user,SetUser] = useState([]);
    //console.log('initForm',initForm);
    //console.log('Formudata',Formudata);
    const MySweetAlert = withReactContent(Swal);

    const actualizar = ()=> estado();


useEffect(()=>{
    const ListData = async () => {
        try {
            const response = await axios.get(endPointsusuario.profile.url,{headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}}); // Reemplaza con la URL de tu API
            SetUser(response.data);
            //console.log('response',response.data)
        } catch (error) {
          if (error.response.status===401&& error.response.statusText==='Unauthorized') {
            MySweetAlert.fire({
              title: 'Su sesion Expiro',//'¡Hola!',
              text: 'Debe iniciar sesion',//'Este es un mensaje de SweetAlert en React.',
              icon: 'info',//'success',
              confirmButtonText: 'Aceptar',
              
            }).then(async (result) => {if (result.isConfirmed) { 
              //console.log('no autorizado');
              localStorage.removeItem('type');
              localStorage.removeItem('usuario');
              localStorage.removeItem('token');
              actualizar();
              }});
          }
            //console.log('Error al cargar datos:', error);
        }
      };
      ListData();
},[])

  /*const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', form);
  };*/

  const handleSubmitdata = (formu) => {
    //const formData = new FormData();
    //e.preventDefault();
    if (formu.password==="") {
        //console.log('error de titulo');
        return {valor:false};
    }
    /*if (formu.password!==formu.repassword) {
        //console.log('error de titulo');
        return {valor:false};
    }*/
    

    //Object.keys(formu).map((value)=>{if(formu[value]!==null&&formu[value]!==undefined&&formu[value]!=='')formData.append(''+value, formu[value])});
    return {valor:true,url:endPointsusuario.contraseña_usuario.url+user.id,formulario:formu/*formData*/};
  };

  return (
    <>
      <button style={{borderStyle:'none',background:'none',color:'yellowgreen'}}  className="nav-link" onClick={handleOpenModal}>
        {nombreuser}
      </button>
      

      <Modal style={{color:'black'}} show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{'Mi Perfil'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            nombre:{user.name}<br/>
            Apellido:{user.last_name}<br/>
            Usuario:{user.usuario}<br/>
        </Modal.Body>
        <Modal.Footer>
            <a className='btn btn-outline-info' href='/verperfil'>Ver Perfil</a>
            {/*<Button variant="secondary" onClick={handleCloseModal}>
                Cerrar
            </Button>*/}
            <button style={{/*backgroundColor:'transparent',borderStyle:'none'*/}} className='btn btn-outline-danger' onClick={()=>{localStorage.removeItem('type');localStorage.removeItem('usuario');localStorage.removeItem('token');estado();}}>
                    {/*<Link className="nav-link" to="/home">Cerrar Sesion</Link>*/}Cerrar Sesion
                </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalProfile;
