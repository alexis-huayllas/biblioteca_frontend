import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
//import './Navbar.css';
import ModalProfile from '../Modales/ModalProfile';
import { FaBell, FaRegBell } from 'react-icons/fa';
import io from 'socket.io-client';
import Modalnotificacion from '../Modales/Modalnotificacion';
import { endPointsprestamo } from '../../constantes/endpoints';
import axios from "axios";

const Navbar = ({children}) => {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [tipo] = useState(localStorage.getItem('type'));


  const [adminMessages, setAdminMessages] = useState([]);
  const [adminReply, setAdminReply] = useState([]);
  const socket = io('http://localhost:3008');

  useEffect(() => {
    const listado=async ()=>{
      try {
        const response = await axios.get(endPointsprestamo.perfiles.url,{headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}}); // Reemplaza con la URL de tu API
        if(tipo==='user'||tipo==='externo'){
          if (adminReply.length>0) {
            setAdminReply(adminReply.concat(response.data.alertas));
          } else {
            setAdminReply(response.data.alertas);
          }
        }else{
          if (adminMessages.length>0) {
            setAdminMessages(adminMessages.concat(response.data.alertas));
          } else {
            setAdminMessages(response.data.alertas);
          }
        }
          console.log('response',response.data)
      } catch (error) {
          console.log('Error al cargar datos:', error);
      }
    }
    listado();

    if(tipo==='user'||tipo==='externo'){
      socket.on('userReply', (message) => {
        console.log('message', message);
        setAdminReply((prevMessages) => [...prevMessages, message]);
      });
    }else{
      socket.on('adminMessage', (message) => {
        //console.log('adminmessage run');
        console.log('message', message);
        setAdminMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    /*return () => {
      socket.disconnect();
    };*/
  }, []);



  


  const actualizartoken=()=>{
    setToken(localStorage.getItem('token'));
    window.location.reload();
  }

  return (
    <><div style={{backgroundColor:'blue',display:'flex',flexDirection:'row'}}>
        <div style={{width:'30%',color:'white', paddingLeft:'10px'}}>
            {tipo==='superuser'?<>
                <ul style={{flexDirection:'row'}} className="navbar-nav nav">
                    {/*<li className="nav-item"><Link to="/" className='nav-link'>Inicio</Link></li>*/}
                    {/*<li className='nav-item'><Link className="nav-link" to="/listbiblioteca">Catalogo</Link></li>*/}
                    <li className="nav-item"><Link className="nav-link" to="/listusuario">Usuarios</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/listbitacora">Bitacora</Link></li>
                </ul>
            </>
            :tipo==='admin'?<>
                <ul style={{flexDirection:'row'}} className="navbar-nav nav">
                    <li className='nav-item'><Link className="nav-link" to="/listbiblioteca">Catalogo</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/listreserva">Reservas</Link></li>
                    <li className='nav-item'><Link className="nav-link" to="/listprestamo">Prestamos</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/listdevolucion">Devoluciones</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/listsancion">Sanciones</Link></li>

                </ul>
            </>
            :tipo==='user'?<>
                <ul style={{flexDirection:'row'}} className="navbar-nav nav">
                    <li className="nav-item"><Link to="/" className='nav-link'>Inicio</Link></li>
                    <li className='nav-item'><Link className="nav-link" to="/listbiblioteca">Catalogo</Link></li>
                </ul>
            </>
            :<>
                <ul style={{flexDirection:'row'}} className="navbar-nav nav">
                    <li className="nav-item"><Link to="/" className='nav-link'>Inicio</Link></li>
                    <li className='nav-item'><Link className="nav-link" to="/listbiblioteca">Catalogo</Link></li>
                </ul>
            </>}            
        </div>
        <div style={{width:'50%'}}></div>
        <div style={{width:'20%',display:'flex',flexDirection:'row'}}><a style={{textDecoration:'none',width:'50%',alignItems:'center'}} href="/">
        <h1><img style={{width:'60px',borderRadius:'50px'}} src={'backg.png'} /></h1>
        </a>
        <div style={{width:'50%',display:'flex',flexDirection:'row'}}><div style={{width:'40%'}}><span style={{width:'100%',display:'flex',flexDirection:'row',color:'whitesmoke',paddingTop:'10%'}}><Modalnotificacion datos={tipo==='user'||tipo==='externo'?adminReply:adminMessages} />{tipo==='user'||tipo==='externo'?adminReply.filter((item,index)=>adminReply.indexOf(item)===index).length:adminMessages.filter((item,index)=>adminMessages.indexOf(item)===index).length}</span></div>
        <ModalProfile estado={actualizartoken} /></div>
        </div>
    </div>
    <div>
        {children}
    </div>
    
    {/*<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav nav">
            
            
            
            <li className="nav-item active">
              {token===null?
              <Link className="nav-link" to="/login">Iniciar sesion</Link>
              :<>
                
                </>
            }
            </li>
            {token!==null?
            <li className='nav-item'>
              <Link className="nav-link" to="/listbiblioteca">
                    Catalogo
              </Link>
            </li>:''}
            <li className='nav-item'>
              <Link className="nav-link" to="/novedades">
                Novedades
              </Link>
            </li>
            
            {token===null?<>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
            
            <li className="nav-item">
              <a className="nav-link" href="#">Ayuda</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">Acerca de</Link>
            </li>
            </>
            :<>{''}
            </>}
            {tipo==='admin'?<>
            <li className='nav-item'>
              <Link className="nav-link" to="/listreserva">Reservas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/listprestamo">Prestamos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/listdevolucion">Devoluciones</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/listsancion">Sanciones</Link>
            </li></>
            :''}
            {tipo==='superuser'?<></>:''}
            {tipo!=='superuser'?
            <li className="nav-item">
              <Link className="nav-link" to="/buscador">Buscar</Link>
            </li>:''}
            
            
        
          </ul>
        </div>
    </nav>*/}
    </>);
};

export default Navbar;