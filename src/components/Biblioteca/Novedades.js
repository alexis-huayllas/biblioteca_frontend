//Filename - components/ListBiblioteca.js 
import SweetAlertHandler from '../Alerta/Sweetalerthandler';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Tables from "../Table/Tables";
//import RowClickHandler from "../../handler/RowClickHandler";
import axios from "axios";
import Menu from "../Menu/Menu";
import { Button, Table } from "react-bootstrap";
import MiModalreact from "../Modales/Modalreact";
import Navbar from "../Menu/Navbar";
import VerLibro from "./VerLibro";
import { endPointsbiblioteca } from "../../constantes/endpoints";
import { biblioteca_tabledata } from "../../constantes/values";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ListRow from '../Table/ListRow';
import NavBar1 from '../navbarprueba/navbar1/NavBar1';

function Novedades(){

    const [token] = useState(localStorage.getItem('token'));
    const [tipo] = useState(localStorage.getItem('type'));
    const [listado, setListado] = useState([]);
    
    let history = useNavigate();
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
        
        <div style={{height:'100%'}}>
            {/*<Menu/>*/}
            <NavBar1/>
            <div style={{ margin: "5rem" }}>
            {/*<Link className="d-grid gap-2" to="/">
                <Button variant="primary" size="lg">
                    Inicio
                </Button>
            </Link>*/}
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
            
            <h3>Documentos nuevos añadidos</h3>
            <>{listado.last?listado.last.map((dato,m)=><>{/*<div style={{display:'flex',flexDirection:'row',marginBottom:'10px',padding:'10px',border:'1px solid #ccc',borderRadius:'5px'}}>
              <div style={{width:'10%',display:'inline-flex'}}><h1 style={{margin:'auto'}}>{(m+1)}</h1></div>
              <div style={{width:'80%',display:'inline-grid'}}> {biblioteca_tabledata.map(({bodydatatable})=>bodydatatable!=='cantidad'?<>{bodydatatable}:{dato[bodydatatable]}<br/></>:'' )}</div>
              <div style={{width:'10%',display:'inline-grid'}}>{ token===null?<button className='btn btn-outline-success' style={{margin:'auto'}} onClick={()=>SweetAlertHandler({titulo:'',texto:'Debe iniciar sesion para poder continuar...',icono:'info'})}>Ver</button>:<a style={{margin:'auto'}} href='/verlibro' onMouseDown={()=>{localStorage.setItem('num_book',dato.id);localStorage.setItem('titulo',dato.titulo);}} className='btn btn-outline-success' >ver</a>}</div></div>*/}
              <ListRow numero={m+1} item={dato} handleRowClick={RowClickHandler} cols={biblioteca_tabledata} key={dato.id} />
              </>):
              <div style={{width:'100%',display:'inline-grid'}}>no hay datos para mostrar</div>}</>


              <h3>Documentos mas antiguos</h3>
            <>{listado.first?listado.first.map((dato,m)=><>{/*<div style={{display:'flex',flexDirection:'row',marginBottom:'10px',padding:'10px',border:'1px solid #ccc',borderRadius:'5px'}}>
              <div style={{width:'10%',display:'inline-flex'}}><h1 style={{margin:'auto'}}>{(m+1)}</h1></div>
              <div style={{width:'80%',display:'inline-grid'}}> {biblioteca_tabledata.map(({bodydatatable})=>bodydatatable!=='cantidad'?<>{bodydatatable}:{dato[bodydatatable]}<br/></>:'' )}</div>
              <div style={{width:'10%',display:'inline-grid'}}>{ token===null?<button className='btn btn-outline-success' style={{margin:'auto'}} onClick={()=>SweetAlertHandler({titulo:'',texto:'Debe iniciar sesion para poder continuar...',icono:'info'})}>Ver</button>:<a style={{margin:'auto'}} href='/verlibro' onMouseDown={()=>{localStorage.setItem('num_book',dato.id);localStorage.setItem('titulo',dato.titulo);}} className='btn btn-outline-success' >ver</a>}</div></div>*/}
              <ListRow numero={m+1} item={dato} handleRowClick={RowClickHandler} cols={biblioteca_tabledata} key={dato.id} />
              </>):
              <div style={{width:'100%',display:'inline-grid'}}>no hay datos para mostrar</div>}</>
            

        </div>
        </div>
        </>
    );
} 
export default Novedades;