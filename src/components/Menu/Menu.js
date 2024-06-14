import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
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

export default Menu;
