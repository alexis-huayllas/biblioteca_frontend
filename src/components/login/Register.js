import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { usuario_formdata, usuario_initform } from '../../constantes/values';
import { endPointsauth } from '../../constantes/endpoints';
import Formulario from "../Formularios/Formulario";
import Navbar from "../Menu/Navbar";
import NavBar1 from "../navbarprueba/navbar1/NavBar1";


//import { useSelector } from "react-redux";
function Register() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showModal, setShowModal] = useState(true);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  //----------------------------------------fin---------------------------------------

  const handleSubmitdata = (formu) => {
    //const formData = new FormData();
    //e.preventDefault();
    if (formu.usuario==="") {
        //console.log('error de titulo');
        return {valor:false};
    }
    if (formu.password!==formu.repassword) {
        //console.log('error de titulo');
        return {valor:false};
    }
    

    //Object.keys(formu).map((value)=>{if(formu[value]!==null&&formu[value]!==undefined&&formu[value]!=='')formData.append(''+value, formu[value])});
    return {valor:true,url:endPointsauth.register.url,formulario:formu/*formData*/};
  };

  
  return (
    <>
      {token === null ? (
        <div style={{backgroundImage:"url('/back1.jpg')",backgroundRepeat:"no-repeat",backgroundSize:'cover',color:"white"}}>
        
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
          <div>
            <Button variant="primary" onClick={handleOpenModal}>
              Registrarse
            </Button>
            <Link className="btn btn-outline-dark" to={'/login'}>Iniciar Sesion</Link>

            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>{'Registro'}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Formulario initForm={usuario_initform} Formudata={usuario_formdata} handleSubmitdata={handleSubmitdata} cerrarmodal={handleCloseModal} />
              </Modal.Body>
              <Modal.Footer>
                {/*<Button variant="secondary" onClick={handleCloseModal}>
                  Cerrar
                </Button>
                <Link className="btn btn-outline-dark" to={'/login'}>Iniciar Sesion</Link>*/}
              </Modal.Footer>
            </Modal>
          </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        </div>
        
      ) : <Navigate to="/home" />}
    </>
  );
};
/*
        <Navigate to="/home" />
 <Link to="/home" >Home</Link> */
export default Register;