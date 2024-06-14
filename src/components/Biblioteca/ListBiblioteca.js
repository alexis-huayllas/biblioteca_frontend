//Filename - components/ListBiblioteca.js 
import SweetAlertHandler from '../Alerta/Sweetalerthandler';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Tables from "../Table/Tables";
//import RowClickHandler from "../../handler/RowClickHandler";
import axios from "axios";
import Menu from "../Menu/Menu";
import { Button, Table, Modal} from "react-bootstrap";
import MiModalreact from "../Modales/Modalreact";
import Navbar from "../Navbar/Navbar";
import VerLibro from "./VerLibro";
import { endPointsbiblioteca, endPointsprestamo, endPointsreserva } from "../../constantes/endpoints";
import { biblioteca_formdata, biblioteca_initform, biblioteca_tabledata, reserva_formdata, reserva_initform } from "../../constantes/values";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from '../../handler/useForm';
import ListRow from '../Table/ListRow';
import NavBar1 from '../navbarprueba/navbar1/NavBar1';
import Navbar2 from '../navbarprueba/navbar2/Navbar2';
import NavBar3 from '../navbarprueba/navbar3/NavBar3';


import { FaHome, FaInfoCircle, FaTasks, FaEnvelope, FaSearch } from 'react-icons/fa';


function ListBiblioteca(){

    const [token] = useState(localStorage.getItem('token'));
    //const [panelControl] = useState(localStorage.getItem('panelControl'));
    const [tipo] = useState(localStorage.getItem('type'));
    const [listado, setListado] = useState([]);
    const [listadoprestamos, setListadoprestamos] = useState([]);
    const [listadosearch, setListadosearch] = useState([]);
    const [listadooriginal, setListadooriginal] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [cat, setCat] = useState(false);
    const handleOpenModal = () => {setShowModal(true);}
    const handleCloseModal = () => setShowModal(false);

    let history = useNavigate();
    const MySweetAlert = withReactContent(Swal);

    useEffect(()=>{
        const ListData = async () => {
            try {
              const response = await axios.get(endPointsbiblioteca.listabiblioteca.url); // Reemplaza con la URL de tu API
              const responseprestamo = await axios.get(endPointsprestamo.list.url); // Reemplaza con la URL de tu API
              setListadoprestamos(responseprestamo.data);
              //console.log(responseprestamo.data)
              datoverif(responseprestamo.data,response.data);
              
              //console.log('response',response.data)
            } catch (error) {
              console.log('Error al cargar datos:', error);
            }
          };
          ListData();
    },[])

    const CargarDigital = async () => {
      try {
        const response = await axios.get(endPointsbiblioteca.listabibliotecadigital.url); // Reemplaza con la URL de tu API
        //setListado(response.data);
        datoverif(listadoprestamos,response.data);
        //console.log('response',response.data)
      } catch (error) {
        console.log('Error al cargar datos:', error);
      }
    };

    const datoverif=(presta,lista)=>{
      if (presta.length>0) {
        lista=lista.filter((fil)=>fil.estado!=='de baja'?true:false);
        for (let i = 0; i < lista.length; i++) {
          if(lista[i].tipo!=='digital'){
            let filtro=presta.filter((fil)=>Number(fil.id_documento.id)===lista[i].id&&fil.fecha_devolucion===null?true:false);
            //console.log(filtro.length+' '+(Number(lista[i].cantidad))+' '+lista[i].id+' '+lista[i].estado);
            if(lista[i].estado==='disponible'){
              if(filtro.length<(Number(lista[i].cantidad))){
                lista[i].estado='disponible';
              }
              else{
                lista[i].estado='no disponible';
              }
            }
          } 
        }
        setListado(lista);
      } else {
        setListado(lista);
      }
      console.log('presta',presta);
      console.log('lista',lista);
      console.log('listadoprestamos',listadoprestamos);
      console.log('listado',listado);
    };

    const CargarFisico = async () => {
      try {
        const response = await axios.get(endPointsbiblioteca.listabibliotecafisica.url); // Reemplaza con la URL de tu API
        //setListado(response.data);
        datoverif(listadoprestamos,response.data);
        //console.log('response',response.data)
      } catch (error) {
        console.log('Error al cargar datos:', error);
      }
    };

    const CargarBajas = async () => {
      try {
        const response = await axios.get(endPointsbiblioteca.listabibliotecabaja.url); // Reemplaza con la URL de tu API
        setListado(response.data);
        //datoverif(listadoprestamos,response.data);
        //console.log('response',response.data)
      } catch (error) {
        console.log('Error al cargar datos:', error);
      }
    };

    const CargarTodo = async () => {
      try {
        const response = await axios.get(endPointsbiblioteca.listabiblioteca.url); // Reemplaza con la URL de tu API
        //setListado(response.data);
        datoverif(listadoprestamos,response.data);
        //console.log('response',response.data)
      } catch (error) {
        console.log('Error al cargar datos:', error);
      }
    };

    const RowClickHandler = (data) => {
        if (data[1]==='eliminar') {
          MySweetAlert.fire({
          title: 'Eliminar',//'¡Hola!',
          text: 'Desea eliminar?',//'Este es un mensaje de SweetAlert en React.',
          icon: 'warning',//'success',
          showCancelButton:true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
          }).then(async (result) => {if (result.isConfirmed) { 
            axios.delete(endPointsbiblioteca.eliminarbiblioteca.url+data[0],{headers:{'Authorization':`Bearer ${token}`}})
            .then(async (response)=>{
              SweetAlertHandler({titulo:'',texto:'Se elimino con exito',icono:'success'});
              const respon = await axios.get(endPointsbiblioteca.listabibliotecafisica.url); // Reemplaza con la URL de tu API
              datoverif(listadoprestamos,respon.data);
              //setListado(respon.data);
          })
          .catch((error)=>{SweetAlertHandler({titulo:'Error',texto:'Ocurrio un error al eliminar',icono:'error'});});}});
        }else{
            MySweetAlert.fire({
                title: 'Dar de Baja',//'¡Hola!',
                text: 'Desea Dar de Baja?',//'Este es un mensaje de SweetAlert en React.',
                icon: 'warning',//'success',
                showCancelButton:true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
                }).then(async (result) => {if (result.isConfirmed) { 
                  axios.patch( endPointsbiblioteca.eliminarbiblioteca.url+data[0],{estado:'de baja'},{headers:{'Authorization':`Bearer ${token}`}})
                  .then(async (response)=>{
                    SweetAlertHandler({titulo:'',texto:'Se dio de baja con exito',icono:'success'});
                    const respon = await axios.get(endPointsbiblioteca.listabibliotecafisica.url); // Reemplaza con la URL de tu API
                    datoverif(listadoprestamos,respon.data);
                    //setListado(respon.data);
                })
                .catch((error)=>{SweetAlertHandler({titulo:'Error',texto:'Ocurrio un error al dar de baja',icono:'error'});});}});
        }
        
        //console.log(`Fila clickeada con ID: ${data[0]} y ${data[1]}`);
    };

    const BuscarDato = async () => {
      try {
        let value=document.getElementById('searchdatabook').value;
        if (value!=='') {
          const response = await axios.post(endPointsbiblioteca.buscarbiblioteca.url,{buscar:value,orden:'titulo'}); // Reemplaza con la URL de tu API
          console.log(response);
          datoverif(listadoprestamos,response.data.data);
          //setListado(response.data.data);
        } else {
          SweetAlertHandler({titulo:'',texto:'Ingrese un dato',icono:'info'});
        }        
        //console.log('response',response.data)
      } catch (error) {
        console.log('Error al cargar datos:', error);
      }
    };

    /*const handleSubmitdata = (formu) => {
        if (formu.libro_id==="") {
            //console.log('error de titulo');
            return {valor:false};
        }
        //Object.keys(formu).map((value)=>{if(formu[value]!==null&&formu[value]!==undefined&&formu[value]!=='')formData.append(''+value, formu[value])});
        return {valor:true,url:endPointsreserva.create.url,formulario:formu}};
      
      
    };*/

    /*const handleSubmitdataeject = (e) => {
      e.preventDefault();
      console.log('form', e);
      //form.usuario_id=item.usuario_id;
      //form.libro_id=item.id;

      const verificar=handleSubmitdata(form);
      //console.log(verificar.valor, verificar.url);
      if(verificar.valor===false){
        //console.log('verifique los errores');
        SweetAlertHandler({titulo:'',texto:'Verifique que todos los campos requeridos',icono:'warning'});
  
      }
      else{
        
          axios.post(verificar.url,verificar.formulario,{headers:{'Authorization':`Bearer ${token}`}})
          .then((response)=>{

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
    };*/


  /*const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', form);
  };*/

  const modalidades=[{name:'Trabajo Dirigido',value:'trabajo'},{name:'Proyecto de grado',value:'proyecto'},{name:'Tesis de Grado',value:'tesis'},{name:'Auxiliar de Investigacion',value:'auxiliar'},{name:'Proyecto de Investigacion',value:'proyectoinvestigacion'}];
  const categorias=[{name:'Arquitectura general',value:'Arquitectura general'},
  {name:'Diseño y proyectos',value:'Diseño y proyectos'},
  {name:'Rehabilitación y conservación',value:'Rehabilitacion y conservacion'},
  {name:'Urbanismo y paisajismo',value:'Urbanismo y paisajismo'},
  {name:'Historia y cultura',value:'Historia y cultura'},
  {name:'Referencias y manuales',value:'Referencias y manuales'},
  {name:'Profesionales y ética',value:'Profesionales y ética'},
  {name:'Revistas y publicaciones periódicas',value:'Revistas y publicaciones periodicas'},
  {name:'Exposiciones y congresos',value:'Exposiciones y congresos'},
  {name:'Biografías y premios',value:'Biografias y premios'},
  {name:'Turismo y guías ',value:'Turismo y guias '},
  {name:'Decoraciones y diseño interior',value:'Decoraciones y diseño interior'},
  {name:'Infraestructura educación ',value:'Infraestructura educación '},
  {name:'Infraestructura salud',value:'Infraestructura salud'},
  {name:'infraestructura deportiva',value:'Infraestructura deportiva'},
  {name:'Infraestructura cultural ',value:'Infraestructura cultural '},
  {name:'Infraestructura mercado y comercio',value:'Infraestructura mercado y comercio'},
  {name:'Infraestructura espacios públicos y urbanismo',value:'Infraestructura espacios publicos y urbanismo'},
  {name:'Infraestructura instituciones',value:'Infraestructura instituciones'},
  //{name:'otros',value:''}
];




const modalidadselect=(target)=>{
  let data=[];
    if(listadooriginal.length===0){
      setListadooriginal(listado);
      data=listado;
    }else{
      data=listadooriginal;
    }
    if(target.value==='todos'){
      if(data.length>0){
        setListado(data);
      }
      setListadooriginal([])
    }
    else{//datalistadoselect(target.value);
      let dat=/*alert(target.value)*/data.filter((dato)=>dato.modalidad===`${target.value}`?true:false);
      setListado(dat);
    }
}

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
    let datarow=datos.filter((dato)=>dato.titulo.includes(`${data}`)||dato.reseña.includes(`${data}`)?true:false);
    setListado(datarow);
  }
}




    return (<>
        { token===null?<Navigate to="/login" />:
        <Navbar>
          <div style={{display:'flex',flexDirection:'row'}}>
                <div style={{width:'30%'}}>
                    <div style={{display:"flex",flexDirection:"row",paddingLeft:'10px'}}>
                      <button className='btn btn-dark' onClick={CargarDigital}>biblioteca digital</button>
                      <button className='btn btn-dark' onClick={CargarFisico}>biblioteca fisica</button>
                      {tipo==='admin'||tipo==='superuser'?<><MiModalreact boton={'Crear nuevo'} titulo={'nuevo'}/>
                      </>:''}
                    </div>
                    <div style={{display:"flex",flexDirection:"row",paddingLeft:'10px'}}>
                      <button className='btn btn-secondary' onClick={CargarTodo}>Todos</button>
                      {tipo==='admin'||tipo==='superuser'?<>                      
                      <button className='btn btn-info' onClick={CargarBajas}>Con Bajas</button>
                      </>:''}
                    </div>
                    <br/>
                      
                    
                    <div style={{display:"flex",flexDirection:"row",paddingLeft:'10px'}}>
                    <div style={{width:'70%',position:'relative'}}><div style={{padding:'4px',position:'absolute',boxSizing:'border-box',top:'40%',right:'1%',transform:'translateY(-50%)'}}><FaSearch /></div>
                        <input id="searchdata" style={{width:'100%',boxSizing:'border-box',paddingRight:'1.5rem'}} /></div><button onClick={buscardatalist} className='btn btn-primary' style={{width:'30%'}}>Buscar</button>
                    </div>
                    <div>
                      <div style={{border:'1px solid #ccc'}}>{/**/}
                        Mostrar: <select onChange={({target})=>modalidadselect(target)}>
                          <option selected value={'todos'}>{'Seleccione'}</option>
                          {modalidades.map(({name,value})=><option value={value}>{name}</option>)}
                          <option value={''}>{'Libros'}</option>
                        </select>
                      </div>
                      {/*<div style={{border:'1px solid #ccc'}}>
                        Buscar Libro: <input type='text' id='searchdatabook' placeholder='ingrese titulo/autor/palabras clave'/>
                        <button className='w-25 btn btn-outline-info' onClick={BuscarDato}>Buscar</button>
                      </div>*/}
                    </div>
                    <br/>
                    <div className=''>
                      <h6>Categorias</h6>
                      {categorias.map(({name,value})=><div className='btn btn-outline-dark' onClick={()=>{let data=[];if(listadosearch.length===0){setListadosearch(listado);data=listado;setCat(true);}else{data=listadosearch;}let datarow=data.filter((dato)=>dato.categoria===`${value}`?true:false);setListado(datarow);}} style={{display:'flex',flexDirection:'row'}}><div className='table table-hover' style={{width:'95%'/*,height:'1em'*/}}>{name}</div><span style={{padding:'1px',alignSelf:'auto',borderRadius:'50px',backgroundColor:'steelblue',paddingLeft:'3px',paddingRight:'3px'}}>{listado.filter((dato)=>dato.categoria===`${value}`?true:false).length}</span></div>)}
                    </div>
                </div>
                <div style={{width:'70%'}}>
                {cat===false?<h1>Biblioteca</h1>:<div style={{width:'100%',textAlign:'right'}}><button className='btn btn-outline-dark' style={{borderColor:'transparent'}} onClick={()=>{setListado(listadosearch);setListadosearch([]);setCat(false)}}><h3>x</h3></button></div>}
                    {tipo==='superuser'?<Tables data={listado} handleRowClick={RowClickHandler} rows={biblioteca_tabledata} tipodata={'biblioteca'} />:
                    <>{listado.map((dato,m)=><ListRow numero={m+1} item={dato} handleRowClick={RowClickHandler} cols={biblioteca_tabledata} />)}</>}
                </div>
            </div>

            
            
        </Navbar>
        }</>
    );
} 
export default ListBiblioteca;