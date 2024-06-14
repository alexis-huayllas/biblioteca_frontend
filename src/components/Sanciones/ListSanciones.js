//Filename - components/ListUsuario.js 
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Tables from "../Table/Tables";
import RowClickHandler from "../../handler/RowClickHandler";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { sancion_formdata, sancion_initform, sancion_tabledata } from "../../constantes/values";

import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from '../../handler/useForm';
import SweetAlertHandler from '../Alerta/Sweetalerthandler';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { endPointssancion } from "../../constantes/endpoints";
import { FaSearch } from "react-icons/fa";

function ListSanciones(){

    const [token] = useState(localStorage.getItem('token'));
    const [tipo] = useState(localStorage.getItem('type'));
    const [listado, setListado] = useState([]);
    const [listadosearch, setListadosearch] = useState([]);

    
    let history = useNavigate();

    useEffect(()=>{
        const ListData = async () => {
            try {
              const response = await axios.get(endPointssancion.listar.url); // Reemplaza con la URL de tu API
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
        return {valor:true,url:endPointssancion.registrar.url,formulario:formu/*formData*/};
      };
      const [showModal, setShowModal] = useState(false);

      const handleOpenModal = () => {setShowModal(true);let data={
        detalle:'',
        penalizacion:'',
        multa:''
    };
    Object.keys(form).map((dato)=>form[dato]=data[dato]);}
      const handleCloseModal = () => setShowModal(false);
    
    //console.log('dataselect',dataselect);
      
    const [form, handlerChangeForm, resetForm] = useForm(sancion_initform);
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
            const response = await axios.get(endPointssancion.listar.url); // Reemplaza con la URL de tu API
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
        text: 'Desea eliminar la sancion?',//'Este es un mensaje de SweetAlert en React.',
        icon: 'warning',//'success',
        showCancelButton:true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
        }).then(async (result) => {if (result.isConfirmed) { 
          axios.delete(endPointssancion.eliminar.url+data[0],{headers:{'Authorization':`Bearer ${token}`}})
          .then(async (response)=>{
            SweetAlertHandler({titulo:'',texto:'Se elimino con exito',icono:'success'});
            const respon = await axios.get(endPointssancion.listar.url); // Reemplaza con la URL de tu API
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
          let datarow=datos.filter((dato)=>dato.detalle.includes(`${data}`)||dato.penalizacion.includes(`${data}`)||dato.multa.includes(`${data}`)?true:false);
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
                      {sancion_formdata.map(({datalabel,dataname,typedata}) => <>
                            <label className="w-100" form={dataname}>
                                {datalabel}:<br/>
                            <input
                                type={typedata}
                                name={dataname}
                                value={form[dataname]}
                                onChange={handlerChangeForm}
                                className="form-control w-100"
                            />
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
                        <input id="searchdata" placeholder="" style={{width:'100%',boxSizing:'border-box',paddingRight:'1.5rem'}} /></div><button onClick={buscardatalist} className='btn btn-primary' style={{width:'30%'}}>Buscar</button>
                    </div>
                </div>
                <div style={{width:'70%'}}>
                  <h1>Sanciones</h1>
                  <Tables data={listado} handleRowClick={RowClickHandler} rows={sancion_tabledata} tipodata={'sancion'}/>
                </div>
            </div>
            </Navbar>
            
        </div>
        }</>
    );
} 
export default ListSanciones;
