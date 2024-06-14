import React from "react";
import logo from './logo.svg';
import './App.css';
import Edit from './components/Dashboard/Edit';
import Home from './components/Home';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import ThemeProvider from "./provider/ThemeProvider";
import ThemeComponent from "./components/Theme/ThemeComponent";
import Buttons from "./components/Button/Buttons";
import handleClickButtonPrueba from "./handler/ButtonClickHandler";
import NotFound from "./components/Global/NotFound";
import About from "./components/Principal/About";
import CreateBiblioteca from "./components/Biblioteca/CreateBiblioteca";
import ListBiblioteca from "./components/Biblioteca/ListBiblioteca";
import Login from "./components/login/Login";
import Navbar from "./components/Menu/Navbar";
import VerLibro from "./components/Biblioteca/VerLibro";
import ListReserva from "./components/Reserva/ListReserva";
import Register from "./components/login/Register";
import ListPrestamo from "./components/Prestamo/ListPrestamo";
import ListDevolucion from "./components/Devolucion/ListDevolucion";
import ListUsuario from "./components/Usuarios/ListUsuario";
import ListSanciones from "./components/Sanciones/ListSanciones";
import ListBitacora from "./components/Bitacora/ListBitacora";
import Profile from "./components/login/Profile";
import Buscador from "./components/Biblioteca/Buscador";
import Contacto from "./components/Dashboard/Contacto";
import UserSocketComponent from "./components/Socketprueba/UserComponent";
import AdminSocketComponent from "./components/Socketprueba/AdminComponent";
import VerUsuario from "./components/Usuarios/VerUsuario";
import Novedades from "./components/Biblioteca/Novedades";
import Sidebar from "./components/Sidebar/Sidebar";

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

function App() {

  return (<>
    {/*<ThemeProvider>*/}
      <div className="App">
        {/*<LoginComponent />*/}
        {/*<h3>CRUD App</h3>
        <Buttons handleClick={handleClickButtonPrueba} />*/}        
        <Router>
          <Sidebar/>
            <Routes>
                {/*<Route path="/" component={DashBoardComponent} />*/}
                <Route exact path="/" element={<Dashboard />} />
                <Route path="/home" element={<Home />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/about" Component={About} />
                <Route path="/edit" element={<Edit />} />
                <Route path="/createbiblioteca" element={<CreateBiblioteca />} />
                <Route path="/verlibro" element={<VerLibro />} />
                <Route path="/listreserva" element={<ListReserva />} />
                <Route path="/listprestamo" element={<ListPrestamo />} />
                <Route path="/listdevolucion" element={<ListDevolucion />} />
                <Route path="/listbiblioteca" element={<ListBiblioteca />} />
                <Route path="/buscador" element={<Buscador />} />
                <Route path="/verperfil" element={<Profile />} />
                <Route path="/listusuario" element={<ListUsuario />} />
                <Route path="/listsancion" element={<ListSanciones />} />
                <Route path="/listbitacora" element={<ListBitacora />} />
                <Route path="/adminchat" element={<AdminSocketComponent />} />
                <Route path="/userchat" element={<UserSocketComponent />} />
                <Route path="/verusuario" element={<VerUsuario />} />
                <Route path="/login" element={<Login />} />
                <Route path="/novedades" element={<Novedades />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" Component={NotFound} />
            </Routes>
        </Router>
      </div>
    {/*</ThemeProvider>*/}
  </>);
}


export default App;
