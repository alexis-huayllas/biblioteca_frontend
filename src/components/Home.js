//Filename - components/Home.js
 
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Navigate, Link } from "react-router-dom";
//import { PDFDocument } from 'pdf-lib';

import CarouselSlick from "./Carrusel/CarruselSlick";
import NavBar3 from "./navbarprueba/navbar3/NavBar3";
import Navbar2 from "./navbarprueba/navbar2/Navbar2";
import NavBar1 from "./navbarprueba/navbar1/NavBar1";
import { endPointsbiblioteca, endPointsprestamo } from "../constantes/endpoints";
import axios from "axios";
import ModalProfile from "./Modales/ModalProfile";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ListRowmenu from './Table/ListRowmenu';
import { biblioteca_tabledata } from "../constantes/values";
import SweetAlertHandler from "./Alerta/Sweetalerthandler";
import BoxRow from "./Table/BoxRow";
import Navbar from "./Navbar/Navbar";
import { FaSearch } from "react-icons/fa";


function Home() {
    let history = useNavigate();

    
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [dataportada, setDataportada] = useState([]);
    //const [panelControl] = useState(localStorage.getItem('panelControl'));

    /*useEffect(()=>{
        const ListData = async () => {
            try {
              const response = await axios.get(endPointsprestamo.portada.url); // Reemplaza con la URL de tu API
              setDataportada(response.data);
              console.log('response',response.data)
            } catch (error) {
              console.log('Error al cargar datos:', error);
            }
          };
          ListData();
    },[])*/
    //const [datapruebas, setDatapruebas] = useState(dataprueba);

    /*const handleRowClickDelete = (id) => {
        const updatedData = datapruebas.filter(item => item.id !== id);
        setDatapruebas(updatedData);
    };*/
    
    //axios.get(endPointsbiblioteca.obtenerpaginabiblioteca.url+'9/2'/*id_libro/numpage*/).then(async (response)=>{
        //console.log(response.data);
        //document.getElementById('getdata').innerHTML='<iframe src="data:application/pdf;base64,'+response.data.archivo+'" width="100%" height="600px" frameborder="0"></iframe>';
    //    document.getElementById('iframedata').removeAttribute('hidden');
    //    document.getElementById('iframedata').setAttribute('src','data:application/pdf;base64,'+response.data.archivo)
        
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
    //});

    //document.getElementById('getdata').innerHTML='<iframe src="data:application/pdf;base64,'+val+'" width="100%" height="600px" frameborder="0"></iframe>';
 
    // You may skip this part if you're
    // using react-context api or redux
    /*function setID(id, name, age) {
        localStorage.setItem("id", id);
        localStorage.setItem("Name", name);
        localStorage.setItem("Age", age);
    }*/
 
    // Deleted function - functionality
    // for deleting the entry
    /*function deleted(id) {
        let index = array.map(function (e) {return e.id;}).indexOf(id);
        // deleting the entry with index
        array.splice(index, 1);
        // We need to re-render the page for getting
        // the results so redirect to same page.
        history("/");
    }*/
    
    const actualizartoken=()=>{
        setToken(localStorage.getItem('token'));
        window.location.reload();
      }
    const [tipo] = useState(localStorage.getItem('type'));
    const [listado, setListado] = useState([]);
    
    const MySweetAlert = withReactContent(Swal);

    useEffect(()=>{
        const ListData = async () => {
            try {
              const response = await axios.get(endPointsbiblioteca.tomarbiblioteca.url); // Reemplaza con la URL de tu API
              setListado(response.data);
              console.log('response',response.data)
            } catch (error) {
              console.log('Error al cargar datos:', error);
            }
          };
          ListData();
    },[])

    const Ordenar = async () => {
      try {
        let value=document.getElementById('orden').value;
        console.log('response',value)
        const response = await axios.get(endPointsbiblioteca.obtenerpaginabibliotecaordenada.url+value+'/data'); // Reemplaza con la URL de tu API
        setListado(response.data);
        //console.log('response',response.data)
      } catch (error) {
        console.log('Error al cargar datos:', error);
      }
    };
    
    const BuscarDato = async () => {
        try {
          let value=document.getElementById('searchdata').value;
          let orderdata=document.getElementById('orderdata').value;
          if (value!=='') {
            const response = await axios.post(endPointsbiblioteca.buscarbiblioteca.url,{buscar:value,orden:orderdata}); // Reemplaza con la URL de tu API
            console.log(response);
            setListado(response.data.data);
          } else {
            SweetAlertHandler({titulo:'',texto:'Ingrese un dato',icono:'info'});
          }
          
          //console.log('response',response.data)
        } catch (error) {
          console.log('Error al cargar datos:', error);
        }
      };

    const RowClickHandler = (data)=>{
      console.log('rowclickhandler'+data);
    }
    
 
    return (<>
        { token===null?<div><Navigate to="/login" />{/*<Link to="/login">Iniciar Sesion</Link>*/}</div>:
        <>
        <Navbar>
            <div style={{display:'flex',flexDirection:'row'}}>
                <div style={{width:'30%',backgroundColor:"red"}}>
                    <div style={{display:"flex",flexDirection:"row",paddingLeft:'10px'}}>
                    <div style={{width:'70%',position:'relative'}}><div style={{padding:'4px',position:'absolute',boxSizing:'border-box',top:'40%',right:'1%',transform:'translateY(-50%)'}}><FaSearch /></div>
                        <input style={{width:'100%',boxSizing:'border-box',paddingRight:'1.5rem'}} /></div><button style={{width:'30%'}}>Buscar</button>
                    </div>
                </div>
                <div style={{width:'70%',backgroundColor:"cyan"}}></div>
            </div>
            <div style={{width:'100%',backgroundColor:"gray",padding:'10px'}}>{tipo==='superuser'?<Navigate to="/listusuario" />:tipo==='admin'?<Navigate to="/listreserva" />:<Navigate to="/listbiblioteca" />} </div>
        </Navbar>

            {/*panelControl==='1'?<NavBar1/>:panelControl==='2'?<Navbar2/>:panelControl==='3'?<NavBar3/>:<Navbar/>*/}
            {/*<div style={{display:"flex",flexDirection:"row",backgroundColor:"black",color:'white'}}>
            <div style={{width:'20%',padding:'2em'}}>
                <img style={{width:'70%',margin:'auto'}} src="backg.png" />
            </div>
            <div style={{width:'60%',padding:'2em'}}>
                <h1 style={{textAlign:"center"}}>Biblioteca Virtual de la Carrera de Arquitectura 2024</h1>
            </div>
            <div style={{width:'20%',padding:'2em'}}>
                <ModalProfile estado={actualizartoken} />
            </div>
            </div>
            <div style={{ margin: "5rem" }}>
                <div id='order' style={{border:'1px solid red'}}><h3>Todos los libros</h3>Ordenar por:<select id='orden' onChange={Ordenar}>
                <option value={'titulo'} selected>Titulo</option>
                <option value={'autor'}>Autor</option>
                <option value={'palabras_clave'}>Palabras Clave</option>
                </select></div>
                <div style={{border:'1px solid red'}}>
                    Buscar Libro: <input type='text' id='searchdata' placeholder='ingrese titulo/autor/palabras clave'/>
                    <select id='orderdata' >
                    <option value={'titulo'} selected>Titulo</option>
                    <option value={'autor'}>Autor</option>
                    <option value={'palabras_clave'}>Palabras Clave</option>
                    </select>
                    <button className='w-25 btn btn-outline-info' onClick={BuscarDato}>Buscar</button>
                </div>
                {listado.last?<h3>Documentos nuevos añadidos</h3>:<h3>Resultados de la busqueda</h3>}
                {listado.last?listado.last.map((dato,m)=><>
                <BoxRow numero={m+1} item={dato} handleRowClick={RowClickHandler} cols={biblioteca_tabledata} key={dato.id} />
                </>):listado?listado.map((dato,m)=><>
                <ListRowmenu numero={m+1} item={dato} handleRowClick={RowClickHandler} cols={biblioteca_tabledata} key={dato.id} />
                </>):
                <div style={{width:'100%',display:'inline-grid'}}>no hay datos para mostrar</div>}
                {listado.first?<><h3>Documentos mas antiguos</h3>
                {listado.first?listado.first.map((dato,m)=><>
                <BoxRow numero={m+1} item={dato} handleRowClick={RowClickHandler} cols={biblioteca_tabledata} key={dato.id} />
                </>):
                <div style={{width:'100%',display:'inline-grid'}}>no hay datos para mostrar</div>}</>:''}
            </div>*/}
            {/*<CarouselSlick/>
            <div style={{marginTop:'2rem',backgroundColor:"black",color:'white',padding:'3em'}}>
            <p>La biblioteca tiene como función principal facilitar el acceso a los recursos de información, promover su difusión y colaborar en los procesos de creación del conocimiento a fin de contribuir al cumplimiento de la misión y visión de la institución.</p>
<h5>Misión: </h5><p>Es propósito es contribuir a la formación de personas con la capacidad moral e intelectual necesarias para participar en forma importante en el mejoramiento económico, social y cultural del país, promoviendo sistemáticamente: La formación del carácter, la formación cultural general y la formación científica.</p>

            </div>
            <div style={{marginTop:'2rem',display:"flex",flexDirection:"row",backgroundColor:"black",color:'white'}}>
            <div style={{width:'50%',padding:'2em'}}>
            <h4>Objetivos de la biblioteca</h4>
            <ol>
            <li>Satisfacer las demandas de apoyo documental de los estudiantes y académicos en las áreas de docencia, investigación y difusión.</li>
            <li>Proporcionar servicios de información documental, así como difusión sobre los acervos que la integran.</li>
            <li>Conservar, proteger y actualizar de manera permanente su acervo bibliográfico, audiovisual, tecnologías de la información, comunicación e infraestructura general.</li>
            <li>Organizar sistemáticamente los servicios y propiciar su interrelación con otras bibliotecas para interactuar de manera integral al interior de la universidad.</li>

            </ol>
            </div>
            <div style={{width:'50%'}}>
                <div style={{display:"flex",flexDirection:"column",paddingTop:'2em'}}>
                    <div style={{display:"flex",flexDirection:"row",borderBottom:'2px solid cyan'}}><p style={{width:'80%'}}>Prestamos al año</p><b>+{dataportada.prestamos}</b></div>
                    <div style={{display:"flex",flexDirection:"row",borderBottom:'2px solid cyan'}}><p style={{width:'80%'}}>Usuarios Registrados</p><b>+{dataportada.users}</b></div>
                    <div style={{display:"flex",flexDirection:"row",borderBottom:'2px solid cyan'}}><p style={{width:'80%'}}>Libros Digitales Registrados</p><b>+{dataportada.libros}</b></div>
                </div>
            </div>
            </div>
            <div style={{marginTop:'2rem',backgroundColor:"black",color:'white',padding:'2em',textAlign:"center"}}>
                <blockquote style={{textAlign:"justify",paddingLeft:'2em'}}>
                Ciudadela Universitaria<br/>
                "BIBLIOTECA DE ARQUITECTURA"<br/>

                Servicios Bibliotecarios<br/>
                Teléfono: <br/>
                Correo: <br/>
                </blockquote>
            <p>Puede contactarnos a traves de nuestras redes sociales</p>
            <a href="#">Facebook,Instagram, Twitter</a>
            </div>*/}
            {/*<Link className="d-grid gap-2" to="/">
                <Button variant="primary" size="lg">
                    Inicio
                </Button>
            </Link>
            <Link className="d-grid gap-2" to="/home">
                <Button variant="danger" size="lg" onClick={()=>{localStorage.removeItem('token');setToken(localStorage.getItem('token'))}}>
                    Cerrar Sesion
                </Button>
            </Link>*/}

            {/*<Tables data={datapruebas} handleRowClick={handleRowClickDelete} />
            <Tables data={dataprueba} handleRowClick={RowClickHandler} />*/}

            {/*<Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Views</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {array.map((item) => {
                        return (
                            <tr><td>{item.Name}</td><td>{item.Age}</td>
                                <td><Link to={`/edit`}>
                                        <Button onClick={(e) => setID(item.id,item.Name,item.Age)} variant="info">
                                            Update
                                        </Button>
                                    </Link>
                                </td>

                                <td>
                                    <Button onClick={(e) => deleted(item.id) } variant="danger">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>*/}
 
            {/* Button for redirecting to create page for
                insertion of values */}
            {/*<Link className="d-grid gap-2" to="/create">
                <Button variant="warning" size="lg">
                    Create
                </Button>
            </Link>
            <Link className="d-grid gap-2" to="/createbiblioteca">
                <Button variant="warning" size="lg">
                    Create Libro
                </Button>
            </Link>*/}
            
        </>
    }
    {/*<div id="getdata"></div>*/}
    {/*<div><iframe hidden id="iframedata" width="100%" height="600px"></iframe></div>*/}
    

    </>
    );
}
 

export default Home;
