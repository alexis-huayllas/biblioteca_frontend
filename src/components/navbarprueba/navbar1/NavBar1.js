import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ModalProfile from '../../Modales/ModalProfile';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 1rem;
`;

const NavItem = styled.li`
  list-style: none;
  margin: 0 1rem;

  a {
    color: #fff;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: #bada55;
    }
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const MobileNavToggle = styled.button`
  display: block;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #bada55;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const DesktopNav = styled.ul`
  display: flex;
  flex-direction: row;

  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileNav = styled.ul`
  display: none;
  flex-direction: column;
  margin: 0;
  padding: 0;

  @media (max-width: 767px) {
    display: flex;
  }
`;

const NavBar1 = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const [tipo] = React.useState(localStorage.getItem('type'));
  const [logoimage] = React.useState(localStorage.getItem('logoimage')|null);

  const actualizartoken=()=>{
    setToken(localStorage.getItem('token'));
    window.location.reload();
  }

  return (
    <Nav>
      <Logo>{logoimage===2?<img style={{width:'60px',borderRadius:'50px'}} src={'backg.png'} />:logoimage===3?<img style={{width:'60px',borderRadius:'50px'}} src={'backg1.png'} />:<img style={{width:'60px',borderRadius:'50px'}} src={'backg.jpg'} />}Biblioteca Virtual de la Carrera de Arquitectura 2024</Logo>
      <MobileNavToggle onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
        {isMobileNavOpen ? 'Close' : 'Menu'}
      </MobileNavToggle>
      <DesktopNav>
              
        <NavItem><Link to="/">Inicio</Link></NavItem>
        <NavItem>{token===null?<Link className="nav-link" to="/login">Iniciar sesion</Link>:<><ModalProfile estado={actualizartoken} /></>}</NavItem>
        {token!==null?<NavItem><Link className="nav-link" to="/listbiblioteca">Catalogo</Link></NavItem>:''}
        <NavItem><Link className="nav-link" to="/novedades">Novedades</Link></NavItem>
        {token==='nullable'?<><NavItem><Link className="nav-link" to="/contacto">Contacto</Link></NavItem>
        <NavItem><a className="nav-link" href="#">Ayuda</a></NavItem>
        <NavItem><Link className="nav-link" to="/about">Acerca de</Link></NavItem></>:''}
        {tipo==='admin'?<><NavItem><Link className="nav-link" to="/listreserva">Reservas</Link></NavItem>
        <NavItem><Link className="nav-link" to="/listprestamo">Prestamos</Link></NavItem>
        <NavItem><Link className="nav-link" to="/listdevolucion">Devoluciones</Link></NavItem>
        <NavItem><Link className="nav-link" to="/listsancion">Sanciones</Link></NavItem></>:''}
        {tipo==='superuser'?<><NavItem><Link className="nav-link" to="/listusuario">Usuarios</Link></NavItem>
        <NavItem><Link className="nav-link" to="/listbitacora">Bitacora</Link></NavItem></>:''}
        {tipo!=='superuser'?<NavItem><Link className="nav-link" to="/buscador">Buscar</Link></NavItem>:''}
        {/*<NavItem><a href="/">Contact1</a></NavItem>
        <NavItem><a href="/">Contact2</a></NavItem>*/}
      </DesktopNav>
      <MobileNav style={{ display: isMobileNavOpen ? 'flex' : 'none' }}>
        <NavItem><Link to="/">Inicio</Link></NavItem>
        <NavItem>{token===null?<Link className="nav-link" to="/login">Iniciar sesion</Link>:<><ModalProfile estado={actualizartoken} /></>}</NavItem>
        <NavItem><Link className="nav-link" to="/listbiblioteca">Catalogo</Link></NavItem>
        <NavItem><Link className="nav-link" to="/novedades">Novedades</Link></NavItem>
        {token==='nullable'?<><NavItem><Link className="nav-link" to="/contacto">Contacto</Link></NavItem>
        <NavItem><a className="nav-link" href="#">Ayuda</a></NavItem>
        <NavItem><Link className="nav-link" to="/about">Acerca de</Link></NavItem></>:''}
        {tipo==='admin'?<><NavItem><Link className="nav-link" to="/listreserva">Reservas</Link></NavItem>
        <NavItem><Link className="nav-link" to="/listprestamo">Prestamos</Link></NavItem>
        <NavItem><Link className="nav-link" to="/listdevolucion">Devoluciones</Link></NavItem>
        <NavItem><Link className="nav-link" to="/listsancion">Sanciones</Link></NavItem></>:''}
        {tipo==='superuser'?<><NavItem><Link className="nav-link" to="/listusuario">Usuarios</Link></NavItem>
        <NavItem><Link className="nav-link" to="/listbitacora">Bitacora</Link></NavItem></>:''}
        {tipo!=='superuser'?<NavItem><Link className="nav-link" to="/buscador">Buscar</Link></NavItem>:''}
        {/*<NavItem><a href="/">Contact1</a></NavItem>
        <NavItem><a href="/">Contact2</a></NavItem>*/}
      </MobileNav>
    </Nav>
  );
};
export default NavBar1;