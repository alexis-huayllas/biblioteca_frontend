import React, { useEffect, useState } from "react";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import { Link, useNavigate, Navigate } from "react-router-dom";
import ModalForms from "../Modales/ModalForms";
import { usuario_formdata, usuario_initform } from '../../constantes/values';
import { endPointsauth, endPointsusuario } from '../../constantes/endpoints';
import ModalFormulario from "../Modales/ModalFormulario";
import ModalFormsData from "../Modales/ModalFormsData";
import ModalFormsContraseña from "../Modales/ModalFormsContraseña";
import Navbar from "../Menu/Navbar";
import SweetAlertHandler from "../Alerta/Sweetalerthandler";
import NavBar1 from "../navbarprueba/navbar1/NavBar1";


//import { useSelector } from "react-redux";
function Login() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [form, setForm] = useState({usuario:"",password:""});
  

  const { usuario, password } = form;
  console.log("formmmm", form);

  ///----------------------------------------

  //-------------------- peticion de listar usuarios-----------------------

  const handlerChangeForm = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };
  

  const handlerSubmit = (e) => {
    e.preventDefault(); //e.preventDefault(); es para que no se recargue en otro servicio
    axios.post(endPointsauth.login.url,form).then((res)=>{/*console.log("res",res.data);*/setToken(res.data.token);localStorage.setItem('token',res.data.token);localStorage.setItem('type',res.data.tipo);localStorage.setItem('nombre',res.data.user);})
    .catch((error)=>{if(error.response.data.statusCode===401&&error.response.data.error==='Unauthorized')SweetAlertHandler({titulo:'',texto:'usuario y/o contraseña incorrectos',icono:'error'})});
    //console.log(usuario, password);
    //console.log(localStorage.getItem('token'));
  };
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

  const handleSubmitdata2 = (formu) => {
    //const formData = new FormData();
    //e.preventDefault();
    if (formu.password==="") {
        //console.log('error de titulo');
        return {valor:false};
    }
    if (formu.usuario==="") {
      //console.log('error de titulo');
      return {valor:false};
  } 

    //Object.keys(formu).map((value)=>{if(formu[value]!==null&&formu[value]!==undefined&&formu[value]!=='')formData.append(''+value, formu[value])});
    return {valor:true,url:endPointsusuario.contraseña.url,formulario:formu/*formData*/};
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
            <Link className="btn btn-outline-info" to={'/'}>Inicio</Link>
        </div>
        </div>
        <div className="container">
          <div className="d-flex justify-content-center h-100">
            <div className="card">
              <div className="card-header">
                <h3>Iniciar Sesion</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handlerSubmit}>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      
                    </div>
                    <input
                      type="text"
                      name="usuario"
                      value={usuario}
                      onChange={handlerChangeForm}
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={handlerChangeForm}
                      className="form-control"
                      placeholder="Contraseña"
                    />
                  </div>
                  <br />
                  <div className="remember"style={{display:"flex",flexDirection:"row"}}>
                    <input type="checkbox" />
                    Remember Me
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Iniciar Sesion"
                      className="btn btn-outline-dark float-right login_btn"
                    />
                    <br />
                  </div>
                </form>
                <div>Si no tiene un usuario puede <a className="btn btn-outline-primary" href="/register">Registrarse</a>
                <br/>
                Ha olvidado su contraseña, puede 
                <ModalFormsContraseña boton={'Buscar y cambiar Contraseña'} titulo={'Cambiar Contraseña'} handleSubmitdata={handleSubmitdata2} initForm={{usuario:'',password:''}} Formudata={[{datalabel:'Usuario',dataname:'usuario',typedata:'text',datavalue:""},{datalabel:'Contraseña',dataname:'password',typedata:'password',datavalue:""}]} />

                </div>
                  
              </div>
            </div>
          </div>
        </div>
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
export default Login;