import React, { useState } from 'react';
import FormFields from './FormFields';
import { useForm } from '../../handler/useForm';
import axios from 'axios';
import SweetAlertHandler from '../Alerta/Sweetalerthandler';
import SweetAlertHandlerConfirm from '../Alerta/Sweetalerthandlerconfirm';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const FormularioField = ({initForm,Formudata,handleSubmitdata,cerrarmodal,tipodato}) => {
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
        
      }).then((result) => {if (result.isConfirmed) { cerrarmodal();}});
    
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
    <form encType='multipart/formdata' onSubmit={handleSubmitdataeject}>
      {Formudata.map(({datalabel,dataname,typedata}) => <>
            <label>
                {datalabel}:
                {typedata!=='select'?
            <input
                type={typedata}
                name={dataname}
                value={form[dataname]}
                onChange={handlerChangeForm}
            />:<>{tipodato==='reserva'?
              <select name={dataname} onChange={handlerChangeForm}>
              </select>
            :''}</>}
            </label>
            <br />
        </>)}
      <button type="submit"  className="btn btn-outline-success">Enviar</button>
      <button type="button" className="btn btn-outline-dark" onClick={clearform}>Cancelar</button>
    </form>
  );
};

export default FormularioField;
