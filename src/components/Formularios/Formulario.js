import React, { useEffect, useState } from 'react';
import FormFields from './FormFields';
import { useForm } from '../../handler/useForm';
import axios from 'axios';
import SweetAlertHandler from '../Alerta/Sweetalerthandler';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { io } from 'socket.io-client';

const Formulario = ({initForm,Formudata,handleSubmitdata,cerrarmodal}) => {
    const [form, handlerChangeForm, resetForm] = useForm(initForm);
    const [token] = useState(localStorage.getItem('token'));
    const [apoyo,setApoyo] = useState(true);
  const [tipo] = useState(localStorage.getItem('type'));
  const socket = io('http://localhost:3008');

    
    console.log('initForm',initForm);
    console.log('Formudata',form);

const MySweetAlert = withReactContent(Swal);



  /*const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', form);
  };*/

  const handleSubmitdataeject = (e) => {
    e.preventDefault();
    if (form.tipo === 'fisico') {
      form.archivo=null;
    }
    form.seleccion=initForm.seleccion;
    const verificar=handleSubmitdata(form);
    //console.log(verificar.valor, verificar.url);
    if(verificar.valor===false){
      //console.log('verifique los errores');
      SweetAlertHandler({titulo:'',texto:'Verifique que todos los campos requeridos',icono:'warning'});

    }
    else{
      console.log(verificar.dato);
      if(verificar.dato!==undefined){
        axios.patch(verificar.url,verificar.formulario,{headers:{'Authorization':`Bearer ${token}`}})
        .then((response)=>{/*const data=SweetAlertHandlerConfirm({titulo:'Guardado',texto:'Se guardo con exito',icono:'success',link:cerrarmodal});console.log('0data');*/
        MySweetAlert.fire({
          title: 'Guardado',//'¡Hola!',
          text: 'Se guardo con exito',//'Este es un mensaje de SweetAlert en React.',
          icon: 'success',//'success',
          confirmButtonText: 'Aceptar',
        }).then((result) => {if (result.isConfirmed) { cerrarmodal();}});
        })
        .catch((error)=>{SweetAlertHandler({titulo:'Error',texto:'Ocurrio un error al guardar',icono:'error'});});
      }else{
        axios.post(verificar.url,verificar.formulario,{headers:{'Authorization':`Bearer ${token}`}})
        .then((response)=>{/*const data=SweetAlertHandlerConfirm({titulo:'Guardado',texto:'Se guardo con exito',icono:'success',link:cerrarmodal});console.log('0data');*/
        console.log('response',response);

        MySweetAlert.fire({
          title: 'Guardado',//'¡Hola!',
          text: 'Se guardo con exito',//'Este es un mensaje de SweetAlert en React.',
          icon: 'success',//'success',
          confirmButtonText: 'Aceptar',
        }).then((result) => {if (result.isConfirmed) { 
          let alert={titulo:response.data.newAddBiblioteca.seleccion+' añadido',value:response.data.newAddBiblioteca.seleccion+' de titulo: '+response.data.newAddBiblioteca.titulo+', de autor '+response.data.newAddBiblioteca.autor+' fue añadido y esta disponible'}; 
        
          if(tipo==='user'||tipo==='externo'){
            socket.emit('userMessage', /*message*/alert);
          }else{
            socket.emit('adminReply', /*replyMessage*/alert);
          }
          cerrarmodal();}});
        })
        .catch((error)=>{SweetAlertHandler({titulo:'Error',texto:'Ocurrio un error al guardar',icono:'error'});});
      }  
    }
    //console.log('verificar', verificar.formulario);
    //console.log('e');
  };

  const clearform = () => {
    resetForm();
    //setErrors(false);
    //setCreateUser(false);
  };

  const tipodatos=[{nombre:'Fisico',value:'fisico'},{nombre:'Digital',value:'digital'},{nombre:'Ambos',value:'ambos'}];

  return (
    <form encType='multipart/formdata' onSubmit={handleSubmitdataeject}>
      {form.tipo?<><label style={{display:'inline-flex',flexDirection:'row',width:'100%',paddingBottom:'2px'}} form={'tipo'}>
        <p style={{margin:'auto',alignContent:'initial'}}>{'Tipo'}:</p> 
      <select name='tipo' className='form-control w-75' onChange={handlerChangeForm}>
        {tipodatos.map(({nombre, value})=>form.tipo===value?<option selected value={value}>{nombre}</option>:<option value={value}>{nombre}</option>)}
        </select>
      </label>
      <br /></>:''}
      <FormFields formData={form} formDatafield={Formudata} handleInputChange={handlerChangeForm} />
      <button type="submit" className="btn btn-outline-success">Enviar</button>
      <button type="button" className="btn btn-outline-dark" onClick={clearform}>Cancelar</button>
    </form>
  );
};

export default Formulario;
