//Filename - components/ListUsuario.js 
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Tables from "../Table/Tables";
import RowClickHandler from "../../handler/RowClickHandler";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { bitacora_formdata, bitacora_initform, bitacora_tabledata } from "../../constantes/values";

import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from '../../handler/useForm';
import SweetAlertHandler from '../Alerta/Sweetalerthandler';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { endPointsbitacora } from "../../constantes/endpoints";
import NavBar1 from "../navbarprueba/navbar1/NavBar1";
import Navbar2 from "../navbarprueba/navbar2/Navbar2";
import NavBar3 from "../navbarprueba/navbar3/NavBar3";
import { FaSearch } from "react-icons/fa";

function ListBitacora(){

    const [token] = useState(localStorage.getItem('token'));
    const [panelControl] = useState(localStorage.getItem('panelControl'));
    const [tipo] = useState(localStorage.getItem('type'));
    const [listado, setListado] = useState([]);
    const [listadosearch, setListadosearch] = useState([]);

    
    let history = useNavigate();

    useEffect(()=>{
        const ListData = async () => {
            try {
              const response = await axios.get(endPointsbitacora.listar.url,{headers:{'Authorization':`Bearer ${token}`}}); // Reemplaza con la URL de tu API
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
        return {valor:true,url:endPointsbitacora.create.url,formulario:formu/*formData*/};
      };
      const [showModal, setShowModal] = useState(false);

      const handleOpenModal = () => setShowModal(true);
      const handleCloseModal = () => setShowModal(false);
    
    //console.log('dataselect',dataselect);
      
    const [form, handlerChangeForm, resetForm] = useForm(bitacora_initform);
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
            const response = await axios.get(endPointsbitacora.listar.url); // Reemplaza con la URL de tu API
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
          let datarow=datos.filter((dato)=>dato.contenido.includes(`${data}`)||dato.detalle.includes(`${data}`)?true:false);
          setListado(datarow);
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
                      {tipo==='superuseradmin'?<>
                        <Button variant="primary" onClick={handleOpenModal}>
                          {'Añadir nuevo'}
                        </Button>

                        <Modal show={showModal} onHide={handleCloseModal}>
                          <Modal.Header closeButton>
                            <Modal.Title>{'Crear nuevo'}</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form encType='multipart/formdata' onSubmit={handleSubmitdataeject}>
                            {bitacora_formdata.map(({datalabel,dataname,typedata}) => <>
                              <label>
                                  {datalabel}:
                              <input
                                  type={typedata}
                                  name={dataname}
                                  value={form[dataname]}
                                  onChange={handlerChangeForm}
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
                      </>:''}
                    </div>
                      
                    
                    <div style={{display:"flex",flexDirection:"row",paddingLeft:'10px'}}>
                      
                    <div style={{width:'70%',position:'relative'}}><div style={{padding:'4px',position:'absolute',boxSizing:'border-box',top:'40%',right:'1%',transform:'translateY(-50%)'}}><FaSearch /></div>
                        <input id="searchdata" style={{width:'100%',boxSizing:'border-box',paddingRight:'1.5rem'}} /></div><button onClick={buscardatalist} className='btn btn-primary' style={{width:'30%'}}>Buscar</button>
                    </div>
                </div>
                <div style={{width:'70%'}}>
                  <h2>Bitacoras</h2>
                  <Tables data={listado} handleRowClick={RowClickHandler} rows={bitacora_tabledata} tipodata={'bitacora'}/>
                </div>
            </div>
        


        {/*</div>*/}
        </Navbar>
        }</>
    );
} 
export default ListBitacora;