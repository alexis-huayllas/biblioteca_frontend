import React, { useEffect, useState } from 'react';
import { biblioteca_formdata, biblioteca_initform, devolucion_formdata, devolucion_initform, prestamo_formdata, prestamo_initform, reserva_formdata, reserva_initform, sancion_formdata, sancion_initform, usuario_formdata, usuario_formdataedit, usuario_initform, usuario_initformedit } from '../../constantes/values';
import ModalForms from '../Modales/ModalForms';
import { endPointsbiblioteca, endPointsprestamo, endPointsreserva, endPointssancion, endPointsusuario } from '../../constantes/endpoints';
import ModalFormulario from '../Modales/ModalFormulario';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from '../../handler/useForm';
import axios from 'axios';
import SweetAlertHandler from '../Alerta/Sweetalerthandler';
import SweetAlertHandlerConfirm from '../Alerta/Sweetalerthandlerconfirm';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import FormularioField from '../Formularios/FormularioField';
import ModalEdit from '../Modales/ModalEditar';
import { useFormEdit } from '../../handler/useFormEdit';
import Select from 'react-select';
import MiModalreactEdit from '../Modales/Modalreactedit';


const TableRow = ({ numero,item, handleRowClick, cols, tipodata }) => {
  const tipo=localStorage.getItem('type');
  const [rolesuser] = useState(tipo==='superuser'?[{name:'Bibliotecario',value:'admin'},{name:'Estudiante/Docente',value:'user'},{name:'Externo',value:'externo'}]:[{name:'Estudiante/Docente',value:'user'},{name:'Externo',value:'externo'}]);

  const [options, setOptions] = useState([]);
  const [sancion, setSancion] = useState([]);
  const [usuarios,setUsuarios]=useState([]);
  const [libros,setLibros]=useState([]);
  const [reserva,setReserva]=useState([]);
  useEffect(()=>{
    const ListData = async () => {
        try {
            const response = await axios.get(endPointssancion.listar.url,{headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}}); // Reemplaza con la URL de tu API
            setSancion(response.data);
            if(response.data.length>0){
              let dataop=[];
              response.data.map((dato)=>dataop.push({ value: dato.id, label: dato.detalle }));
              setOptions(dataop);
            }
            console.log('response',response.data)
        } catch (error) {
            console.log('Error al cargar datos:', error);
        }
        try {
                const response = await axios.get(endPointsusuario.listar.url,{headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}}); // Reemplaza con la URL de tu API
                setUsuarios(response.data);
                console.log('response',response.data)
            } catch (error) {
                console.log('Error al cargar datos:', error);
            }
            try {
                const response = await axios.get(endPointsbiblioteca.listabibliotecafisica.url,{headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}}); // Reemplaza con la URL de tu API
                setLibros(response.data);
                console.log('response',response.data)
            } catch (error) {
                console.log('Error al cargar datos:', error);
            }
            try {
              const response = await axios.get(endPointsreserva.list.url,{headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}}); // Reemplaza con la URL de tu API
              setReserva(response.data);
              console.log('response',response.data)
          } catch (error) {
              console.log('Error al cargar datos:', error);
          }
      };
      ListData();
},[])
  const handleSubmitdata = (formu) => {
    if (tipodata==='biblioteca') {
      //const formData = new FormData();
      //e.preventDefault();
      if (formu.libro_id==="") {
          //console.log('error de titulo');
          return {valor:false};
      }
      //Object.keys(formu).map((value)=>{if(formu[value]!==null&&formu[value]!==undefined&&formu[value]!=='')formData.append(''+value, formu[value])});
      return {valor:true,url:endPointsreserva.create.url,formulario:formu/*formData*/};
    }
    else{
      if (tipodata==='reserva') {
        if (formu.tiempo_limite==="") {
            //console.log('error de titulo');
            return {valor:false};
        }
        if (formu.fecha_prestamo==="") {
            //console.log('error de titulo');
            return {valor:false};
        }
        //Object.keys(formu).map((value)=>{if(formu[value]!==null&&formu[value]!==undefined&&formu[value]!=='')formData.append(''+value, formu[value])});
        return {valor:true,url:endPointsprestamo.create.url,formulario:formu/*formData*/};
      } else {
        if (formu.fecha_devolucion==="") {
            //console.log('error de titulo');
            return {valor:false};
        }
        //Object.keys(formu).map((value)=>{if(formu[value]!==null&&formu[value]!==undefined&&formu[value]!=='')formData.append(''+value, formu[value])});
        return {valor:true,url:endPointsprestamo.update.url,formulario:formu/*formData*/};
      }
    }
    
  };

  const [showModal, setShowModal] = useState(false);
  const [showModalver, setShowModalver] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleOpenModalver = () => setShowModalver(true);
  const handleCloseModalver = () => setShowModalver(false);

  const [showModalEditar, setShowModalEditar] = useState(false);

  const [formu, handlerChangeFormu, resetFormu] = useFormEdit(tipodata==='biblioteca'?biblioteca_initform:tipodata==='reserva'?reserva_initform:tipodata==='prestamo'?prestamo_initform:tipodata==='usuario'?usuario_initformedit:tipodata==='sancion'?sancion_initform:devolucion_initform);
        
  const cargar=()=>{Object.keys(formu).map((dato)=>{if(dato!=='password'){formu[dato]=item[dato];}});}
  const vaciar=()=>{Object.keys(form).map((dato)=>{if(dato!=='password'){form[dato]=formdatoinit[dato];}});}
  const handleOpenModalEditar = () => {setShowModalEditar(true);cargar()}
  const handleCloseModalEditar = () => {setShowModalEditar(false);vaciar()}
  const formdato=//(tipodata==='biblioteca'?biblioteca_formdata:tipodata==='reserva'?reserva_formdata:tipodata==='prestamo'?prestamo_formdata:tipodata==='usuario'?usuario_formdata:devolucion_formdata);
  (tipodata==='biblioteca'?biblioteca_formdata:
  tipodata==='reserva'?reserva_formdata:
  tipodata==='prestamo'?prestamo_formdata:
  tipodata==='devolucion'?devolucion_formdata:
  tipodata==='usuario'?usuario_formdataedit
  :sancion_formdata);

  const formdatoinit=(tipodata==='biblioteca'?biblioteca_initform:
  tipodata==='reserva'?reserva_initform:
  tipodata==='prestamo'?prestamo_initform:
  tipodata==='devolucion'?devolucion_initform:
  tipodata==='usuario'?usuario_initform
  :sancion_initform);


  const [form, handlerChangeForm, resetForm] = useForm(tipodata==='biblioteca'?reserva_initform:tipodata==='reserva'?prestamo_initform:devolucion_initform);
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
    console.log('form', form);
    //form.usuario_id=item.usuario_id;
    if(tipodata==='biblioteca'){
      form.libro_id=item.id;
    }
    else{
      if (tipodata==='reserva') {
        form.fecha_prestamo=new Date().toLocaleString().slice(0,24);
        //form.fecha_prestamo=new Date().toLocaleString().slice(0,19).replace('T',' ');
        //form.id_reserva=item.id;
        form.id_reserva=item.id;
      } else {
        console.log('form',form);
      }
    }
    console.log('form', form);
    
    const verificar=handleSubmitdata(form);
    //console.log(verificar.valor, verificar.url);
    if(verificar.valor===false){
      //console.log('verifique los errores');
      SweetAlertHandler({titulo:'',texto:'Verifique que todos los campos requeridos',icono:'warning'});

    }
    else{
      if (tipodata==='prestamo') {
        axios.patch(verificar.url+item.id,form,{headers:{'Authorization':`Bearer ${token}`}})
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
    console.log('form',form);
    console.log('formu',formu);
    console.log('item',item);

  const clearform = () => {
    resetForm();
    //setErrors(false);
    //setCreateUser(false);
  };

  const darbajausuario=(itemdata)=>{
    if (itemdata.estado==='de baja') {
      MySweetAlert.fire({
        title: 'Esta seguro de Recuperar el registro del Usuario?',//'¡Hola!',
        text: 'se recuperara los datos del registro con nombre '+itemdata.name+' '+itemdata.last_name +' y usuario ' +itemdata.usuario,//'Este es un mensaje de SweetAlert en React.',
        icon: 'warning',//'success',
        confirmButtonText: 'Aceptar',
        showCancelButton:true,
        cancelButtonText:'Cancelar'
      }).then((result) => {if (result.isConfirmed) { 
        axios.patch(endPointsusuario.editar.url+itemdata.id,{estado:'disponible'},{headers:{'Authorization':`Bearer ${token}`}})
        .then((response)=>{
          MySweetAlert.fire({
            title: '',//'¡Hola!',
            text: 'Se recupero los datos con exito',//'Este es un mensaje de SweetAlert en React.',
            icon: 'success',//'success',
            confirmButtonText: 'Aceptar',
            
          }).then(async (result) => {if (result.isConfirmed) { 
            window.location.reload();
          }})
        })
        .catch((error)=>{SweetAlertHandler({titulo:'Error',texto:'Ocurrio un error al recuperar el registro del usuario',icono:'error'});});
      }});
    } else {
      MySweetAlert.fire({
        title: 'Esta seguro de Dar de Baja al Usuario?',//'¡Hola!',
        text: 'se dara de baja al registro con nombre '+itemdata.name+' '+itemdata.last_name +' y usuario ' +itemdata.usuario,//'Este es un mensaje de SweetAlert en React.',
        icon: 'warning',//'success',
        confirmButtonText: 'Aceptar',
        showCancelButton:true,
        cancelButtonText:'Cancelar'
      }).then((result) => {if (result.isConfirmed) { 
        axios.patch(endPointsusuario.editar.url+itemdata.id,{estado:'de baja'},{headers:{'Authorization':`Bearer ${token}`}})
        .then((response)=>{
          MySweetAlert.fire({
            title: '',//'¡Hola!',
            text: 'Se dio de baja con exito',//'Este es un mensaje de SweetAlert en React.',
            icon: 'success',//'success',
            confirmButtonText: 'Aceptar',
            
          }).then(async (result) => {if (result.isConfirmed) { 
            window.location.reload();
          }})
        })
        .catch((error)=>{SweetAlertHandler({titulo:'Error',texto:'Ocurrio un error al dar de baja al usuario',icono:'error'});});
      }});
    }
  } 

  const handleSubmitdataeditar = (formular) => {
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
        //console.log('Datos del formulario handleSubmitdataeditar e:', e);
        //console.log('Datos del formulario handleSubmitdataeditar e value:', e.target[2].attributes.name.value);
        //console.log('Datos del formulario handleSubmitdataeditar e file :', e.target[2].files[0]);
        console.log('Datos del formulario handleSubmitdataeditar archivo data:', formu.archivo);
        //console.log('Datos del formulario handleSubmitdataeditar archivo:', e.target.files[0]);
    }
    //console.log('Datos del formulario handleSubmitdataeditar:', form);

    Object.keys(formular).map((value)=>{if(formular[value]!==null&&formular[value]!==undefined&&formular[value]!=='')formData.append(''+value, formular[value])}/*console.log(value,form[value])*/);
    //Object.keys(form).map((value)=>{formData.append(`${value}`, form[value])}/*console.log(value,form[value])*/);
    return {valor:true,url:endPointsbiblioteca.editarbiblioteca.url+item.id,formulario:formData};
    }
    else{
      if (tipodata==='reserva') {
        console.log('reserva');
        if(formular.libro_id===item.libro_id){
          formular.libro_id=formular.libro_id.id;
        }
        if(formular.usuario_id===item.usuario_id){
          formular.usuario_id=formular.usuario_id.id;
        }
        
        /*if (formular.titulo==="") {
            console.log('error de titulo');
            return {valor:false};
        }*/
        return {valor:true,url:endPointsreserva.delete.url+item.id,formulario:formular};

      } else {
        if (tipodata==='prestamo') {
          console.log('prestamo');
          if(elegir==='reserva'){
            formular.id_reserva=formular.id_reserva.id;
            formular.id_documento=formular.id_reserva.libro_id;
            formular.id_usuario=formular.id_reserva.usuario_id;
          }else{
            if(formular.id_documento===item.id_documento){
              formular.id_documento=formular.id_documento.id;
            }
            if(formular.id_usuario===item.id_usuario){
              formular.id_usuario=formular.id_usuario.id;
            }
            formular.id_reserva='';
            formular.id_sancion='';
            formular.estado_sancion='';
            formular.fecha_devolucion='';

          }
          
          /*if (formular.titulo==="") {
              console.log('error de titulo');
              return {valor:false};
          }*/
          return {valor:true,url:endPointsprestamo.update.url+item.id,formulario:formular};

        } else {
          if (tipodata==='devolucion') {
            console.log('devolucion');
            if(formular.id_sancion===item.id_sancion){
              let dat=[];
              formular.id_sancion.map((dato)=>dat.push(dato.id));
              formular.id_sancion=dat;
            }
            /*if (formular.titulo==="") {
                console.log('error de titulo');
                return {valor:false};
            }*/
            return {valor:true,url:endPointsprestamo.update.url+item.id,formulario:formular};
          } else {
            if (tipodata==='usuario') {
              console.log('usuario');
              /*if (formular.titulo==="") {
                  console.log('error de titulo');
                  return {valor:false};
              }*/
              return {valor:true,url:endPointsusuario.editar.url+item.id,formulario:formular};

            } else {
              console.log('sancion');
              /*if (formular.titulo==="") {
                  console.log('error de titulo');
                  return {valor:false};
              }*/
              return {valor:true,url:endPointssancion.editar.url+item.id,formulario:formular};

            }
          }
        }
      }
    }
    
  };

  const handleSubmitdataeditareject = (e) => {
    e.preventDefault();
    console.log('form', formu);
    //formu.usuario_id=item.usuario_id;
    /*if(tipodata==='biblioteca'){
      formu.libro_id=item.id;
    }
    else{
      if (tipodata==='reserva') {
        formu.fecha_prestamo=new Date().toLocaleString().slice(0,24);
        formu.id_reserva=item.id;
      } else {
        console.log('formu',formu);
      //}
    }*/
    console.log('formu', formu);
    
    const verificar=handleSubmitdataeditar(formu);
    if(verificar.valor===false){
      SweetAlertHandler({titulo:'',texto:'Verifique que todos los campos requeridos',icono:'warning'});
    }
    else{
        axios.patch(verificar.url,formu,{headers:{'Authorization':`Bearer ${token}`}})
        .then((response)=>{
          MySweetAlert.fire({
            title: 'Guardado',//'¡Hola!',
            text: 'Se guardo con exito',//'Este es un mensaje de SweetAlert en React.',
            icon: 'success',//'success',
            confirmButtonText: 'Aceptar',
          }).then((result) => {if (result.isConfirmed) { handleCloseModalEditar();window.location.reload();}});
        }).catch((error)=>{console.log(error)});
      
    }
    //console.log('verificar', verificar.formulario);
    //console.log('e');
  };

  const clearformedit = () => {
    resetFormu();
    //setErrors(false);
    //setCreateUser(false);
  };

  const [selectedOptions, setSelectedOptions] = useState([]);

      const handleChange = (selected) => {
        setSelectedOptions(selected);
        let dat=[];
        selected.length>0?selected.map((datmap)=>dat.push(datmap.value)):dat='';
        form.id_sancion=dat;

      };

      const [elegir,setElegir]=useState(item.id_reserva!==null?'reserva':'sinreserva');
  return (
    <tr key={item.id}>
      <td>{numero}</td>
      {cols.map(({bodydatatable})=><td>{bodydatatable==='usuario_id'||bodydatatable==='id_usuario'?item[bodydatatable]!==null?<>{item[bodydatatable]['name']} {item[bodydatatable]['last_name']}</>:'':bodydatatable==='libro_id'||bodydatatable==='id_documento'?<>{item[bodydatatable]['titulo']}<br/>{item[bodydatatable]['autor']}</>:<>{bodydatatable==='reserva_id'||bodydatatable==='id_reserva'?<>{item[bodydatatable]!==null?item[bodydatatable]['fecha_reserva']:''}</>:bodydatatable==='fecha_prestamo'?<>{item[bodydatatable]} {parseInt(((new Date())-(new Date(item[bodydatatable])))/(1000*60*60*24),10)-Number(item['tiempo_limite'])>0?<p style={{color:'red'}}><br/> Retraso en Devolucion de {parseInt(((new Date())-(new Date(item[bodydatatable])))/(1000*60*60*24),10)-Number(item['tiempo_limite'])} dias </p>:''}</>:bodydatatable==='id_sancion'?item[bodydatatable].length>0?item[bodydatatable].map((dato)=><><div>{dato['detalle']}<br />{dato['multa']}</div><br/></>):'':<>{item[bodydatatable]!==null?item[bodydatatable]:''}</>}</>}</td>)}

      {tipodata!=='bitacora'?

      <td>{tipo==='admin'||tipo==='superuser'?<>
        {tipodata!=='prestamo'&&tipodata!=='devolucion'?<button className='btn btn-outline-danger' onClick={() => handleRowClick([item.id,'eliminar'])}>Borrar</button>:''}
        
      {tipodata==='bitacora'?
        <button className='btn btn-outline-danger' onClick={() => handleRowClick([item.id,'baja'])}>Dar de Baja</button>
      :''}
      </>
        :''}
        {tipodata!=='usuario'&&tipodata!=='biblioteca'&&item.tipo!=='digital'?<>
        {/*<button className='btn btn-outline-success' onClick={() => handleRowClick([item.id,'data'])}>Ver</button>*/}
        <div>
            <button className='btn btn-outline-success' onClick={handleOpenModalver}>
              {'Ver'}
            </button>

            <Modal show={showModalver} onHide={handleCloseModalver}>
              <Modal.Header closeButton>
                <Modal.Title>{'Ver Datos'}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              {Object.keys(item).map((clave)=>clave!=='id'&&clave!=='tipoprestamo'&&clave!=='CreatedAt'&&clave!=='UpdatedAt'&&clave!=='DeletedAt'&&clave!=='password'?clave==='usuario_id'||clave==='id_usuario'?<p>{clave.replace('id','').replace('_','')}:{item[clave]['name']} {item[clave]['last_name']}</p>:clave==='libro_id'||clave==='id_documento'?<p>{clave.replace('id','').replace('_','')}:{item[clave]['titulo']}</p>:clave==='id_reserva'?<p>{clave.replace('id','').replace('_','')}:{item[clave]!==null?item[clave]['fecha_reserva']:''}</p>:clave==='id_sancion'?<p>{clave.replace('id','').replace('_','')}:{item[clave]!==null?item[clave].length>0?item[clave].map((dato)=><><blockquote style={{marginLeft:'5%'}}>Detalle:{dato.detalle}<br/>Multa:{dato.multa}<br/></blockquote></>):'no tiene sanciones':''}</p>:clave==='fecha_devolucion'?<p>{clave.replace('_',' ')}:{item[clave]!==null?item[clave]:<>{parseInt(((new Date())-(new Date(item['fecha_prestamo'])))/(1000*60*60*24),10)-Number(item['tiempo_limite'])>0?<p style={{color:'red'}}>Retraso en Devolucion de {parseInt(((new Date())-(new Date(item['fecha_prestamo'])))/(1000*60*60*24),10)-Number(item['tiempo_limite'])} dias </p>:''}</>}</p>:<p>{clave.replaceAll('_',' ')}:{item[clave]!==null?item[clave]:''}</p>:'')}
                
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModalver}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </>:''}
        {tipodata==='prestamo'?<>
         
        {/*<button className='btn btn-outline-success' onClick={() => handleRowClick([item.id,'data'])}>Devolucion</button>*/}
        <div>
            <button className='btn btn-outline-dark' onClick={handleOpenModal}>
              {'Devolver'}
            </button>

            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>{'Devoluciones'}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form encType='multipart/formdata' onSubmit={handleSubmitdataeject}>
                  {devolucion_formdata.map(({datalabel,dataname,typedata}) => <>
                      {typedata!=='select'?<><label>
                        {datalabel}:
                          
                        <input
                          type={typedata}
                          name={dataname}
                          value={form[dataname]}
                          onChange={handlerChangeForm}
                        />
                      </label>
                      <br /></>:<><label>
                        {datalabel}:
                          
                                  <Select
                                    isMulti
                                    value={selectedOptions}
                                    onChange={handleChange}
                                    options={options}
                                    placeholder="Seleccionar sanciones"
                                  />
                                
                                
                            </label>
                            <br />
                        </>}
                  </>)}
                  {form.id_sancion!==''?
                        sancion.length>0&&selectedOptions.length>0?
                          sancion.map((sanciondata,num)=>selectedOptions.map((dato)=>sanciondata.id===Number(dato.value)?<>{num+1}.-{sanciondata.detalle}<br />Multa: {sanciondata.multa}<br /></>:'')):
                        '':<>no hay sanciones asignadas<br /></>}
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
        </>:''}
        {tipodata==='biblioteca'&&item.tipo!=='digital'&&tipo!=='admin'?<>
          {/*<button className='btn btn-outline-dark' onClick={() => handleRowClick([item.id,'data'])}>Reservar</button>*/}
          <div>
            <button className='btn btn-outline-dark' onClick={handleOpenModal}>
              {'Reservar'}
            </button>

            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>{'Reservas'}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form encType='multipart/formdata' onSubmit={handleSubmitdataeject}>
                  {reserva_formdata.map(({datalabel,dataname,typedata}) => <>
                      {typedata!=='select'?<><label>
                        {datalabel}:
                          
                        <input
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
        </>:''}
        {tipodata==='reserva'?<>
          {/*<button className='btn btn-outline-dark' onClick={() => handleRowClick([item.id,'data'])}>Prestar</button>*/}
          <div>
            <button className='btn btn-outline-dark' onClick={handleOpenModal}>
              {'Prestar'}
            </button>

            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>{'Prestamos'}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form encType='multipart/formdata' onSubmit={handleSubmitdataeject}>
                  {prestamo_formdata.map(({datalabel,dataname,typedata}) => <>
                      {typedata!=='select'?dataname!=='id_documento'&&dataname!=='id_usuario'?<><label>
                        {datalabel}:
                          
                        <input
                          type={typedata}
                          name={dataname}
                          value={form[dataname]}
                          onChange={handlerChangeForm}
                        />
                      </label>
                      <br /></>:'':''}
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
        </>:''}
        {tipodata==='biblioteca'&&item.tipo!=='fisico'?
        <a href='/verlibro' onMouseDown={()=>{localStorage.setItem('num_book',item.id);localStorage.setItem('titulo',item.titulo);}} className='btn btn-outline-success' >ver</a>
        :''}
        {tipodata==='usuario'?<>
        <button className='btn btn-outline-danger' onClick={()=>{darbajausuario(item)}}>
        {item.estado==='disponible'?'Dar de Baja':'Recuperar registro'}
      </button>
        <a href='/verusuario' onMouseDown={()=>{localStorage.setItem('user_data',item.id);}} className='btn btn-outline-success' >ver</a>
        </>:''}
        {(tipo==='admin'||tipo==='superuser')&&tipodata!=='bitacora'?<div>
      <button className='btn btn-outline-dark' onClick={handleOpenModalEditar}>
        {'editar'}
      </button>

      <Modal show={showModalEditar} onHide={handleCloseModalEditar}>
        <Modal.Header closeButton>
          <Modal.Title>{'editar'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {tipodata==='prestamo'?<select className='form-control w-100' onChange={({target})=>{target.value==='reserva'?setElegir('reserva'):setElegir('sinreserva');}}>{elegir==='reserva'?<option selected value={'reserva'}>con reserva</option>:<option value={'reserva'}>con reserva</option>}{elegir==='sinreserva'?<option selected value={'sinreserva'}>sin reserva</option>:<option value={'sinreserva'}>sin reserva</option>}</select>:''}
          <form encType='multipart/formdata' onSubmit={handleSubmitdataeditareject}>
            {formdato.map(({datalabel,dataname,typedata}) => <>
                {typedata!=='select'?<><label style={{width:'100%',paddingBottom:'2px'}} form={dataname}>
                  <p style={{margin:'auto',alignContent:'initial'}}>{datalabel}:</p> 
                  <input
                    className='form-control w-100'
                    type={typedata}
                    name={dataname}
                    value={formu[dataname]}
                    placeholder={datalabel}
                    onChange={handlerChangeFormu}
                  />
                </label>
                <br /></>:tipodata==='usuario'&&dataname==='role'?<><label style={{width:'100%',paddingBottom:'2px'}} form={dataname}>
                <p style={{margin:'auto',alignContent:'initial'}}>{datalabel}:</p>
                <select name={dataname} className='form-control w-100' onChange={handlerChangeFormu}>{rolesuser.map(({name,value})=>formu[dataname]===value?<option selected value={value}>{name}</option>:<option value={value}>{name}</option>)}</select>
                </label>
                <br /></>:dataname==='id_sancion'?<><label style={{width:'100%',paddingBottom:'2px'}} form={dataname}>
                <p style={{margin:'auto',alignContent:'initial'}}>{datalabel}:</p>
                <Select
                                    isMulti
                                    value={selectedOptions}
                                    onChange={handleChange}
                                    options={options}
                                    placeholder="Seleccionar sanciones"
                                  />
                </label>
                <br />{form.id_sancion!==''?
                        sancion.length>0&&selectedOptions.length>0?
                          sancion.map((sanciondata,num)=>selectedOptions.map((dato)=>sanciondata.id===Number(dato.value)?<>{num+1}.-{sanciondata.detalle}<br />Multa: {sanciondata.multa}<br /></>:'')):
                        '':<>no hay sanciones asignadas<br /></>}</>
                        :elegir==='sinreserva'?
                        dataname==='id_usuario'?<>
                        <label className='w-100' form={dataname}>{datalabel}:<select className='form-control w-100' name={dataname} onChange={handlerChangeForm}>
                          {usuarios.length>0?
                            [<option selected value={''} disabled>Seleccione</option>,usuarios.map((usuario)=><option value={usuario.id}>{usuario.name} {usuario.last_name}</option>)]:
                          <option disabled>no hay datos para mostrar</option>}</select></label><br/>
                        </>:dataname==='id_documento'?<>
                        <label className='w-100' form={dataname}>{datalabel}:<select className='form-control w-100' name={dataname} onChange={handlerChangeForm}>
                        {libros.length>0?
                            [<option selected value={''} disabled>Seleccione</option>,libros.map((libro)=><option value={libro.id}>{libro.titulo}, {libro.autor}</option>)]:
                          <option disabled>no hay datos para mostrar</option>}</select></label><br/></>
                        :'':''}
            </>)}
            <button type="submit"  className="btn btn-outline-success">Enviar</button>
            <button type="button" className="btn btn-outline-dark" onClick={clearformedit}>Cancelar</button>
          </form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalEditar}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>:''}
      </td>
      :''}
    </tr>
  );
};

export default TableRow;

