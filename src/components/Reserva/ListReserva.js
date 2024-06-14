//Filename - components/ListReserva.js 
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Tables from "../Table/Tables";
//import RowClickHandler from "../../handler/RowClickHandler";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { endPointsbiblioteca, endPointsprestamo, endPointsreserva, endPointsusuario } from "../../constantes/endpoints";
import { reserva_formdata, reserva_initform, reserva_tabledata } from "../../constantes/values";

import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from '../../handler/useForm';
import SweetAlertHandler from '../Alerta/Sweetalerthandler';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FaSearch } from "react-icons/fa";

function ListReserva(){

    const [token] = useState(localStorage.getItem('token'));
    const [tipo] = useState(localStorage.getItem('type'));
    const [listado, setListado] = useState([]);
    const [alertas, setAlertas] = useState([]);
    const [listadosearch, setListadosearch] = useState([]);

    const [usuarios,setUsuarios]=useState([]);
    const [libros,setLibros]=useState([]);
    
    let history = useNavigate();
    const MySweetAlert = withReactContent(Swal);

    useEffect(()=>{
        const ListData = async () => {
            try {
              const response = await axios.get(endPointsreserva.list.url); // Reemplaza con la URL de tu API
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
            if(tipo==='user'&&tipo==='externo'){
              try {
              const response = await axios.get(endPointsprestamo.perfiles.url,{headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}}); // Reemplaza con la URL de tu API
              setAlertas(response.data.alertas);
              if(response.data.alertas.length>0){
                let texto='';
                for (let i = 0; i < response.data.alertas.length; i++) {
                  texto=texto+'<h5>'+response.data.alertas[i].titulo+'\n </h5><p>'+response.data.alertas[i].value+'\n</p><br/>';
                }
                
              MySweetAlert.fire({
                title: '',//'¡Hola!',
                html: texto,//'Este es un mensaje de SweetAlert en React.',
                icon: 'info',//'success',
                confirmButtonText: 'Aceptar',
                
              }).then(async (result) => {if (result.isConfirmed) { 
                setAlertas([]);
              }});}

              console.log('response',response.data)
          } catch (error) {
              console.log('Error al cargar datos:', error);
          }}
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
        return {valor:true,url:endPointsreserva.create.url,formulario:formu/*formData*/};
      };
      const [showModal, setShowModal] = useState(false);

      const handleOpenModal = () => {setShowModal(true);let data={
        fecha_reserva:'',
        libro_id:'',
        usuario_id:''
    };
    Object.keys(form).map((dato)=>form[dato]=data[dato]);}
      const handleCloseModal = () => setShowModal(false);
    
    //console.log('dataselect',dataselect);
      
    const [form, handlerChangeForm, resetForm] = useForm(reserva_initform);
        //const [token] = useState(localStorage.getItem('token'));
        //console.log('initForm',initForm);
        //console.log('Formudata',Formudata);
    
    
    
    
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
            const response = await axios.get(endPointsreserva.list.url); // Reemplaza con la URL de tu API
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
        text: 'Desea eliminar la reserva?',//'Este es un mensaje de SweetAlert en React.',
        icon: 'warning',//'success',
        showCancelButton:true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
        }).then(async (result) => {if (result.isConfirmed) { 
          axios.delete(endPointsreserva.delete.url+data[0],{headers:{'Authorization':`Bearer ${token}`}})
          .then(async (response)=>{
            SweetAlertHandler({titulo:'',texto:'Se elimino con exito',icono:'success'});
            const respon = await axios.get(endPointsreserva.list.url); // Reemplaza con la URL de tu API
            setListado(respon.data);
        })
        .catch((error)=>{SweetAlertHandler({titulo:'Error',texto:'Ocurrio un error al eliminar',icono:'error'});});}});
      }
      //console.log(`Fila clickeada con ID: ${data[0]} y ${data[1]}`);
    };

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
        let datarow=datos.filter((dato)=>dato.fecha_reserva.includes(`${data}`)?true:false);
        setListado(datarow);
      }
      
    }

    return (<>
        { token===null?<Navigate to="/login" />:
        <div>
            {/*<Menu/>*/}
            <Navbar>
              <div style={{display:'flex',flexDirection:'row'}}>
                  <div style={{width:'30%'}}>
                      <div style={{display:"flex",flexDirection:"row",paddingLeft:'10px'}}>
                        <Button variant="primary" onClick={handleOpenModal}>
                          {'Añadir nuevo'}
                        </Button>
                        <Modal show={showModal} onHide={handleCloseModal}>
                          <Modal.Header closeButton>
                            <Modal.Title>{'Crear nuevo'}</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form encType='multipart/formdata' onSubmit={handleSubmitdataeject}>
                              {reserva_formdata.map(({datalabel,dataname,typedata}) => <>
                                <label className="w-100" form={dataname}>
                                  {datalabel.replaceAll('_',' ')}:<br/>
                                  {typedata!=='select'?
                                    <input
                                        type={typedata}
                                        name={dataname}
                                        value={form[dataname]}
                                        onChange={handlerChangeForm}
                                        className="form-control w-100"
                                    />:
                                    <select className="form-control w-100" name={dataname} onChange={handlerChangeForm}>
                                    {dataname==='usuario_id'?
                                      usuarios.length>0?
                                        [<option selected value={''} disabled>Seleccione</option>,usuarios.map((usuario)=><option value={usuario.id}>{usuario.name} {usuario.last_name}</option>)]:
                                      <option disabled>no hay datos para mostrar</option>
                                      :libros.length>0?
                                          [<option selected value={''} disabled>Seleccione</option>,libros.map((libro)=><option value={libro.id}>{libro.titulo}, {libro.autor}</option>)]:
                                      <option disabled>no hay datos para mostrar</option>}</select>
                                  }
                                </label>
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
                        <input id="searchdata" placeholder="2024-05-15" style={{width:'100%',boxSizing:'border-box',paddingRight:'1.5rem'}} /></div><button onClick={buscardatalist} className='btn btn-primary' style={{width:'30%'}}>Buscar</button>
                      </div>
                  </div>
                  <div style={{width:'70%'}}>
                  <h1>Reservas</h1>
                    <Tables data={listado} handleRowClick={RowClickHandler} rows={reserva_tabledata} tipodata={'reserva'}/>
                  </div>
              </div>

            </Navbar>
        </div>
        }</>
    );
} 
export default ListReserva;
