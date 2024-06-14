import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Formulario from '../Formularios/Formulario';
import { biblioteca_formdata, biblioteca_formdata_tesis, biblioteca_initform } from '../../constantes/values';
import { endPointsbiblioteca } from '../../constantes/endpoints';

const MiModalreact = ({boton,titulo}) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmitdata = (formu) => {
    formu.seleccion=datalibrotesis;
    const formuData = new FormData();
    //e.preventDefault();
    if (formu.titulo==="") {
        console.log('error de titulo');
        return {valor:false};
    }
    if (formu.archivo!==null) {
        //console.log('Datos del formulario handleSubmitdata e:', e);
        //console.log('Datos del formulario handleSubmitdata e value:', e.target[2].attributes.name.value);
        //console.log('Datos del formulario handleSubmitdata e file :', e.target[2].files[0]);
        console.log('Datos del formulario handleSubmitdata archivo data:', formu.archivo);
        //console.log('Datos del formulario handleSubmitdata archivo:', e.target.files[0]);
    }
    console.log('Datos del formulario handleSubmitdata:', formu);

    Object.keys(formu).map((value)=>{if(formu[value]!==null&&formu[value]!==undefined&&formu[value]!=='')formuData.append(''+value, formu[value])}/*console.log(value,form[value])*/);
    //Object.keys(form).map((value)=>{formuData.append(`${value}`, form[value])}/*console.log(value,form[value])*/);
    return {valor:true,url:endPointsbiblioteca.registrarbiblioteca.url,formulario:formuData};
  };

  const [datalibrotesis,setDatalibrotesis]=useState('libro');

  return (
    <div>
      <Button variant="primary" onClick={handleOpenModal}>
        {boton}
      </Button>

      <Modal style={{color:'black'}} show={showModal} size='lg' onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <button className='btn btn-outline-secondary' onClick={()=>setDatalibrotesis('libro')}>Libro</button>
          <button className='btn btn-outline-secondary' onClick={()=>setDatalibrotesis('tesis')}>Tesis</button>
          {datalibrotesis==='libro'?
          <Formulario initForm={{ titulo:'', autor:'', /*tituloColeccion:'',*/ anoPublicacion:'', editorial:'', edicion:'', volumen:'', isbn:'', archivo:null, portada:null, reseña:'', palabras_clave:'', tipo:'fisico', cantidad:'0',categoria:'', estado:'disponible',seleccion:'libro'}} Formudata={biblioteca_formdata} handleSubmitdata={handleSubmitdata} cerrarmodal={handleCloseModal} />
          :<Formulario initForm={{ titulo:'', autor:'',anoPublicacion:'', archivo:null, portada:null, tipo:'fisico', cantidad:'0',categoria:'', estado:'disponible',tutor:'',seleccion:'tesis',modalidad:'trabajo'}} Formudata={biblioteca_formdata_tesis} handleSubmitdata={handleSubmitdata} cerrarmodal={handleCloseModal} />
          }
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

export default MiModalreact;
