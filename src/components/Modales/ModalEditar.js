import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Formulario from '../Formularios/Formulario';
import { biblioteca_formdata, biblioteca_initform, devolucion_formdata, devolucion_initform, prestamo_formdata, prestamo_initform, reserva_formdata, reserva_initform, sancion_formdata, usuario_formdata, usuario_initform } from '../../constantes/values';
import { endPointsbiblioteca, endPointsprestamo, endPointsreserva, endPointssancion, endPointsusuario } from '../../constantes/endpoints';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useForm } from '../../handler/useForm';
import SweetAlertHandler from '../Alerta/Sweetalerthandler';
import axios from "axios";
import { useFormEdit } from '../../handler/useFormEdit';

const ModalEdit = ({boton,titulo,item,tipodata}) => {
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const MySweetAlert = withReactContent(Swal);
  const [formu, handlerChangeFormu, resetFormu] = useFormEdit(tipodata==='biblioteca'?biblioteca_initform:tipodata==='reserva'?reserva_initform:tipodata==='prestamo'?prestamo_initform:tipodata==='usuario'?usuario_initform:devolucion_initform);
  //if (Object.keys(form).length>0) {
    Object.keys(formu).map((dato)=>{if(dato!=='password'){formu[dato]=item[dato];}});
  //}
  

  const formdato=//(tipodata==='biblioteca'?biblioteca_formdata:tipodata==='reserva'?reserva_formdata:tipodata==='prestamo'?prestamo_formdata:tipodata==='usuario'?usuario_formdata:devolucion_formdata);
  (tipodata==='biblioteca'?biblioteca_formdata:
  tipodata==='reserva'?reserva_formdata:
  tipodata==='prestamo'?prestamo_formdata:
  tipodata==='devolucion'?devolucion_formdata:
  tipodata==='usuario'?usuario_formdata
  :sancion_formdata);

  const handleSubmitdata = (formular) => {
    //biblioteca
    //reserva
    //prestamo
    //devolucion
    //usuario
    //sancion
    if (tipodata==='biblioteca') {
      const formData = new FormData();
    //e.preventDefault();
    if (formular.titulo==="") {
        console.log('error de titulo');
        return {valor:false};
    }
    if (formular.archivo!==null) {
        //console.log('Datos del formulario handleSubmitdata e:', e);
        //console.log('Datos del formulario handleSubmitdata e value:', e.target[2].attributes.name.value);
        //console.log('Datos del formulario handleSubmitdata e file :', e.target[2].files[0]);
        console.log('Datos del formulario handleSubmitdata archivo data:', formu.archivo);
        //console.log('Datos del formulario handleSubmitdata archivo:', e.target.files[0]);
    }
    //console.log('Datos del formulario handleSubmitdata:', form);

    Object.keys(formular).map((value)=>{if(formular[value]!==null&&formular[value]!==undefined&&formular[value]!=='')formData.append(''+value, formular[value])}/*console.log(value,form[value])*/);
    //Object.keys(form).map((value)=>{formData.append(`${value}`, form[value])}/*console.log(value,form[value])*/);
    return {valor:true,url:endPointsbiblioteca.editarbiblioteca.url+item.id,formulario:formData};
    }
    else{
      if (tipodata==='reserva') {
        console.log('reserva');
        if (formular.titulo==="") {
            console.log('error de titulo');
            return {valor:false};
        }
        return {valor:true,url:endPointsreserva.delete.url+item.id,formulario:formular};

      } else {
        if (tipodata==='prestamo') {
          console.log('prestamo');
          if (formular.titulo==="") {
              console.log('error de titulo');
              return {valor:false};
          }
          return {valor:true,url:endPointsprestamo.update.url+item.id,formulario:formular};

        } else {
          if (tipodata==='devolucion') {
            console.log('devolucion');
            if (formular.titulo==="") {
                console.log('error de titulo');
                return {valor:false};
            }
            return {valor:true,url:endPointsprestamo.update.url+item.id,formulario:formular};
          } else {
            if (tipodata==='usuario') {
              console.log('usuario');
              if (formular.titulo==="") {
                  console.log('error de titulo');
                  return {valor:false};
              }
              return {valor:true,url:endPointsusuario.editar.url+item.id,formulario:formular};

            } else {
              console.log('sancion');
              if (formular.titulo==="") {
                  console.log('error de titulo');
                  return {valor:false};
              }
              return {valor:true,url:endPointssancion.editar.url+item.id,formulario:formular};

            }
          }
        }
      }
    }
    
  };

  const handleSubmitdataeject = (e) => {
    e.preventDefault();
    console.log('form', formu);
    //formu.usuario_id=item.usuario_id;
    if(tipodata==='biblioteca'){
      formu.libro_id=item.id;
    }
    else{
      if (tipodata==='reserva') {
        formu.fecha_prestamo=new Date().toLocaleString().slice(0,24);
        formu.id_reserva=item.id;
      } else {
        console.log('formu',formu);
      }
    }
    console.log('formu', formu);
    
    const verificar=handleSubmitdata(formu);
    if(verificar.valor===false){
      SweetAlertHandler({titulo:'',texto:'Verifique que todos los campos requeridos',icono:'warning'});
    }
    else{
      if (tipodata==='prestamo') {
        axios.patch(verificar.url+item.id,formu,{headers:{'Authorization':`Bearer ${token}`}})
        .then((response)=>{
          MySweetAlert.fire({
            title: 'Guardado',//'¡Hola!',
            text: 'Se guardo con exito',//'Este es un mensaje de SweetAlert en React.',
            icon: 'success',//'success',
            confirmButtonText: 'Aceptar',
          }).then((result) => {if (result.isConfirmed) { handleCloseModal();window.location.reload();}});
        }).catch((error)=>{console.log(error)});
      } else {
        axios.post(verificar.url,verificar.formulario,{headers:{'Authorization':`Bearer ${token}`}})
        .then((response)=>{/*const data=SweetAlertHandlerConfirm({titulo:'Guardado',texto:'Se guardo con exito',icono:'success',link:cerrarmodal});console.log('0data');*/
          if (tipodata==='reserva') {
            console.log('response',response);
            axios.patch(endPointsreserva.create.url+'/'+response.data.id_reserva,{estado:'prestado'},{headers:{'Authorization':`Bearer ${token}`}})
            .then((response)=>{window.location.reload();}).catch((error)=>{console.log(error)});
          }
          MySweetAlert.fire({
            title: 'Guardado',//'¡Hola!',
            text: 'Se guardo con exito',//'Este es un mensaje de SweetAlert en React.',
            icon: 'success',//'success',
            confirmButtonText: 'Aceptar',
          }).then((result) => {if (result.isConfirmed) { handleCloseModal();}});
        
        })
        .catch((error)=>{if(error.response.data.statusCode===401){SweetAlertHandler({titulo:'Su sesion a expirado',texto:'Inicie sesion nuevamente',icono:'info'});localStorage.removeItem('token');localStorage.removeItem('nombre');localStorage.removeItem('type');window.location.reload();}else{SweetAlertHandler({titulo:'Error',texto:'Ocurrio un error al guardar',icono:'error'});}console.log(error.response.data);});
      }
      
    }
    //console.log('verificar', verificar.formulario);
    //console.log('e');
  };

  const clearform = () => {
    resetFormu();
    //setErrors(false);
    //setCreateUser(false);
  };

  return (
    <div>
      <button className='btn btn-outline-dark' onClick={handleOpenModal}>
        {boton}
      </button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form encType='multipart/formdata' onSubmit={handleSubmitdataeject}>
            {formdato.map(({datalabel,dataname,typedata}) => <>
                {tipodata!=='select'?<><label style={{display:'inline-flex',flexDirection:'row',width:'100%',paddingBottom:'2px'}} form={dataname}>
                  <p style={{margin:'auto',alignContent:'initial'}}>{datalabel}:</p> 
                  <input
                    className='form-control w-75'
                    type={typedata}
                    name={dataname}
                    value={formu[dataname]}
                    placeholder={datalabel}
                    onChange={handlerChangeFormu}
                  />
                </label>
                <br /></>:''}
            </>)}
            <button type="submit"  className="btn btn-outline-success">Enviar</button>
            <button type="button" className="btn btn-outline-dark" onClick={clearform}>Cancelar</button>
          </form>
          
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

export default ModalEdit;
