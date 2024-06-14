import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import SweetAlertHandler from '../Alerta/Sweetalerthandler';
import SweetAlertHandlerConfirm from '../Alerta/Sweetalerthandlerconfirm';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FaRegBell } from 'react-icons/fa';

const Modalnotificacion = ({datos}) => {
  const [showModalnotificacion, setShowModalnotificacion] = useState(false);

  const handleOpenModalnotificacion = () => setShowModalnotificacion(true);
  const handleCloseModalnotificacion = () => setShowModalnotificacion(false);

//console.log('dataselect',dataselect);

const [token] = useState(localStorage.getItem('token'));
    //console.log('initForm',initForm);
    //console.log('Formudata',Formudata);

const MySweetAlert = withReactContent(Swal);

  return (
    <div>
      {/*<Button variant="primary" onClick={handleOpenModalnotificacion}></Button>*/}
        <FaRegBell onClick={handleOpenModalnotificacion} size={'80%'} color='whitesmoke'/>
      

      <Modal show={showModalnotificacion} onHide={handleCloseModalnotificacion}>
        <Modal.Header closeButton>
          <Modal.Title>{'notificaciones'.toUpperCase()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {datos.filter((item,index)=>datos.indexOf(item)===index).length>0?datos.filter((item,index)=>datos.indexOf(item)===index).reverse().map((dat)=><><h4>{dat.titulo}</h4><p>{dat.value}</p></>):'no hay notificaciones para mostrar'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalnotificacion}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Modalnotificacion;
