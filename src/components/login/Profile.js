import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Navigate } from "react-router-dom";
import { endPointsprestamo, endPointsusuario } from '../../constantes/endpoints';
import Navbar from "../Navbar/Navbar";
import ModalFormsContraseña from "../Modales/ModalFormsContraseña";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SweetAlertHandler from "../Alerta/Sweetalerthandler";
import { Button } from "bootstrap";
import Navbar2 from "../navbarprueba/navbar2/Navbar2";
import NavBar3 from "../navbarprueba/navbar3/NavBar3";
import NavBar1 from "../navbarprueba/navbar1/NavBar1";


//import { useSelector } from "react-redux";
function Profile() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [tipo] = useState(localStorage.getItem('type'));
  const [user,SetUser] = useState([]);
  const [reservas,SetReservas] = useState([]);
  const [prestamos,SetPrestamos] = useState([]);
  const [alertas,setAlertas] = useState([]);
  const [devoluciones,SetDevoluciones] = useState([]);
  const [buttn,SetButtn] = useState(1);
  const MySweetAlert = withReactContent(Swal);
  //const [panelControl, setPanelControl] = useState(localStorage.getItem('panelControl'));
  useEffect(()=>{
    const ListData = async () => {
        try {
            const response = await axios.get(/*endPointsusuario.profile.url*/endPointsprestamo.usuario.url,{headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}}); // Reemplaza con la URL de tu API
            SetUser(response.data.user);
            SetReservas(response.data.reservas);
            SetPrestamos(response.data.prestamos);
            SetDevoluciones(response.data.devoluciones);
            //console.log('response',response.data)
        } catch (error) {
            console.log('Error al cargar datos:', error);
        }
        if(tipo!=='user'&&tipo!=='externo'&&tipo!=='superuser'){
          try {
              const response = await axios.get(endPointsprestamo.perfiles.url,{headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}}); // Reemplaza con la URL de tu API
              setAlertas(response.data.alertas);
              if(response.data.alertas.length>0){
                let texto='';
                for (let i = 0; i < response.data.alertas.length; i++) {
                  texto=texto+'<h5>'+response.data.alertas[i].titulo+' </h5><p>'+response.data.alertas[i].value+'</p><br/>';
                  //texto=texto+''+alertas[i].titulo+'\n \b \v '+alertas[i].value+'\n';
                }
                
              MySweetAlert.fire({
                title: '',//'¡Hola!',
                html: texto,//'Este es un mensaje de SweetAlert en React.',
                icon: 'info',//'success',
                confirmButtonText: 'Aceptar',
                
              }).then(async (result) => {if (result.isConfirmed) { 
                setAlertas([]);
              }});}

              console.log('response',response.data)
          } catch (error) {
              console.log('Error al cargar datos:', error);
          }}
      };
      ListData();
},[])


  const handleSubmitdata = (formu) => {
    //const formData = new FormData();
    //e.preventDefault();
    if (formu.password==="") {
        //console.log('error de titulo');
        return {valor:false};
    }
    /*if (formu.password!==formu.repassword) {
        //console.log('error de titulo');
        return {valor:false};
    }*/
    

    //Object.keys(formu).map((value)=>{if(formu[value]!==null&&formu[value]!==undefined&&formu[value]!=='')formData.append(''+value, formu[value])});
    return {valor:true,url:endPointsusuario.contraseña_usuario.url+user.id,formulario:formu/*formData*/};
  };


  const eliminarCuenta=()=>{
    MySweetAlert.fire({
      title: 'Eliminar',//'¡Hola!',
      text: 'Desea eliminar su cuenta?',//'Este es un mensaje de SweetAlert en React.',
      icon: 'warning',//'success',
      showCancelButton:true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
      }).then(async (result) => {if (result.isConfirmed) { 
        axios.delete(endPointsusuario.eliminar.url+user.id,{headers:{'Authorization':`Bearer ${token}`}})
        .then(async (response)=>{
          SweetAlertHandler({titulo:'',texto:'Se elimino con exito su cuenta',icono:'success'});
          //const respon = await axios.get(endPointsusuario.listar.url); // Reemplaza con la URL de tu API
          //setListado(respon.data);
          setTimeout(()=>{
            localStorage.removeItem('type');
            localStorage.removeItem('usuario');
            localStorage.removeItem('token');
            window.location.reload();
          },5000);
      })
      .catch((error)=>{SweetAlertHandler({titulo:'Error',texto:'Ocurrio un error al eliminar',icono:'error'});});
      /*console.log('eliminando')*/ }});
    }

  
  return (
    <>
      {token !== null ? (
      <Navbar>
        <div>
          {/*panelControl==='1'?<NavBar1/>:panelControl==='2'?<Navbar2/>:panelControl==='3'?<NavBar3/>:<Navbar/>*/}
          
          
          
          
        <div style={{border:'1px solid cyan'}}>
          <h3>Mi Perfil</h3>
          {user?Object.keys(user).map((dato)=>dato!=='id'&&dato!=='role'&&dato!=='password'&&dato!=='CreatedAt'&&dato!=='UpdatedAt'&&dato!=='DeletedAt'?<p>{dato}:{user[dato]}</p>:''):''}

        </div>
        <div style={{border:'1px solid red'}}>
          <h3>Configuracion</h3>
          <ModalFormsContraseña boton={'Cambiar Contraseña'} titulo={'Cambiar Contraseña'} handleSubmitdata={handleSubmitdata} initForm={{password:''}} Formudata={[{datalabel:'Contraseña',dataname:'password',typedata:'password',datavalue:""}]} />
          {tipo==='externo'?<button onClick={eliminarCuenta}>Eliminar Cuenta</button>:''}

        </div>
        {/*<div style={{border:'1px solid red'}}>
          <h5>Configuracion de Panel de navegacion</h5>
          {window.innerWidth<750?<><button onClick={()=>{setPanelControl('1');localStorage.setItem('panelControl','1')}}>caso 1</button><button  onClick={()=>{setPanelControl('2');localStorage.setItem('panelControl','2')}}>caso 2</button><button  onClick={()=>{setPanelControl('3');localStorage.setItem('panelControl','3')}}>caso 3</button></>:<><button onClick={()=>{setPanelControl('1');localStorage.setItem('panelControl','1')}}>caso 1</button><button  onClick={()=>{setPanelControl('2');localStorage.setItem('panelControl','2')}}>caso 2</button><button  onClick={()=>{setPanelControl('3');localStorage.setItem('panelControl','3')}}>caso 3</button><button  onClick={()=>{setPanelControl('null');localStorage.setItem('panelControl','null')}}>caso 4</button></>}
          <h5>Configuracion del icono de navegacion</h5>
          <div><button style={{borderStyle:"none",background:'none'}} onClick={()=>{localStorage.setItem('logoimage','1')}}><img style={{width:'60px',borderRadius:'50px'}} src="/backg.jpg"/></button><button style={{borderStyle:"none",background:'none'}}  onClick={()=>{localStorage.setItem('logoimage','2')}}><img style={{width:'60px',borderRadius:'50px'}} src="/backg.png"/></button><button style={{borderStyle:"none",background:'none'}}  onClick={()=>{localStorage.setItem('logoimage','3')}}><img style={{width:'60px',borderRadius:'50px'}} src="/backg1.png"/></button></div>
        </div>*/}
        {tipo!=='superuser'&&tipo!=='admin'?<div>
        <h5>Historial</h5>
        <div><button className="btn btn-outline-info" onClick={()=>SetButtn(1)}>Mis Reservas</button><button className="btn btn-outline-primary" onClick={()=>SetButtn(2)}>Mis Prestamos</button><button className="btn btn-outline-secondary" onClick={()=>SetButtn(3)}>Mis Devoluciones</button></div>
        {buttn===1?<div>
          <h3>Mis Reservas</h3>
          {reservas?reservas.map((datos)=><div style={{width:'80%',margin:'auto',border:'1px solid blue',marginBottom:'10px'}}>
            fecha de reserva: {datos.fecha_reserva}<br/>
          <div style={{display:"flex",flexDirection:"row"}}>
            <div style={{width:'40%',margin:'auto'}}><img style={{width:'60%'}} src={datos.libro_id.portada} /></div>
            <div style={{width:'50%'}}>titulo:{datos.libro_id.titulo}<br/>autor:{datos.libro_id.autor}<br/>año de publicacion:{datos.libro_id.anoPublicacion}<br/></div>
            <div style={{width:'10%'}}>{datos.estado==="vigente"?'Aun no atendido':datos.estado==="pasado"?'sin atender':datos.estado==="prestado"?'atendido':"rechazado"}<br/></div>
          </div> </div>):<h6>Sin reservas</h6>}
        </div>:''}
        {buttn===2?<div>
          <h3>Mis Prestamos</h3>
          {prestamos?prestamos.map((datos)=><div style={{width:'80%',margin:'auto',border:'1px solid blue',marginBottom:'10px'}}>
          fecha de prestamo:{datos.fecha_prestamo}<br/>
          {datos.id_reserva!==null?<>fecha de reserva: {datos.id_reserva.fecha_reserva}<br/></>:<>fecha de reserva: Sin Reserva</>}
          <div style={{display:"flex",flexDirection:"row"}}>
            <div style={{width:'40%',margin:'auto'}}><img style={{width:'60%'}} src={datos.id_documento.portada} /></div>
            <div style={{width:'50%'}}>titulo:{datos.id_documento.titulo}<br/>autor:{datos.id_documento.autor}<br/>año de publicacion:{datos.id_documento.anoPublicacion}<br/>carrera/institucion: {datos.carrera}<br/>materia: {datos.materia}<br/>grado: {datos.grado}<br/></div>
            <div style={{width:'10%'}}>{datos.fecha_devolucion!==null?datos.fecha_devolucion:parseInt(((new Date())-(new Date(datos.fecha_prestamo)))/(1000*60*60*24),10)-Number(datos.tiempo_limite)>0?<p style={{color:'red'}}><br/> Restraso en Devolucion de {parseInt(((new Date())-(new Date(datos.fecha_prestamo)))/(1000*60*60*24),10)-Number(datos.tiempo_limite)} dias(Pueden aplicarse sanciones por mora) </p>:''}{datos.estado}<br/></div>
          </div> </div>):<h6>Sin prestamos</h6>}
        </div>:''}
        {buttn===3?<div>
        <h3>Mis devoluciones</h3>
          {devoluciones?devoluciones.map((datos)=><div style={{width:'80%',margin:'auto',border:'1px solid blue',marginBottom:'10px'}}>
          fecha de prestamo:{datos.fecha_prestamo}<br/>
          fecha de devolucion:{datos.fecha_devolucion}<br/>
          {datos.id_reserva!==null?<>fecha de reserva: {datos.id_reserva.fecha_reserva}<br/></>:<>fecha de reserva: Sin Reserva</>}
          <div style={{display:"flex",flexDirection:"row"}}>
            <div style={{width:'40%',margin:'auto'}}><img style={{width:'60%'}} src={datos.id_documento.portada} /></div>
            <div style={{width:'40%'}}>titulo:{datos.id_documento.titulo}<br/>autor:{datos.id_documento.autor}<br/>año de publicacion:{datos.id_documento.anoPublicacion}<br/>carrera/institucion: {datos.carrera}<br/>materia: {datos.materia}<br/>grado: {datos.grado}<br/></div>
            <div style={{width:'20%'}}>
              <h5>Sanciones</h5>
            {datos.id_sancion.length>0?datos.id_sancion.map((dato)=><>Detalle: {dato.detalle}<br/>Multa: {dato.multa}<br/></>):<p style={{color:'green'}}>no tiene sanciones</p>}<br/>
            {datos.id_sancion.length>0?<>Estado: {datos.estado_sancion!==null?datos.estado_sancion:<p style={{color:'red'}}>sin cancelar</p>}</>:''}<br/></div><br/>
          </div> </div>):<h6>Sin Devoluciones</h6>}
        </div>:''}</div>:''}
        
        {/*JSON.stringify(reservas)*/}
        {/*JSON.stringify(prestamos)*/}
        {/*JSON.stringify(devoluciones)*/}
        
              
          
      </div></Navbar>
      ) : <Navigate to="/home" />}
    </>
  );
};
/*
        <Navigate to="/home" />
 <Link to="/home" >Home</Link> */
export default Profile;