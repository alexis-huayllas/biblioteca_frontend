import React, { useState } from 'react';
import { reserva_formdata, reserva_initform } from '../../constantes/values';
import { endPointsreserva } from '../../constantes/endpoints';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from '../../handler/useForm';
import axios from 'axios';
import SweetAlertHandler from '../Alerta/Sweetalerthandler';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const BoxRow = ({ numero,item, handleRowClick, cols }) => {
  const tipo=localStorage.getItem('type');

  const handleSubmitdata = (formu) => {
      //const formData = new FormData();
      //e.preventDefault();
      if (formu.libro_id==="") {
          //console.log('error de titulo');
          return {valor:false};
      }
      //Object.keys(formu).map((value)=>{if(formu[value]!==null&&formu[value]!==undefined&&formu[value]!=='')formData.append(''+value, formu[value])});
      return {valor:true,url:endPointsreserva.create.url,formulario:formu/*formData*/};
  };

  const [showModal, setShowModal] = useState(false);
  
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [form, handlerChangeForm, resetForm] = useForm(reserva_initform);
//console.log('dataselect',dataselect);

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
    //console.log('form', form);
    //form.usuario_id=item.usuario_id;
      form.libro_id=item.id;
    
    
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
        .catch((error)=>{if(error.response.data.statusCode===401){SweetAlertHandler({titulo:'Su sesion a expirado',texto:'Inicie sesion nuevamente',icono:'info'});localStorage.removeItem('token');localStorage.removeItem('nombre');localStorage.removeItem('type');window.location.reload();}else{SweetAlertHandler({titulo:'Error',texto:'Ocurrio un error al guardar',icono:'error'});}console.log(error.response.data);});
      
      
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
    <div style={{width:'18%',display:'inline-block', margin:'1%',padding:'1%',border:'1px solid white'/*,backgroundColor:'plum'*/}}>
      <div style={{display:'flex',flexDirection:'column'}}>
      <img style={{width:'100%'}} src={item.portada}/>
        <h4>{item.titulo}</h4>
        <div>{item.autor} {item.anoPublicacion}</div>
        <div style={{display:'flex',flexDirection:'row'}}><a style={{textDecoration:'none',marginRight:'10%',fontSize:'80%'}} href='/verlibro' onMouseDown={()=>{localStorage.setItem('num_book',item.id);localStorage.setItem('titulo',item.titulo);}} className='btn btn-outline-success' >Ver mas...</a>{item.estado==='disponible'?<p style={{color:'green'}}>disponible</p>:item.estado==='no disponible'?<p style={{color:'red'}}> no disponible</p>:<p style={{color:'red'}}> {item.estado}</p>}</div>
      </div>
    </div>
    
                
              
  
  );
};

export default BoxRow;
