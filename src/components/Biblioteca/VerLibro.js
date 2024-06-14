//Filename - components/VerLibro.js
 
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, Navigate, useSearchParams } from "react-router-dom";
import axios from 'axios';
import { endPointsbiblioteca, endPointsprestamo } from "../../constantes/endpoints";
import Navbar from "../Navbar/Navbar";
//import { PDFDocument } from 'pdf-lib';
import PdfViewer from './PdfViewer';
import NavBar1 from "../navbarprueba/navbar1/NavBar1";
import Navbar2 from "../navbarprueba/navbar2/Navbar2";
import NavBar3 from "../navbarprueba/navbar3/NavBar3";
import { biblioteca_formdata } from "../../constantes/values";
import { reserva_formdata, reserva_initform } from '../../constantes/values';
import { endPointsreserva } from '../../constantes/endpoints';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from "../../handler/useForm";
import SweetAlertHandler from '../Alerta/Sweetalerthandler';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { io } from "socket.io-client";


function VerLibro() {
    const tipo=localStorage.getItem('type');
  const socket = io('http://localhost:3008');


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
    let history = useNavigate();
    //let param = useSearchParams();

    const MySweetAlert = withReactContent(Swal);



  /*const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', form);
  };*/

  const handleSubmitdataeject = (e) => {
    e.preventDefault();
    //console.log('form', form);
    form.libro_id=databook.id;
    
    
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
            let alert={titulo:'reserva por atender',value:'se añadio la reserva de fecha '+response.data.fecha_reserva+' de '+databook.seleccion+' de titulo: '+databook.titulo+', de autor '+databook.autor+' por el usuario '+localStorage.getItem('nombre')};//[]; 
            
            if(tipo==='user'||tipo==='externo'){
              socket.emit('userMessage', /*message*/alert);
            }else{
              socket.emit('adminReply', /*replyMessage*/alert);
            }
            handleCloseModal();}});
        
        })
        .catch((error)=>{if(error.response.data.statusCode===401){SweetAlertHandler({titulo:'Su sesion a expirado',texto:'Inicie sesion nuevamente',icono:'info'});localStorage.removeItem('token');localStorage.removeItem('nombre');localStorage.removeItem('type');window.location.reload();}else{SweetAlertHandler({titulo:'Error',texto:'Ocurrio un error al guardar',icono:'error'});}console.log(error.response.data);});
      
      
    }
    }

    const clearform = () => {
        resetForm();
        //setErrors(false);
        //setCreateUser(false);
      };


    const [token, setToken] = useState(localStorage.getItem('token'));
    const [titulo] = useState(localStorage.getItem('titulo')?localStorage.getItem('titulo'):sessionStorage.getItem('titulo'));
    const [book] = useState(localStorage.getItem('num_book')?localStorage.getItem('num_book'):sessionStorage.getItem('num_book'));
    const [page,setPage] = useState(1/*sessionStorage.getItem('page')?sessionStorage.getItem('page'):1*/);
    const [lim,setLim] = useState(sessionStorage.getItem('lim')?sessionStorage.getItem('lim'):0);
    const [databook,setDatabook] = useState([]);
    //const [listadoprestamos, setListadoprestamos] = useState([]);
    //console.log(num_libro);
    const [base64Pdf,setBase64Pdf]=useState('');
    const [showdocs,setShowdocs]=useState(false);
    const [showpage,setShowpage]=useState(1);
    
    //localStorage.getItem('num_book')?localStorage.removeItem('num_book'):'';
    //localStorage.getItem('page')?localStorage.removeItem('page'):'';
    const verDatos=async ()=>{
        //console.log('llega a la funcion verdatos');
        document.getElementById('verdatos').setAttribute('disabled','disabled');
        await axios.get(endPointsbiblioteca.obtenerpaginabiblioteca.url+`${book}/${page}`/*'9/2'id_libro/numpage*/,{headers:{'Authorization':`Bearer ${token}`}}).then(async (response)=>{
        const responseprestamo = await axios.get(endPointsprestamo.list.url); // Reemplaza con la URL de tu API
        //setListadoprestamos(responseprestamo.data);
        //console.log(responseprestamo.data)
        if (responseprestamo.data.length>0) {
          //lista=lista.filter((fil)=>fil.estado!=='de baja'?true:false);
          //for (let i = 0; i < lista.length; i++) {
            if(response.data.databook.tipo!=='digital'){
              let filtro=responseprestamo.data.filter((fil)=>Number(fil.id_documento.id)===response.data.databook.id&&fil.fecha_devolucion===null?true:false);
              //console.log(filtro.length+' '+(Number(lista[i].cantidad))+' '+lista[i].id+' '+lista[i].estado);
              if(response.data.databook.estado==='disponible'){
                if(filtro.length<(Number(response.data.databook.cantidad))){
                  response.data.databook.estado='disponible';
                }
                else{
                  response.data.databook.estado='no disponible';
                }
              }
            //} 
          }
          //setListado(lista);
        }
          //console.log(response.data);
            //document.getElementById('getdata').innerHTML='<iframe src="data:application/pdf;base64,'+response.data.archivo+'" width="100%" height="600px" frameborder="0"></iframe>';
            //document.getElementById('iframedata').removeAttribute('hidden');
            //document.getElementById('iframedata').setAttribute('src','data:application/pdf;base64,'+response.data.archivo)
            //setBase64Pdf(new Uint8Array(response.data.archivo));
            //setBase64Pdf(new Uint8Array(/*new Buffer.from(*/response.data.archivo/*, 'base64')*/));
            setBase64Pdf(response.data.archivo);
            setDatabook(response.data.databook);
            sessionStorage.setItem('lim',response.data.lim);
            sessionStorage.setItem('num_book',book);
            sessionStorage.setItem('page',page);
            if(localStorage.getItem('num_book')){localStorage.removeItem('num_book');localStorage.removeItem('titulo');}
            if (response.data.lim!==lim){setLim(sessionStorage.getItem('lim'));console.log('limset',lim);}
            
            //const base64PDF = ''+response.data.archivo; // Reemplaza con tu PDF en base64
            // Decodificar el PDF base64 a un Uint8Array
            //const uint8Array = Uint8Array.from(atob(base64PDF), c => c.charCodeAt(0));
            // Cargar el PDF desde el Uint8Array utilizando pdf-lib
            /*await PDFDocument.load(uint8Array).then((pdfDoc) => {
                // Obtener la primera página del PDF
                const firstPage = pdfDoc.getPage(0);
                // Crear un canvas para renderizar la página del PDF
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                // Renderizar la página del PDF en el canvas
                //const viewport = firstPage.getViewport({ scale: 1.0 });
                //canvas.height = viewport.height;
                //canvas.width = viewport.width;
                //firstPage.draw(context, { viewport });

                const pageSize = [595, 842]; // Tamaño estándar de una página A4 en puntos (unidad de medida de PDF)

                canvas.height = pageSize[1];
                canvas.width = pageSize[0];
            
                firstPage.draw(context, {
                x: 0,
                y: 0,
                width: pageSize[0],
                height: pageSize[1],
                scale: 1,
                //colorRgb: rgb(1, 1, 1),
                });

                // Convertir el canvas a una imagen en base64
                const imageData = canvas.toDataURL('image/png');
                document.getElementById('getdata').innerHTML="<img src='"+imageData+"'>";
                console.log('imageData',imageData); // Aquí puedes usar imageData como desees
            }).catch(error => {
            console.error('Error al cargar el PDF:', error);
            });*/
            //const bytes = Uint8Array.from(atob(base64PDF), c => c.charCodeAt(0));
            /*PDFDocument.load(bytes).then((pdfDoc) => {
                const firstPage = pdfDoc.getPage(0);

                const pageSize = [595, 842]; // Tamaño estándar de una página A4 en puntos (unidad de medida de PDF)

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                canvas.height = pageSize[1];
                canvas.width = pageSize[0];

                const scale = 1; // Puedes ajustar el escalamiento si es necesario

                const scaledSize = [pageSize[0] * scale, pageSize[1] * scale];

                const renderContext = {
                    canvasContext: context,
                    transform: [scale, 0, 0, scale, 0, 0],
                    viewport: { width: scaledSize[0], height: scaledSize[1] },
                    //background: rgb(1, 1, 1),
                };


                firstPage.render(renderContext).promise.then(() => {
                    const imageData = canvas.toDataURL('image/png');
                    document.getElementById('getdata').innerHTML="<img src='"+imageData+"'>";
                    console.log('imageData',imageData); // Aquí puedes usar imageData como desees
                }).catch(error => {
                    console.error('Error al renderizar la página:', error);
                });
                }).catch(error => {
                console.error('Error al cargar el PDF:', error);
            });*/
            /*PDFDocument.load(bytes).then((pdfDoc) => {
                const firstPage = pdfDoc.getPage(0);
            
                const pageSize = [595, 842]; // Tamaño estándar de una página A4 en puntos (unidad de medida de PDF)
            
                const img = new Image();
            
                img.onload=()=>(()=>{
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
            
                canvas.height = pageSize[1];
                canvas.width = pageSize[0];
            
                context.drawImage(img, 0, 0);
            
                const imageData = canvas.toDataURL('image/png');
                console.log('imageData',imageData); // Aquí puedes usar imageData como desees
                document.getElementById('getdata').innerHTML=imageData;
                });
            
                const pdfUrl = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
                img.src = pdfUrl;
                console.log('img',img);
            }).catch(error => {
            console.error('Error al cargar el PDF:', error);
            });*/
            /*const pdfData = Buffer.from(base64PDF, 'base64');//atob(base64PDF);
            console.log('pdfData',pdfData);
            const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
            console.log('pdf',pdf);
            const page = await pdf.getPage(0); // Página a renderizar
            const scale = 1.5; // Escala para ajustar el tamaño de la imagen

            const viewport = page.getViewport({ scale });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context, viewport }).promise;

            // Obtener la imagen como base64
            const imageData = canvas.toDataURL('image/png');
            console.log('imageData',imageData); // Aquí puedes usar imageData como desees*/
        }).catch((error)=>console.log(error));
    }

    const aumentar=()=>setPage(Number(page)+1);
    const reducir=()=>setPage(Number(page)-1);

    const Siguiente=async ()=>{
        aumentar();
        //console.log('dataset',page);
            //console.log('llega a la funcion verdatos');
        await axios.get(endPointsbiblioteca.obtenerpaginabiblioteca.url+`${book}/${Number(page)+1}`/*'9/2'id_libro/numpage*/,{headers:{'Authorization':`Bearer ${token}`}}).then(async (response)=>{
            //console.log(response.data);
            setBase64Pdf(response.data.archivo);

            //document.getElementById('getdata').innerHTML='<iframe src="data:application/pdf;base64,'+response.data.archivo+'" width="100%" height="600px" frameborder="0"></iframe>';
            //document.getElementById('iframedata').setAttribute('src','data:application/pdf;base64,'+response.data.archivo)
            //sessionStorage.setItem('num_book',book);
            sessionStorage.setItem('page',Number(page)+1);
        });
    }
    const Anterior=async ()=>{
        //console.log('llega a la funcion verdatos');
        //setPage(Number(page)-1);
        reducir();
        //setPage(page-1);
        await axios.get(endPointsbiblioteca.obtenerpaginabiblioteca.url+`${book}/${Number(page)-1}`/*'9/2'id_libro/numpage*/,{headers:{'Authorization':`Bearer ${token}`}}).then(async (response)=>{
            //console.log(response.data);
            setBase64Pdf(response.data.archivo);

            //document.getElementById('getdata').innerHTML='<iframe src="data:application/pdf;base64,'+response.data.archivo+'" width="100%" height="600px" frameborder="0"></iframe>';
            //document.getElementById('iframedata').setAttribute('src','data:application/pdf;base64,'+response.data.archivo)
            //setPage(Number(page)-1);
            //sessionStorage.setItem('num_book',book);
            sessionStorage.setItem('page',Number(page)-1);
        });
    }




    console.log('book',book);
    console.log(book);
    console.log('page',page);
    //const [panelControl] = useState(localStorage.getItem('panelControl'));
    useEffect(() => {
      const disableCopy = (e) => {
        e.preventDefault();
        SweetAlertHandler({titulo:'',texto:'¡Copiar está deshabilitado en esta página!',icono:'warning'});
        //alert('¡Copiar está deshabilitado en esta página!');
      };

      const disablesave = (e) => {
        if (e.which==83&&(navigator.userAgent.includes('Mac')?e.metaKey:e.ctrlKey)) {
          e.preventDefault();
          e.stopPropagation();
          SweetAlertHandler({titulo:'',texto:'¡Guardar está deshabilitado en esta página!',icono:'warning'});
          //alert('guardar está deshabilitado en esta página!');
        }
        if (e.which==80&&(navigator.userAgent.includes('Mac')?e.metaKey:e.ctrlKey)) {
          e.preventDefault();
          e.stopPropagation();
          SweetAlertHandler({titulo:'',texto:'¡Imprimir está deshabilitado en esta página!',icono:'warning'});
          //alert('imprimir está deshabilitado en esta página!');
        }
        //alert('¡Copiar está deshabilitado en esta página!');
      };
  
      const disabledermouse=(e)=> {
        e.preventDefault();
          SweetAlertHandler({titulo:'',texto:'¡La función clic derecho está deshabilitada en esta página!',icono:'warning'});
          //alert('¡La función clic derecho está deshabilitada!');
      };

      document.addEventListener('copy', disableCopy);
      document.addEventListener('keydown', disablesave,false);
      document.addEventListener('contextmenu', disabledermouse);
      //document.addEventListener('mousedown', disableCopy);
  
      return () => {
        document.removeEventListener('copy', disableCopy);
        document.removeEventListener('keydown', disablesave);
        document.removeEventListener('contextmenu', disabledermouse);
    };
    }, []);

    //document.getElementById('getdata').innerHTML='<iframe src="data:application/pdf;base64,'+val+'" width="100%" height="600px" frameborder="0"></iframe>';
 
    return (<>
      {/*panelControl==='1'?<NavBar1/>:panelControl==='2'?<Navbar2/>:panelControl==='3'?<NavBar3/>:<Navbar/>*/}

      {token===null?<div>{/*<Link to="/login">Iniciar Sesion</Link>*/}<Navigate to="/login" /></div>:
      <Navbar>
        <div style={{display:'flex',flexDirection:'row'}}>
                <div style={{width:'30%'}}>
                    <div style={{display:"flex",flexDirection:"row",paddingLeft:'10px'}}>
                      {Object.keys(databook).length>0?<img style={{width:'100%'}} src={databook.portada} alt="image"/>:''}
                        
                    </div>
                      
                    <div style={{display:"flex",flexDirection:"row",paddingLeft:'10px'}}>

                    </div>
                </div>
                <div style={{width:'70%'}}>
                  {databook!=[]?<>
                  <h5>{databook.categoria}</h5>
                  <h6>{databook.estado}</h6>
                  {Object.keys(databook).length>0?<h3 style={{textAlign:"center"}}>{databook.titulo}</h3>:<><button  className="btn btn-outline-success" style={{marginTop:'5%',marginLeft:'48%',width:'5%'}} id="verdatos" onClick={verDatos} >Ver</button><br/><marquee>Presione en Ver para cargar los detalles del documento</marquee></>}
                  <p>{databook.autor}</p>
                  {databook.isbn?<p>codigo: {databook.isbn}</p>:''}
                  <center>
                    {databook.tipo!=='digital'?databook.estado?<>{tipo!=='admin'?databook.estado==='disponible'?<>
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
                    </div></>:<>no disponible para reservas<br/></>:''}</>:'':''}
                    <button className="btn btn-outline-info" onClick={()=>{setShowpage(1)}}>Detalles</button>
                    {databook.tipo!=='fisico'?<button  className="btn btn-outline-secondary" onClick={()=>{setShowpage(2);setShowdocs(true);}}>Archivo</button>:''}
                  </center>
                  {showpage===1?
                  <div style={{border:'2px solid blue',padding:'3rem',backgroundColor:'white'}}>
                    <h5>Detalles del Documento</h5>
                    {Object.keys(databook).length>0?biblioteca_formdata.map(({datalabel,dataname})=>dataname!=='file'&&dataname!=='fileportada'?<>{datalabel}:{databook[dataname]}<br/></>:''):''}
                  </div>:''}
                  {showpage===2?
                  <div style={{border:'2px solid blue',padding:'3rem',backgroundColor:'white'}}>
                    {showdocs===true?<div>
                      {databook.tipo!=='fisico'?<div>
                        {base64Pdf!==''?<center><PdfViewer base64Pdf={base64Pdf} /></center>:''}{/*<iframe hidden id="iframedata" width="100%" height="600px"></iframe>*/}
                        {page>1?<button className="btn btn-outline-primary" onClick={Anterior}>anterior</button>:''}
                        {page<lim?<button className="btn btn-outline-primary" onClick={Siguiente}>siguiente</button> :''}
                      </div>:''}
                    </div>:''}
                  </div>:''}
                  </>:''}


                  {/*JSON.stringify(databook).replaceAll(',',', ')*/}

                </div>
            </div>
        
        
      
        
        
      </Navbar>
    }
    
    

    </>
    );
}
 

export default VerLibro;