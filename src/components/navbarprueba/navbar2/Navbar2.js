import { useState } from 'react';
import  styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import ModalProfile from '../../Modales/ModalProfile';


function Navbar2() {

  // adding the states 
  const [isActive, setIsActive] = useState(false);

  //add the active class
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  //clean up function to remove the active class
  const removeActive = () => {
    setIsActive(false)
  }

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [tipo] = useState(localStorage.getItem('type'));
  const [logoimage] = useState(localStorage.getItem('logoimage')|null);

  const actualizartoken=()=>{
    setToken(localStorage.getItem('token'));
    window.location.reload();
  }

  return (
    <div className="App">
      <header className="App-header">

        <nav className={`${styles.navbar}`}>

          {/* logo */}
          <a href='/' className={`${styles.logo}`}>{logoimage===2?<img style={{width:'60px',borderRadius:'50px'}} src={'backg.png'} />:logoimage===3?<img style={{width:'60px',borderRadius:'50px'}} src={'backg1.png'} />:<img style={{width:'60px',borderRadius:'50px'}} src={'backg.jpg'} />}Biblioteca Virtual de la Carrera de Arquitectura 2024 </a>

          <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
            <li onClick={removeActive}>
              <Link to="/" className={`${styles.navLink}`}>Inicio</Link>
            </li>
            <li onClick={removeActive}>
            {token===null?<Link className={`${styles.navLink}`} to="/login">Iniciar sesion</Link>:<><ModalProfile estado={actualizartoken} /></>}
            </li>

            {token!==null?
            <li onClick={removeActive}>
              <Link className={`${styles.navLink}`} to="/listbiblioteca">
                    Catalogo
              </Link>
            </li>:''}
            <li onClick={removeActive}>
              <Link className={`${styles.navLink}`} to="/novedades">Novedades</Link>
            </li>
            
            {token===null?<>
            <li onClick={removeActive}>
              <Link className={`${styles.navLink}`} to="/contacto">Contacto</Link>
            </li>
            
            <li onClick={removeActive}>
              <a className={`${styles.navLink}`} href="#">Ayuda</a>
            </li>
            <li onClick={removeActive}>
              <Link className={`${styles.navLink}`} to="/about">Acerca de</Link>
            </li>
            </>
            :<>{''}</>}
            {tipo==='admin'?<>
            <li onClick={removeActive}>
              <Link className={`${styles.navLink}`} to="/listreserva">Reservas</Link>
            </li>
            <li onClick={removeActive}>
              <Link className={`${styles.navLink}`} to="/listprestamo">Prestamos</Link>
            </li>
            <li onClick={removeActive}>
              <Link className={`${styles.navLink}`} to="/listdevolucion">Devoluciones</Link>
            </li>
            <li onClick={removeActive}>
              <Link className={`${styles.navLink}`} to="/listsancion">Sanciones</Link>
            </li></>
            :''}
            {tipo==='superuser'?<><li onClick={removeActive}>
            <Link className={`${styles.navLink}`} to="/listusuario">Usuarios</Link>
            </li>
            <li onClick={removeActive}>
              <Link className={`${styles.navLink}`} to="/listbitacora">Bitacora</Link>
            </li></>:''}
            {tipo!=='superuser'?
            <li onClick={removeActive}>
              <Link className={`${styles.navLink}`} to="/buscador">Buscar</Link>
            </li>:''}

          </ul>

          <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`}  onClick={toggleActiveClass}>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
          </div>
        </nav>

      </header>
    </div>
  );
}

export default Navbar2;
