import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Formulario from '../Formularios/Formulario';
const ModalForms = async ({boton,titulo,handleSubmitdata,initForm,Formudata}) => {
  const [showModal, setShowModal] = useState(false);
  const [tipo] = useState(localStorage.getItem('type'));
  //const [token] = useState(localStorage.getItem('token'));

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


  return (
    <div>
      {tipo==='admin'||tipo==='superuser'?
      <Button variant="primary" onClick={handleOpenModal}>
        {boton}
      </Button>:''}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formulario initForm={initForm} Formudata={Formudata} handleSubmitdata={handleSubmitdata} cerrarmodal={handleCloseModal} />
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

export default ModalForms;
