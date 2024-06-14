/*import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [token] = useState(localStorage.getItem('token'));


  const handleMouseEnter = () => {
    setShowSubMenu(true);
  };

  const handleMouseLeave = () => {
    setShowSubMenu(false);
  };

  return (
    <nav>
      <ul>
        <li>
          {token===null?<Link to="/">Inicio</Link>:<Link to="/home">Home</Link>}
          
        </li>
        <li>
          <Link to="/about">Acerca de</Link>
        </li>
        <li
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Servicios
          {showSubMenu && (
            <ul>
              <li>
                <Link to="/">Servicio 1</Link>
              </li>
              <li>
                <Link to="/">Servicio 2</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/">Contacto</Link>
        </li>
        <li>
          <Link to="/listbiblioteca">Listar libros</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;*/















import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
//import './Navbar.css';
import ModalProfile from '../Modales/ModalProfile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  /*return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">Navbar</div>
        <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="#" className="nav-link">Home</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">About</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Services</a>
              <ul className="submenu">
                <li><a href="#">Service 1</a></li>
                <li><a href="#">Service 2</a></li>
                <li><a href="#">Service 3</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Contact</a>
            </li>
          </ul>
        </div>
        <button className="toggle-button" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </nav>
  );*/

  const [showSubMenu, setShowSubMenu] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [tipo] = useState(localStorage.getItem('type'));


  const handleMouseEnter = () => {
    setShowSubMenu(true);
  };

  const handleMouseLeave = () => {
    setShowSubMenu(false);
  };

  const actualizartoken=()=>{
    setToken(localStorage.getItem('token'));
    window.location.reload();
  }


  const [logoimage] = useState(localStorage.getItem('logoimage')|null);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand w-25" href="/">
        <h1>{logoimage===2?<img style={{width:'60px',borderRadius:'50px'}} src={'backg.png'} />:logoimage===3?<img style={{width:'60px',borderRadius:'50px'}} src={'backg1.png'} />:<img style={{width:'60px',borderRadius:'50px'}} src={'backg.jpg'} />}BIBLIOTECA VIRTUAL </h1>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav nav">
            
            <li className="nav-item">
              <Link to="/" className='nav-link'>Inicio</Link>
            </li>
            
            <li className="nav-item active">
              {token===null?
              <Link className="nav-link" to="/login">Iniciar sesion</Link>
              :<>
                
                <ModalProfile estado={actualizartoken} />
                </>
            }{/*<Link to="/home" className='nav-link'>Home</Link>*/}
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
            {/*<li className='nav-item'>
              <Link className="nav-link" to="/listbiblioteca">
                    Catalogo
              </Link>
            </li>*/}
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
            {/*<li className='nav-item'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <a className="nav-link" href="#">Servicios</a>
              {showSubMenu && (
                <ul>
                  <li>
                    <Link to="/">Servicio 1</Link>
                  </li>
                  <li>
                    <Link to="/">Servicio 2</Link>
                  </li>
                </ul>
              )}
            </li>*/}</>}
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
            {tipo==='superuser'?<><li className="nav-item">
            <Link className="nav-link" to="/listusuario">Usuarios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/listbitacora">Bitacora</Link>
            </li></>:''}
            {tipo!=='superuser'?
            <li className="nav-item">
              <Link className="nav-link" to="/buscador">Buscar</Link>
            </li>:''}
            
            
        
          </ul>
        </div>
    </nav>
  );
};

export default Navbar;