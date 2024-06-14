import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from '../../handler/useForm';
import axios from 'axios';
import SweetAlertHandler from '../Alerta/Sweetalerthandler';
import SweetAlertHandlerConfirm from '../Alerta/Sweetalerthandlerconfirm';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import FormularioField from '../Formularios/FormularioField';

const ModalFormulario = async ({boton,titulo,handleSubmitdata,initForm,Formudata,tipodato}) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

//console.log('dataselect',dataselect);

const [form, handlerChangeForm, resetForm] = useForm(initForm);
    const [token] = useState(localStorage.getItem('token'));
    //console.log('initForm',initForm);
    //console.log('Formudata',Formudata);

const MySweetAlert = withReactContent(Swal);



  /*const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', form);
  };*/

  const handleSubmitdataeject = (e) => {
    e.preventDefault();
    const verificar=handleSubmitdata(form);
    //console.log(verificar.valor, verificar.url);
    if(verificar.valor===false){
      //console.log('verifique los errores');
      SweetAlertHandler({titulo:'',texto:'Verifique que todos los campos requeridos',icono:'warning'});

    }
    else{
      axios.post(verificar.url,verificar.formulario,{headers:{'Authorization':`Bearer ${token}`}})
      .then((response)=>{/*const data=SweetAlertHandlerConfirm({titulo:'Guardado',texto:'Se guardo con exito',icono:'success',link:cerrarmodal});console.log('0data');*/
      MySweetAlert.fire({
        title: 'Guardado',//'¡Hola!',
        text: 'Se guardo con exito',//'Este es un mensaje de SweetAlert en React.',
        icon: 'success',//'success',
        confirmButtonText: 'Aceptar',
        
      }).then((result) => {if (result.isConfirmed) { handleCloseModal();}});
    
    })
      .catch((error)=>{SweetAlertHandler({titulo:'Error',texto:'Ocurrio un error al guardar',icono:'error'});});
    }
    //console.log('verificar', verificar.formulario);
    //console.log('e');
  };

  const clearform = () => {
    resetForm();
    //setErrors(false);
    //setCreateUser(false);
  };

  



  return (
    <div>
      <Button variant="primary" onClick={handleOpenModal}>
        {boton}
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FormularioField initForm={initForm} Formudata={Formudata} handleSubmitdata={handleSubmitdata} cerrarmodal={handleCloseModal} tipodato={tipodato} />
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalFormulario;
