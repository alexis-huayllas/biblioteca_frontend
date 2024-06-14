//Filename - components/ListPrestamo.js 
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Tables from "../Table/Tables";
import RowClickHandler from "../../handler/RowClickHandler";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { prestamo_formdata, prestamo_initform, prestamotabledata } from "../../constantes/values";

import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from '../../handler/useForm';
import SweetAlertHandler from '../Alerta/Sweetalerthandler';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { endPointsbiblioteca, endPointsprestamo, endPointsreserva, endPointsusuario } from "../../constantes/endpoints";
import { FaSearch } from "react-icons/fa";

function ListPrestamo(){

    const [token] = useState(localStorage.getItem('token'));
    const [tipo] = useState(localStorage.getItem('type'));
    const [listado, setListado] = useState([]);
    const [listadosearch, setListadosearch] = useState([]);

    const [usuarios,setUsuarios]=useState([]);
    const [libros,setLibros]=useState([]);
    const [reserva,setReserva]=useState([]);
    
    let history = useNavigate();

    useEffect(()=>{
        const ListData = async () => {
            try {
              const response = await axios.get(endPointsprestamo.listPrestamos.url); // Reemplaza con la URL de tu API
              setListado(response.data);
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
        //const formData = new FormData();
        //e.preventDefault();
        console.log(formu);

        if (formu.id_reserva===""&&elegir==='reserva') {
            //console.log('error de titulo');
            return {valor:false};
        }
        /*if (formu.fecha_prestamo==="") {
          //console.log('error de titulo');
          return {valor:false};
        }*/
        /*if (formu.password!==formu.repassword) {
            //console.log('error de titulo');
            return {valor:false};
        }*/
        
    
        //Object.keys(formu).map((value)=>{if(formu[value]!==null&&formu[value]!==undefined&&formu[value]!=='')formData.append(''+value, formu[value])});
        return {valor:true,url:endPointsprestamo.create.url,formulario:formu/*formData*/};
      };
      const [showModal, setShowModal] = useState(false);

      const handleOpenModal = () => {setShowModal(true);let data={
        fecha_prestamo:'',
        tiempo_limite:'2',
        //fecha_devolucion:'',
        id_documento:'',
        id_reserva:'',
        id_usuario:'',
        //id_sancion:''
    };
    Object.keys(form).map((dato)=>form[dato]=data[dato]);}
      const handleCloseModal = () => {setShowModal(false);resetForm();};
    
    //console.log('dataselect',dataselect);
      
    const [form, handlerChangeForm, resetForm] = useForm(prestamo_initform);
        //const [token] = useState(localStorage.getItem('token'));
        //console.log('initForm',initForm);
        //console.log('Formudata',Formudata);
    
    const MySweetAlert = withReactContent(Swal);
    
    
    
      /*const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos del formulario:', form);
      };*/
    
      const handleSubmitdataeject = (e) => {
        e.preventDefault();
        form.fecha_prestamo=new Date().toLocaleString();
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
            
          }).then(async (result) => {if (result.isConfirmed) { handleCloseModal();
            const response = await axios.get(endPointsprestamo.listPrestamos.url); // Reemplaza con la URL de tu API
            setListado(response.data);}});
        
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

      const dataform=(dato)=>{
        /*if (formid_usuario!==dato.usuario_id['id']) {          
          setDataForm({name:'id_usuario',value:datousuario_id['id']});
        }
        if (formid_documento!==dato.libro_id['id']) {          
          setDataForm({name:'id_documento',value:datolibro_id['id']});
        }*/
        form.id_usuario=''+dato.usuario_id['id'];
        form.id_documento=''+dato.libro_id['id'];
        console.log(form);
        //setDataForm({name:'id_documento',value:dato.id});
      }
      
      const [elegir,setElegir]=useState('reserva');


      const buscardatalist=()=>{
        let datos=[];
        if(listadosearch.length===0){
          setListadosearch(listado);
          datos=listado;
        }else{
          datos=listadosearch;
        }
        let data=document.getElementById('searchdata').value;
        console.log(data);
        if (data==='') {
          if(datos.length>0){
            setListado(datos);
          }
          setListadosearch([]);
        }else{
          let datarow=datos.filter((dato)=>dato.fecha_prestamo.includes(`${data}`)?true:false);
          setListado(datarow);
        }
      }

    return (<>
        { token===null?<Navigate to="/login" />:
          <Navbar>
            <div style={{display:'flex',flexDirection:'row'}}>
                <div style={{width:'30%'}}>
                    <div style={{display:"flex",flexDirection:"row",paddingLeft:'10px'}}>
                      <Button variant="primary" onClick={handleOpenModal}>
                        {'Añadir nuevo'}
                      </Button>

                      <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>{'Crear nuevo Prestamo'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <select className="form-control w-100" onChange={({target})=>{target.value==='reserva'?setElegir('reserva'):setElegir('sinreserva');}}><option value={'reserva'}>con reserva</option><option value={'sinreserva'}>sin reserva</option></select>
                          <form encType='multipart/formdata' onSubmit={handleSubmitdataeject}>
                      {prestamo_formdata.map(({datalabel,dataname,typedata}) => <>
                            {dataname!=='id_usuario'&&dataname!=='id_documento'&&dataname!=='fecha_prestamo'?<>
                            <label className="w-100">
                                {datalabel}:
                                {typedata!=='select'?
                            <input
                                className="form-control w-100"
                                type={typedata}
                                name={dataname}
                                value={form[dataname]}
                                onChange={handlerChangeForm}
                            />:elegir==='reserva'?
                              <select className="form-control w-100" name={dataname} onChange={handlerChangeForm}>
                              {/*dataname==='id_usuario'?
                                usuarios.length>0?
                                  [<option selected value={''} disabled>Seleccione</option>,usuarios.map((usuario)=><option value={usuario.id}>{usuario.name} {usuario.last_name}</option>)]:
                                <option disabled>no hay datos para mostrar</option>
                              :dataname==='id_documento'?
                                  libros.length>0?
                                    [<option selected value={''} disabled>Seleccione</option>,libros.map((libro)=><option value={libro.id}>{libro.titulo}, {libro.autor}</option>)]:
                                  <option disabled>no hay datos para mostrar</option>
                              :*/dataname==='id_reserva'?reserva.length>0?
                              [<option selected value={''} disabled>Seleccione</option>,reserva.map((libro)=><option value={libro.id} clave={libro}>{libro.fecha_reserva}</option>)]:
                            <option disabled>no hay datos para mostrar</option>:''}</select>:''
                                }
                            </label>{dataname==='tiempo_limite'?'dias':''}<br /></>:elegir==='sinreserva'?
                                dataname==='id_usuario'?<>
                                <label className="w-100" form={dataname}>{datalabel}:<select className="form-control w-100" name={dataname} onChange={handlerChangeForm}>
                                  {usuarios.length>0?
                                    [<option selected value={''} disabled>Seleccione</option>,usuarios.map((usuario)=><option value={usuario.id}>{usuario.name} {usuario.last_name}</option>)]:
                                  <option disabled>no hay datos para mostrar</option>}</select></label><br/>
                                </>:dataname==='id_documento'?<>
                                <label className="w-100" form={dataname}>{datalabel}:<select className="form-control w-100" name={dataname} onChange={handlerChangeForm}>
                                {libros.length>0?
                                    [<option selected value={''} disabled>Seleccione</option>,libros.map((libro)=><option value={libro.id}>{libro.titulo}, {libro.autor}</option>)]:
                                  <option disabled>no hay datos para mostrar</option>}</select></label><br/></>
                                :'':''}
                            
                        </>)}
                        {elegir==='reserva'&&form.id_reserva!==''?reserva.map((dato)=>{if(Number(form.id_reserva)===Number(dato.id)){dataform(dato);return (<><label>Usuario:{dato.usuario_id['name']} {dato.usuario_id['last_name']}</label><br/><label>LIbro:{dato.libro_id['titulo']}({dato.libro_id['autor']})</label><br/></>);}}):''}
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

                    <div style={{display:"flex",flexDirection:"row",paddingLeft:'10px'}}>
                    <div style={{width:'70%',position:'relative'}}><div style={{padding:'4px',position:'absolute',boxSizing:'border-box',top:'40%',right:'1%',transform:'translateY(-50%)'}}><FaSearch /></div>
                        <input id="searchdata" placeholder="2024-5-17"  style={{width:'100%',boxSizing:'border-box',paddingRight:'1.5rem'}} /></div><button onClick={buscardatalist} className='btn btn-primary' style={{width:'30%'}}>Buscar</button>
                    </div>
                </div>
                <div style={{width:'70%'}}>
                  <h1>Prestamos</h1>
                  <Tables data={listado} handleRowClick={RowClickHandler} rows={prestamotabledata} tipodata={'prestamo'}/>
                </div>
            </div>
          </Navbar>

        }</>
    );
} 
export default ListPrestamo;
