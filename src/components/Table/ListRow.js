import React, { useState } from 'react';
import { reserva_formdata, reserva_initform } from '../../constantes/values';
import { endPointsbiblioteca, endPointsreserva } from '../../constantes/endpoints';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from '../../handler/useForm';
import axios from 'axios';
import SweetAlertHandler from '../Alerta/Sweetalerthandler';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import MiModalreactEdit from '../Modales/Modalreactedit';
import { io } from 'socket.io-client';


const ListRow = ({ numero,item, handleRowClick, cols }) => {
  const tipo=localStorage.getItem('type');
  
  const [replyMessage, setReplyMessage] = useState('');
  const [message, setMessage] = useState('');
  const socket = io('http://localhost:3008');

  const sendMessage = () => {
    socket.emit('userMessage', message);
    setMessage('');
  };

  const sendReply = () => {
    socket.emit('adminReply', replyMessage);
    setReplyMessage('');
  };
  
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
          }).then((result) => {if (result.isConfirmed) {
            let alert={titulo:'reserva por atender',value:'se añadio la reserva de fecha '+response.data.fecha_reserva+' de '+item.seleccion+' de titulo: '+item.titulo+', de autor '+item.autor+' por el usuario '+localStorage.getItem('nombre')};//[]; 
            //alert.push({titulo:'reserva por atender',value:'se añadio la reserva de fecha '+response.data.fecha_reserva+' del libro de titulo:'+item.titulo});
            //console.log(response);

            if(tipo==='user'||tipo==='externo'){
              socket.emit('userMessage', /*message*/alert);
            }else{
              socket.emit('adminReply', /*replyMessage*/alert);
            }
            handleCloseModal();                    
          }});
        
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

  const bajadata = () => {
    //alert(item.id);
    MySweetAlert.fire({
      title: '',//'¡Hola!',
      text: 'Quiere dar de baja el libro de titulo '+item.titulo+'?',//'Este es un mensaje de SweetAlert en React.',
      icon: 'warning',//'success',
      confirmButtonText: 'Aceptar',
      cancelButtonText:'Cancelar',
      showCancelButton:true
    }).then((result) => {if (result.isConfirmed) { 
    axios.patch(endPointsbiblioteca.editarbiblioteca.url+item.id+'/data',{estado:'de baja'},{headers:{'Authorization':`Bearer ${token}`}})
    .then((response)=>{
      MySweetAlert.fire({
        title: '',//'¡Hola!',
        text: 'Se dio de baja con exito',//'Este es un mensaje de SweetAlert en React.',
        icon: 'success',//'success',
        confirmButtonText: 'Aceptar',
      }).then((result) => {if (result.isConfirmed) { 
        let alert={titulo:item.seleccion+' no disponible',value:'El documento de titulo: '+item.titulo+', de autor '+item.autor+' no estara disponible temporal o permanentemente'}; 
        
        if(tipo==='user'||tipo==='externo'){
          socket.emit('userMessage', /*message*/alert);
        }else{
          socket.emit('adminReply', /*replyMessage*/alert);
        }
        window.location.reload()}});
    
    })
    .catch((error)=>{if(error.response.data.statusCode===401){SweetAlertHandler({titulo:'Su sesion a expirado',texto:'Inicie sesion nuevamente',icono:'info'});localStorage.removeItem('token');localStorage.removeItem('nombre');localStorage.removeItem('type');window.location.reload();}else{SweetAlertHandler({titulo:'Error',texto:'Ocurrio un error al dar de baja',icono:'error'});}console.log(error.response.data);});
  }});
  };

  const altadata = () => {
    //alert(item.id);
    MySweetAlert.fire({
      title: '',//'¡Hola!',
      text: 'Quiere recuperar el libro de titulo '+item.titulo+'?',//'Este es un mensaje de SweetAlert en React.',
      icon: 'warning',//'success',
      confirmButtonText: 'Aceptar',
      cancelButtonText:'Cancelar',
      showCancelButton:true
    }).then((result) => {if (result.isConfirmed) { 
    axios.patch(endPointsbiblioteca.editarbiblioteca.url+item.id+'/data',{estado:'disponible'},{headers:{'Authorization':`Bearer ${token}`}})
    .then((response)=>{
      MySweetAlert.fire({
        title: '',//'¡Hola!',
        text: 'Se recupero el documento con exito',//'Este es un mensaje de SweetAlert en React.',
        icon: 'success',//'success',
        confirmButtonText: 'Aceptar',
      }).then((result) => {if (result.isConfirmed) { 
        let alert={titulo:item.seleccion+' disponible',value:item.seleccion+' de titulo: '+item.titulo+', de autor '+item.autor+' esta disponible'}; 
        
        if(tipo==='user'||tipo==='externo'){
          socket.emit('userMessage', /*message*/alert);
        }else{
          socket.emit('adminReply', /*replyMessage*/alert);
        }
        window.location.reload()}});
    
    })
    .catch((error)=>{if(error.response.data.statusCode===401){SweetAlertHandler({titulo:'Su sesion a expirado',texto:'Inicie sesion nuevamente',icono:'info'});localStorage.removeItem('token');localStorage.removeItem('nombre');localStorage.removeItem('type');window.location.reload();}else{SweetAlertHandler({titulo:'Error',texto:'Ocurrio un error al recuperar el documento',icono:'error'});}console.log(error.response.data);});
  }});
  };


  return (
    <div style={{display:'flex',flexDirection:'row',marginBottom:'10px',padding:'10px',border:'1px solid #ccc',borderRadius:'5px',backgroundColor:'whitesmoke'}}>
              <div style={{width:'20%',display:'inline-flex'}}><img style={{width:'100%'}} src={item.portada}/></div>
              {/*<div style={{width:'10%',display:'inline-flex'}}><h1 style={{margin:'auto'}}>{numero}</h1></div>*/}
              <div style={{width:'70%',display:'inline-grid',color:'black'}}> {cols.map(({bodydatatable})=>bodydatatable==='titulo'?<h1>{item[bodydatatable]}</h1>:bodydatatable==='reseña'?<p  style={{color:'black'}}>{item[bodydatatable]}</p>:bodydatatable==='autor'?<>{item['autor']} ( {item['anoPublicacion']} )<br/></>:bodydatatable==='estados'?<>{bodydatatable}:{item[bodydatatable]}<br/></>:'' )}</div>
              <div style={{width:'10%',display:'inline-grid'}}>{/*item.tipo==='ambos'?
                <a style={{margin:'auto'}} href='/verlibro' onMouseDown={()=>{localStorage.setItem('num_book',item.id);localStorage.setItem('titulo',item.titulo);}} className='btn btn-outline-success' >ver</a>
  :''*/}
                <a style={{margin:'auto'}} href='/verlibro' onMouseDown={()=>{localStorage.setItem('num_book',item.id);localStorage.setItem('titulo',item.titulo);}} className='btn btn-outline-success' >ver</a>
                <>{tipo!=='admin'?<>
                <div>{item.tipo!=='digital'?item.estado==='disponible'?<button className='btn btn-outline-dark' onClick={handleOpenModal}>
                    {'Reservar'}
                  </button>:'no disponible para reservas':''}
                  

                  <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>{'Reservas'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form encType='multipart/formdata' onSubmit={handleSubmitdataeject}>
                        {reserva_formdata.map(({datalabel,dataname,typedata}) => <>
                            {typedata!=='select'?<><label form={dataname}>
                              {datalabel}:
                                
                              <input
                                className='form-control'
                                type={typedata}
                                name={dataname}
                                value={form[dataname]}
                                onChange={handlerChangeForm}
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
                </>:<><MiModalreactEdit boton={'Editar'} item={item} titulo={'Editar'}/>
                {item.estado!=='de baja'?<button className='btn btn-outline-danger' onClick={bajadata}>Dar Baja</button>:<button className='btn btn-outline-info' onClick={altadata}>Recuperar</button>}
                </>}</>
              </div>
              
              </div>
  );
};

export default ListRow;
