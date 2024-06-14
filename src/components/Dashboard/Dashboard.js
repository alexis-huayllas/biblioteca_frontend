//Filename - components/Dashboard.js
 
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Navigate } from "react-router-dom";
import Menu from "../Menu/Menu";
import Carousel from "../Carrusel/Carrusel";
import CarouselSlick from "../Carrusel/CarruselSlick";
import Navbar from "../Menu/Navbar";
import Navbar2 from "../navbarprueba/navbar2/Navbar2";
import axios from "axios";
import NavBar1 from "../navbarprueba/navbar1/NavBar1";
import BoxRow from "../Table/BoxRow";
import ListRowmenu from "../Table/ListRowmenu";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SweetAlertHandler from "../Alerta/Sweetalerthandler";
import { biblioteca_tabledata } from "../../constantes/values";
import { endPointsbiblioteca, endPointsprestamo, endPointsvisualizaciones } from "../../constantes/endpoints";
import { FaSearch } from "react-icons/fa";

function Dashboard() {

    const [dataportada, setDataportada] = useState([]);

    /*useEffect(()=>{
        const ListData = async () => {
            try {
              const response = await axios.get(endPointsprestamo.portada.url); // Reemplaza con la URL de tu API
              setDataportada(response.data);
              //console.log('response',response.data)
            } catch (error) {
              console.log('Error al cargar datos:', 'error');
            }
          };
          ListData();
    },[])*/

    const [listado, setListado] = useState([]);
    const [vistas, setVistas] = useState(0);
    const [listadooriginal, setListadooriginal] = useState([]);
    const [listadotake, setListadotake] = useState([]);
    
    const MySweetAlert = withReactContent(Swal);

    useEffect(()=>{
        const ListData = async () => {
            try {
              const response = await axios.get(endPointsbiblioteca.tomarbiblioteca.url); // Reemplaza con la URL de tu API
              setListado(response.data);
              setListadotake(response.data);
              console.log('response',response.data)
            } catch (error) {
              console.log('Error al cargar datos:', error);
            }
            try {
              const response = await axios.get(endPointsbiblioteca.listabiblioteca.url); // Reemplaza con la URL de tu API
              setListadooriginal(response.data);
              console.log('response',response.data)
            } catch (error) {
              console.log('Error al cargar datos:', error);
            }
            try {
              const response = await axios.get(endPointsprestamo.portada.url); // Reemplaza con la URL de tu API
              setDataportada(response.data);
              //console.log('response',response.data)
            } catch (error) {
              console.log('Error al cargar datos:', 'error');
            }
            /*try {
              const responsedata = await axios.post(endPointsvisualizaciones.registrar.url,{numero_vistas:1}); // Reemplaza con la URL de tu API
              setVistas(responsedata.data[0].numero_vistas);
              console.log('responsedata',responsedata.data)
            } catch (error) {
              console.log('Error al cargar datos:', error);
            }*/
            await axios.post(endPointsvisualizaciones.registrar.url,{numero_vistas:1}).then((response)=>{console.log(response.data);setVistas(response.data[0].numero_vistas)});
            //setVistas(vistas+1);
            
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
          let orderdata='titulo';//document.getElementById('orderdata').value;
          if (value!=='') {
            const response = await axios.post(endPointsbiblioteca.buscarbiblioteca.url,{buscar:value,orden:orderdata}); // Reemplaza con la URL de tu API
            console.log(response);
            setListado(response.data.data);
          } else {
            setListado(listadotake);
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
  
    const modalidades=[{name:'Trabajo Dirigido',value:'trabajo'},{name:'Proyecto de grado',value:'proyecto'},{name:'Tesis de Grado',value:'tesis'},{name:'Auxiliar de Investigacion',value:'auxiliar'},{name:'Proyecto de Investigacion',value:'proyectoinvestigacion'}];
    return (
        localStorage.getItem('token')!==null? <Navigate to="/home" />:
        <div style={{backgroundImage:"url('/back1.jpg')",backgroundRepeat:"no-repeat",backgroundSize:'cover',color:"white"}}>
            {/*<Menu />
            <NavBar1 />*/}
            {/*<Link className="d-grid gap-2" to="/">
                <Button variant="primary" size="lg">
                    Inicio
                </Button>
            </Link>
 
            <Link className="d-grid gap-2" to="/login">
                <Button variant="primary" size="lg">
                    Iniciar sesion
                </Button>
            </Link>*/}
            <div style={{/*marginTop:'2rem',*/display:"flex",flexDirection:"row",color:'white'}}>
            <div style={{width:'20%',padding:'2em'}}>
                <img style={{width:'70%',margin:'auto'}} src="backg.png" />
            </div>
            <div style={{width:'60%',padding:'2em'}}>
                <h1 style={{textAlign:"center"}}>Biblioteca Virtual de la Carrera de Arquitectura</h1>
            </div>
            <div style={{width:'20%',padding:'2em'}}>
                <Link className="btn btn-outline-info" to={'/login'}>Iniciar sesion</Link>
            </div>
            </div>
            <div style={{ margin: "5rem" }}>
                {/*<div id='order' style={{border:'1px solid red'}}><h3  style={{textAlign:"center"}}>Todos los libros</h3>Ordenar por:<select id='orden' onChange={Ordenar}>
                <option value={'titulo'} selected>Titulo</option>
                <option value={'autor'}>Autor</option>
                <option value={'palabras_clave'}>Palabras Clave</option>
          </select></div>*/}
                <div style={{ display:"flex",flexDirection:"row"}}>
                    {/*Buscar Libro: */}<div style={{width:'100%',position:'relative'}}>
                    <div style={{padding:'4px',position:'absolute',boxSizing:'border-box',top:'50%',right:'1%',transform:'translateY(-50%)'}}><FaSearch color="black" /></div>
                    <input type='text' style={{width:'100%',boxSizing:'border-box',paddingRight:'1.5rem'}} className="form-control" id='searchdata' onChange={BuscarDato} placeholder='ingrese titulo/autor/palabras clave'/>
                    </div>
                    {/*<select id='orderdata' >
                        <option value={'titulo'} selected>Titulo</option>
                        <option value={'autor'}>Autor</option>
                        <option value={'palabras_clave'}>Palabras Clave</option>
                    </select>
                    <button className='w-25 btn btn-outline-dark' onClick={BuscarDato}>Buscar</button>*/}
                </div>
                <div style={{border:'1px solid #ccc'}}>
            <label className="w-100" style={{display:"flex",flexDirection:"row"}} form="selectdata"><div>Buscar en:</div> <select name="selectdata" style={{marginLeft:'15px',width:'25%'}} className="form-control" onChange={({target})=>{if(target.value==='ultimos'){setListado(listadotake);} else if(target.value==='todos'){setListado(listadooriginal);}else{let data=/*alert(target.value)*/listadooriginal.filter((dato)=>dato.modalidad===`${target.value}`?true:false);setListado(data);}}}>
              <option selected disabled value={''}>{'Seleccione'}</option>
              {/*<option value={'todos'}>{'Todos'}</option>*/}
              {modalidades.map(({name,value})=><option value={value}>{name}</option>)}
              <option value={''}>{'Libros'}</option>
              {/*<option value={'ultimos'}>{'Ultimos añadidos'}</option>*/}
            </select></label></div>
                    <h4 style={{textAlign:"center"}}>Total de publicaciones: {listadooriginal.length}</h4>
                {listado.last?<h3 style={{textAlign:"center"}}>Ultimas Publicaciones</h3>:<h3  style={{textAlign:"center"}}>Resultados de la busqueda</h3>}
                <>{listado.last?listado.last.map((dato,m)=><>{/*<div style={{display:'flex',flexDirection:'row',marginBottom:'10px',padding:'10px',border:'1px solid #ccc',borderRadius:'5px'}}>
                <div style={{width:'10%',display:'inline-flex'}}><h1 style={{margin:'auto'}}>{(m+1)}</h1></div>
                <div style={{width:'80%',display:'inline-grid'}}> {biblioteca_tabledata.map(({bodydatatable})=>bodydatatable!=='cantidad'?<>{bodydatatable}:{dato[bodydatatable]}<br/></>:'' )}</div>
                <div style={{width:'10%',display:'inline-grid'}}>{ token===null?<button className='btn btn-outline-success' style={{margin:'auto'}} onClick={()=>SweetAlertHandler({titulo:'',texto:'Debe iniciar sesion para poder continuar...',icono:'info'})}>Ver</button>:<a style={{margin:'auto'}} href='/verlibro' onMouseDown={()=>{localStorage.setItem('num_book',dato.id);localStorage.setItem('titulo',dato.titulo);}} className='btn btn-outline-success' >ver</a>}</div></div>*/}
                <BoxRow numero={m+1} item={dato} handleRowClick={RowClickHandler} cols={biblioteca_tabledata} key={dato.id} />
                </>):listado?listado.map((dato,m)=><>{/*<div style={{display:'flex',flexDirection:'row',marginBottom:'10px',padding:'10px',border:'1px solid #ccc',borderRadius:'5px'}}>
                <div style={{width:'10%',display:'inline-flex'}}><h1 style={{margin:'auto'}}>{(m+1)}</h1></div>
                <div style={{width:'80%',display:'inline-grid'}}> {biblioteca_tabledata.map(({bodydatatable})=>bodydatatable!=='cantidad'?<>{bodydatatable}:{dato[bodydatatable]}<br/></>:'' )}</div>
                <div style={{width:'10%',display:'inline-grid'}}>{ token===null?<button className='btn btn-outline-success' style={{margin:'auto'}} onClick={()=>SweetAlertHandler({titulo:'',texto:'Debe iniciar sesion para poder continuar...',icono:'info'})}>Ver</button>:<a style={{margin:'auto'}} href='/verlibro' onMouseDown={()=>{localStorage.setItem('num_book',dato.id);localStorage.setItem('titulo',dato.titulo);}} className='btn btn-outline-success' >ver</a>}</div></div>*/}
                <BoxRow numero={m+1} item={dato} handleRowClick={RowClickHandler} cols={biblioteca_tabledata} key={dato.id} />
                </>):
                <div style={{width:'100%',display:'inline-grid'}}>no hay datos para mostrar</div>}</>
                {listado.first?<><h3  style={{textAlign:"center"}}>Primeras Publicaciones</h3>
                <>{listado.first?listado.first.map((dato,m)=><>{/*<div style={{display:'flex',flexDirection:'row',marginBottom:'10px',padding:'10px',border:'1px solid #ccc',borderRadius:'5px'}}>
                <div style={{width:'10%',display:'inline-flex'}}><h1 style={{margin:'auto'}}>{(m+1)}</h1></div>
                <div style={{width:'80%',display:'inline-grid'}}> {biblioteca_tabledata.map(({bodydatatable})=>bodydatatable!=='cantidad'?<>{bodydatatable}:{dato[bodydatatable]}<br/></>:'' )}</div>
                <div style={{width:'10%',display:'inline-grid'}}>{ token===null?<button className='btn btn-outline-success' style={{margin:'auto'}} onClick={()=>SweetAlertHandler({titulo:'',texto:'Debe iniciar sesion para poder continuar...',icono:'info'})}>Ver</button>:<a style={{margin:'auto'}} href='/verlibro' onMouseDown={()=>{localStorage.setItem('num_book',dato.id);localStorage.setItem('titulo',dato.titulo);}} className='btn btn-outline-success' >ver</a>}</div></div>*/}
                <BoxRow numero={m+1} item={dato} handleRowClick={RowClickHandler} cols={biblioteca_tabledata} key={dato.id} />
                </>):
                <div style={{width:'100%',display:'inline-grid'}}>no hay datos para mostrar</div>}</></>:''}
            </div>

            <div style={{marginTop:'2rem',display:"flex",flexDirection:"row",backgroundColor:"black",color:'white'}}>
            <div style={{width:'50%',padding:'2em'}}>
            {/*<h4>Objetivos de la biblioteca</h4>
            <ol>
            <li>Satisfacer las demandas de apoyo documental de los estudiantes y académicos en las áreas de docencia, investigación y difusión.</li>
            <li>Proporcionar servicios de información documental, así como difusión sobre los acervos que la integran.</li>
            <li>Conservar, proteger y actualizar de manera permanente su acervo bibliográfico, audiovisual, tecnologías de la información, comunicación e infraestructura general.</li>
            <li>Organizar sistemáticamente los servicios y propiciar su interrelación con otras bibliotecas para interactuar de manera integral al interior de la universidad.</li>

              </ol>*/}
            </div>
            <div style={{width:'50%'}}>
                <div style={{display:"flex",flexDirection:"column",paddingTop:'2em'}}>
                    <div style={{display:"flex",flexDirection:"row",borderBottom:'2px solid cyan'}}><p style={{width:'80%'}}>Prestamos al año</p><b>+{dataportada.prestamos}</b></div>
                    <div style={{display:"flex",flexDirection:"row",borderBottom:'2px solid cyan'}}><p style={{width:'80%'}}>Usuarios Registrados</p><b>+{dataportada.users}</b></div>
                    <div style={{display:"flex",flexDirection:"row",borderBottom:'2px solid cyan'}}><p style={{width:'80%'}}>Libros Digitales Registrados</p><b>+{dataportada.libros}</b></div>
                </div>
            </div>
            </div>
            
            <footer style={{textAlign:"right"}}>
                <b>{vistas} Total de visitas</b>
            </footer>
            {/*<div style={{marginTop:'2rem',display:"flex",flexDirection:"row",backgroundColor:"transparent",color:'white'}}>
            <div style={{width:'20%',padding:'2em'}}>
                <img style={{width:'70%',margin:'auto'}} src="backg.png" />
            </div>
            <div style={{width:'60%',padding:'2em'}}>
                <h1 style={{textAlign:"center"}}>Biblioteca Virtual de la Carrera de Arquitectura 2024</h1>
            </div>
            <div style={{width:'20%',padding:'2em'}}>
               <Link className="btn btn-outline-primary m-auto" to={'/login'}>Iniciar Sesion</Link> 
            </div>
            </div>
            <CarouselSlick/>
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
        </div>
    );
}
 

export default Dashboard;
