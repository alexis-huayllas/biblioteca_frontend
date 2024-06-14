//Filename - components/ListUsuario.js 
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Tables from "../Table/Tables";
//import RowClickHandler from "../../handler/RowClickHandler";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { persona_formdata, persona_initform, persona_tabledata } from "../../constantes/values";

import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from '../../handler/useForm';
import SweetAlertHandler from '../Alerta/Sweetalerthandler';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { endPointsusuario } from "../../constantes/endpoints";
import NavBar1 from "../navbarprueba/navbar1/NavBar1";
import Navbar2 from "../navbarprueba/navbar2/Navbar2";
import NavBar3 from "../navbarprueba/navbar3/NavBar3";
import { FaSearch } from "react-icons/fa";

function ListUsuario(){

    const [token] = useState(localStorage.getItem('token'));
    const [panelControl] = useState(localStorage.getItem('panelControl'));
    const [tipo] = useState(localStorage.getItem('type'));
    const [listado, setListado] = useState([]);
    const [listadosearch, setListadosearch] = useState([]);
    const [rolesuser] = useState(tipo==='superuser'?[{name:'Bibliotecario',value:'admin'},{name:'Estudiante/Docente',value:'user'},{name:'Externo',value:'externo'}]:[{name:'Estudiante/Docente',value:'user'},{name:'Externo',value:'externo'}]);

    
    let history = useNavigate();

    useEffect(()=>{
        const ListData = async () => {
            try {
              const response = await axios.get(endPointsusuario.listar.url); // Reemplaza con la URL de tu API
              setListado(response.data);
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
        if (formu.fecha_reserva==="") {
            //console.log('error de titulo');
            return {valor:false};
        }
        /*if (formu.password!==formu.repassword) {
            //console.log('error de titulo');
            return {valor:false};
        }*/
        
    
        //Object.keys(formu).map((value)=>{if(formu[value]!==null&&formu[value]!==undefined&&formu[value]!=='')formData.append(''+value, formu[value])});
        return {valor:true,url:endPointsusuario.registrar.url,formulario:formu/*formData*/};
      };
      const [showModal, setShowModal] = useState(false);

      const handleOpenModal = () => {setShowModal(true);let data={
        name:'',
        last_name:'',
        usuario:'',
        password:"",
        role:"externo"
    };
    Object.keys(form).map((dato)=>form[dato]=data[dato]);}
      const handleCloseModal = () => setShowModal(false);
    
    //console.log('dataselect',dataselect);
      
    const [form, handlerChangeForm, resetForm] = useForm(persona_initform);
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
            const response = await axios.get(endPointsusuario.listar.url); // Reemplaza con la URL de tu API
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

    const RowClickHandler = (data) => {
      if (data[1]==='eliminar') {
        MySweetAlert.fire({
        title: 'Eliminar',//'¡Hola!',
        text: 'Desea eliminar el usuario?',//'Este es un mensaje de SweetAlert en React.',
        icon: 'warning',//'success',
        showCancelButton:true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
        }).then(async (result) => {if (result.isConfirmed) { 
          axios.delete(endPointsusuario.eliminar.url+data[0],{headers:{'Authorization':`Bearer ${token}`}})
          .then(async (response)=>{
            SweetAlertHandler({titulo:'',texto:'Se elimino con exito el usuario',icono:'success'});
            const respon = await axios.get(endPointsusuario.listar.url); // Reemplaza con la URL de tu API
            setListado(respon.data);
        })
        .catch((error)=>{SweetAlertHandler({titulo:'Error',texto:'Ocurrio un error al eliminar',icono:'error'});});
        /*console.log('eliminando')*/ }});
      }
      
      //console.log(`Fila clickeada con ID: ${data[0]} y ${data[1]}`);
    };

    const cargarbajas=async ()=>{
      try {
        const response = await axios.get(endPointsusuario.baja.url); // Reemplaza con la URL de tu API
        setListado(response.data);
        console.log('response',response.data)
      } catch (error) {
        console.log('Error al cargar datos:', error);
      }
    }

    const cargarusuarios=async ()=>{
      try {
        const response = await axios.get(endPointsusuario.listar.url); // Reemplaza con la URL de tu API
        setListado(response.data);
        console.log('response',response.data)
      } catch (error) {
        console.log('Error al cargar datos:', error);
      }
    }

    return (<>
        { token===null?<Navigate to="/login" />:
        <Navbar>
            {/*<Menu/>*/}
            {/*panelControl==='1'?<NavBar1/>:panelControl==='2'?<Navbar2/>:panelControl==='3'?<NavBar3/>:<Navbar/>*/}
            {/*<div style={{ margin: "5rem" }}>
            <Link className="d-grid gap-2" to="/">
                <Button variant="primary" size="lg">
                    Inicio
                </Button>
            </Link>*/}
            <div style={{display:'flex',flexDirection:'row'}}>
                <div style={{width:'30%'}}>
                    <div style={{display:"flex",flexDirection:"row",paddingLeft:'10px'}}>
                      
                        {tipo==='superuser'||tipo==='admin'?
                        <Button variant="primary" onClick={handleOpenModal}>
                          {'Añadir nuevo'}
                        </Button>:''}
                        <button onClick={cargarusuarios} className="btn btn-outline-primary">Todos los Usuarios</button>
                        <button onClick={cargarbajas} className="btn btn-outline-secondary">Usuarios con baja</button>

                        <Modal show={showModal} onHide={handleCloseModal}>
                          <Modal.Header closeButton>
                            <Modal.Title>{'Crear nuevo'}</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form encType='multipart/formdata' onSubmit={handleSubmitdataeject}>
                              {persona_formdata.map(({datalabel,dataname,typedata}) => <>
                                {dataname==='role'?
                                <label form={dataname}>
                                    {datalabel}:
                                {typedata==='select'?
                                  <select className='form-control w-100' name={dataname} onChange={handlerChangeForm}><option disabled selected value={''}>Seleccione</option>{rolesuser.map(({name,value})=><option value={value}>{name}</option>)}</select>:
                                  <input
                                      className='form-control w-100'
                                      type={typedata}
                                      name={dataname}
                                      value={form[dataname]}
                                      onChange={handlerChangeForm}
                                  />
                                }
                                </label>:<label form={dataname}>
                                    {datalabel}:
                                  <input
                                      className='form-control w-100'
                                      type={typedata}
                                      name={dataname}
                                      value={form[dataname]}
                                      onChange={handlerChangeForm}
                                  />
                                </label>}
                                <br />
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
                      
                    
                    <div style={{display:"flex",flexDirection:"row",paddingLeft:'10px'}}>
                    <div style={{width:'70%',position:'relative'}}><div style={{padding:'4px',position:'absolute',boxSizing:'border-box',top:'40%',right:'1%',transform:'translateY(-50%)'}}><FaSearch /></div>
                        <input id="searchdata" style={{width:'100%',boxSizing:'border-box',paddingRight:'1.5rem'}} /></div><button onClick={()=>{if(listadosearch.length===0){setListadosearch(listado);}let data=document.getElementById('searchdata').value;if (data==='') {setListado(listadosearch);setListadosearch([]);}else{let datarow=listadosearch.filter((dato)=>dato.name.includes(`${data}`)||dato.last_name.includes(`${data}`)?true:false);setListado(datarow);}}} style={{width:'30%'}}>Buscar</button>
                    </div>
                </div>
                <div style={{width:'70%'}}>
                  <Tables data={listado} handleRowClick={RowClickHandler} rows={persona_tabledata} tipodata={'usuario'}/>
                </div>
            </div>
            

        {/*</div>*/}
        </Navbar>
        }</>
    );
} 
export default ListUsuario;
