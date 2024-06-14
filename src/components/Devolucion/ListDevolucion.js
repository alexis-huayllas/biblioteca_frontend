//Filename - components/ListDevolucion.js 
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Tables from "../Table/Tables";
import RowClickHandler from "../../handler/RowClickHandler";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { devolucion_formdata, devolucion_initform, devoluciontabledata } from "../../constantes/values";

import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from '../../handler/useForm';
import SweetAlertHandler from '../Alerta/Sweetalerthandler';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { endPointsbiblioteca, endPointsprestamo, endPointssancion } from "../../constantes/endpoints";
import { FaSearch } from "react-icons/fa";
import Select from 'react-select';

function ListDevolucion(){

    const [token] = useState(localStorage.getItem('token'));
    const [tipo] = useState(localStorage.getItem('type'));
    const [listado, setListado] = useState([]);
    const [listadosearch, setListadosearch] = useState([]);

    const [sancion,setSancion]=useState([]);
    const [prestamos,setPrestamos]=useState([]);
    const [code,setCode]=useState('');
            

    const [options, setOptions] = useState([]);
    
    let history = useNavigate();

    useEffect(()=>{
        const ListData = async () => {
            try {
              const response = await axios.get(endPointsprestamo.listDevoluciones.url); // Reemplaza con la URL de tu API
              setListado(response.data);
              console.log('response',response.data)
            } catch (error) {
              console.log('Error al cargar datos:', error);
            }
            try {
              const response = await axios.get(endPointsprestamo.listPrestamos.url); // Reemplaza con la URL de tu API
              setPrestamos(response.data);
              console.log('response',response.data)
            } catch (error) {
              console.log('Error al cargar datos:', error);
            }
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
            /*try {
                const response = await axios.get(endPointsbiblioteca.listabibliotecafisica.url,{headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}}); // Reemplaza con la URL de tu API
                setLibros(response.data);
                console.log('response',response.data)
            } catch (error) {
                console.log('Error al cargar datos:', error);
            }*/
          };
          ListData();
    },[])


    

    const handleSubmitdata = (formu) => {
        //const formData = new FormData();
        //e.preventDefault();
        if (formu.fecha_devolucion==="") {
            //console.log('error de titulo');
            return {valor:false};
        }
        if (code==="") {
          //console.log('error de titulo');
          return {valor:false};
      }
        /*if (formu.password!==formu.repassword) {
            //console.log('error de titulo');
            return {valor:false};
        }*/
        
    
        //Object.keys(formu).map((value)=>{if(formu[value]!==null&&formu[value]!==undefined&&formu[value]!=='')formData.append(''+value, formu[value])});
        return {valor:true,url:endPointsprestamo.update.url+code,formulario:formu/*formData*/};
      };
      const [showModal, setShowModal] = useState(false);

      const handleOpenModal = () => {setShowModal(true);let data={
        //prestamo_id:'',
        fecha_devolucion:'',
        id_sancion:''
    };
    Object.keys(form).map((dato)=>form[dato]=data[dato]);}
      const handleCloseModal = () => setShowModal(false);
    
    //console.log('dataselect',dataselect);
      
    const [form, handlerChangeForm, resetForm] = useForm(devolucion_initform);
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
        if(form.fecha_devolucion===''){form.fecha_devolucion=new Date().toISOString();SweetAlertHandler({titulo:'al no registrar una fecha, se registro la fecha actual',texto:'se registro la fecha'+form.fecha_devolucion,icono:'info'})};
        const verificar=handleSubmitdata(form);
        //console.log(verificar.valor, verificar.url);
        if(verificar.valor===false){
          //console.log('verifique los errores');
          SweetAlertHandler({titulo:'',texto:'Verifique que todos los campos requeridos',icono:'warning'});
    
        }
        else{
          axios.patch(verificar.url,verificar.formulario,{headers:{'Authorization':`Bearer ${token}`}})
          .then((response)=>{/*const data=SweetAlertHandlerConfirm({titulo:'Guardado',texto:'Se guardo con exito',icono:'success',link:cerrarmodal});console.log('0data');*/
          MySweetAlert.fire({
            title: 'Guardado',//'¡Hola!',
            text: 'Se guardo con exito',//'Este es un mensaje de SweetAlert en React.',
            icon: 'success',//'success',
            confirmButtonText: 'Aceptar',
            
          }).then(async (result) => {if (result.isConfirmed) { handleCloseModal();
            const response = await axios.get(endPointsprestamo.listDevoluciones.url); // Reemplaza con la URL de tu API
            setListado(response.data);
            const responsedata = await axios.get(endPointsprestamo.listPrestamos.url); // Reemplaza con la URL de tu API
            setPrestamos(responsedata.data);
            setCode('');}});
        
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


      const [selectedOptions, setSelectedOptions] = useState([]);

      const handleChange = (selected) => {
        setSelectedOptions(selected);
        let dat=[];
        selected.length>0?selected.map((datmap)=>dat.push(datmap.value)):dat='';
        form.id_sancion=dat;

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
          let datarow=datos.filter((dato)=>dato.fecha_devolucion.includes(`${data}`)?true:false);
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
                          Fecha del Prestamo:{prestamos.length>0?<><select onChange={({target})=>setCode(target.value)}><option selected disabled value={''}>Seleccione</option>{prestamos.length>0?prestamos.map((dato)=><option value={dato.id}>{dato.fecha_prestamo.replace('T',' ').slice(0,19)}</option>):''}</select><br/></>:'no hay prestamos registrados'}
                          {code!==''?prestamos.map((dato)=>{if(''+code===''+dato.id)return (<><label>Usuario: {dato.id_usuario["name"]} {dato.id_usuario["last_name"]}</label><br/><label>Libro: {dato.id_documento['titulo']} ({dato.id_documento['autor']}-{dato.id_documento['anoPublicacion']})</label><br/></>)}):''}
                        {devolucion_formdata.map(({datalabel,dataname,typedata}) => <>
                            <label form={dataname}>
                                {datalabel}:
                                {typedata!=='select'?
                            <input
                                className="form-control"
                                type={typedata}
                                name={dataname}
                                value={form[dataname]}
                                onChange={handlerChangeForm}
                                placeholder={datalabel}
                                />:<>
                                  <Select
                                    isMulti
                                    value={selectedOptions}
                                    onChange={handleChange}
                                    options={options}
                                    placeholder="Seleccionar sanciones"
                                  />
                                </>
                                }
                            </label>
                            <br />
                        </>)}
                        {'sanciones asignadas'}<br />
                        {form.id_sancion!==''?
                        sancion.length>0&&selectedOptions.length>0?
                          sancion.map((sanciondata,num)=>selectedOptions.map((dato)=>sanciondata.id===Number(dato.value)?<>{num+1}.-{sanciondata.detalle}<br />Multa: {sanciondata.multa}<br /></>:'')):
                        '':<>no hay sanciones asignadas<br /></>}
                        {code!==''?prestamos.map((dato)=>{if(''+code===''+dato.id){let fecha=new Date(dato.fecha_prestamo);fecha.setDate(fecha.getDate()+2);return (<>{(parseInt(((new Date())-fecha)/(1000*60*60*24),10)>0)?<p style={{color:'red'}}>restraso de {parseInt(((new Date())-fecha)/(1000*60*60*24),10)} dias</p>:''}</>);}}):''}<br />
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
                        <input id="searchdata" placeholder="2024-5-16" style={{width:'100%',boxSizing:'border-box',paddingRight:'1.5rem'}} /></div><button onClick={buscardatalist} className='btn btn-primary' style={{width:'30%'}}>Buscar</button>
                    </div>
                </div>
                <div style={{width:'70%'}}>
                  <h3>Devoluciones</h3>
                  <Tables data={listado} handleRowClick={RowClickHandler} rows={devoluciontabledata} tipodata={'devolucion'}/>
                </div>
            </div>
            </Navbar>
            
        </div>
        }</>
    );
} 
export default ListDevolucion;
