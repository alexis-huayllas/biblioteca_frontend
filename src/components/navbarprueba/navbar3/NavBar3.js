import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar3.css";
import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import ModalProfile from "../../Modales/ModalProfile";

function NavBar3() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [tipo] = useState(localStorage.getItem('type'));
  const actualizartoken=()=>{
    setToken(localStorage.getItem('token'));
    window.location.reload();
  }

  const [logoimage] = useState(localStorage.getItem('logoimage')|null);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">{logoimage===2?<img style={{width:'60px',borderRadius:'50px'}} src={'backg.png'} />:logoimage===3?<img style={{width:'60px',borderRadius:'50px'}} src={'backg1.png'} />:<img style={{width:'60px',borderRadius:'50px'}} src={'backg.jpg'} />}
            <span>Biblioteca Virtual de la Carrera de Arquitectura 2024</span>
            {/* <i className="fas fa-code"></i> */}
            
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {/*<li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Contact Us
              </NavLink>
            </li>*/}








            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >Inicio</NavLink>
            </li>
            
            <li className="nav-item active">
              {token===null?
              <NavLink
              exact
              to="/login"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >Iniciar sesion</NavLink>
              
              :<>
                
                <ModalProfile estado={actualizartoken} />
                </>
            }{/*<Link to="/home" className='nav-link'>Home</Link>*/}
            </li>
            {token!==null?
            <li className='nav-item'>
              <NavLink
                exact
                to="/listbiblioteca"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Catalogo
              </NavLink>
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
            <NavLink exact to="/contacto" activeClassName="active" className="nav-links" onClick={handleClick}>
            Contacto
              </NavLink>
            </li>
            
            <li className="nav-item">
            <NavLink exact to="/contacto" activeClassName="active" className="nav-links" onClick={handleClick}>
            Ayuda
              </NavLink>
            </li>
            <li className="nav-item">
            <NavLink exact to="/about" activeClassName="active" className="nav-links" onClick={handleClick}>
            Acerca de
              </NavLink>
            </li>
            </>
            :<>{'       '}
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
            <NavLink exact to="/listreserva" activeClassName="active" className="nav-links" onClick={handleClick}>
            Reservas
              </NavLink>
            </li>
            <li className="nav-item">
            <NavLink exact to="/listprestamo" activeClassName="active" className="nav-links" onClick={handleClick}>
            Prestamos
              </NavLink>
            </li>
            <li className="nav-item">
            <NavLink exact to="/listdevolucion" activeClassName="active" className="nav-links" onClick={handleClick}>
            Devoluciones
              </NavLink>
            </li>
            <li className="nav-item">
            <NavLink exact to="/listsancion" activeClassName="active" className="nav-links" onClick={handleClick}>
            Sanciones
              </NavLink>
            </li></>
            :''}
            {tipo==='superuser'?<><li className="nav-item">
            <NavLink exact to="/listusuario" activeClassName="active" className="nav-links" onClick={handleClick}>
            Usuarios
              </NavLink>
            </li>
            <li className="nav-item">
            <NavLink exact to="/listbitacora" activeClassName="active" className="nav-links" onClick={handleClick}>
            Bitacora
              </NavLink>
            </li></>:''}
            {tipo!=='superuser'?
            <li className="nav-item">
              <NavLink exact to="/buscador" activeClassName="active" className="nav-links" onClick={handleClick}>
              Buscar
              </NavLink>
            </li>:''}













          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

            {click ? (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuOpen />{" "}
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar3;
