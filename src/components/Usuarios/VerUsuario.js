//Filename - components/VerUsuario.js
 
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Navigate } from "react-router-dom";
import axios from 'axios';
import { endPointsusuario } from "../../constantes/endpoints";
import Navbar from "../Navbar/Navbar";
//import { PDFDocument } from 'pdf-lib';
import NavBar1 from "../navbarprueba/navbar1/NavBar1";
import Navbar2 from "../navbarprueba/navbar2/Navbar2";
import NavBar3 from "../navbarprueba/navbar3/NavBar3";
import { bitacora_tabledata, usuario_formdataedit } from "../../constantes/values";

function VerUsuario() {
    let history = useNavigate();
    //let param = useSearchParams();

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userdata,setUserdata] = useState([]);
    
    //const [panelControl] = useState(localStorage.getItem('panelControl'));
    useEffect(()=>{
        const ListData = async () => {
            if(localStorage.getItem('user_data')){
                try {
                    const response = await axios.get(endPointsusuario.editar.url+localStorage.getItem('user_data')); // Reemplaza con la URL de tu API
                    setUserdata(response.data);
                    if(response.data)
                    localStorage.removeItem('user_data');
                    console.log('response',response.data)
                } catch (error) {
                    console.log('Error al cargar datos:', error);
                }
            }
          };
          ListData();
    },[])

    //document.getElementById('getdata').innerHTML='<iframe src="data:application/pdf;base64,'+val+'" width="100%" height="600px" frameborder="0"></iframe>';
 
    return (<>
        {/*panelControl==='1'?<NavBar1/>:panelControl==='2'?<Navbar2/>:panelControl==='3'?<NavBar3/>:<Navbar/>*/}

        { token===null?<div><Navigate to="/login" /></div>:
        userdata.usuario?
        <Navbar>
            <div style={{display:'flex',flexDirection:'row'}}>
                <div style={{width:'30%'}}>
                    <div style={{paddingLeft:'10px'}}>
                        <h5>Detalles del usuario</h5>
                        {usuario_formdataedit.map(({datalabel,dataname})=>(<><p><b>{datalabel}:</b> {userdata.usuario[dataname]}</p></>))}
                    </div>
                </div>
                <div style={{width:'70%'}}>
                    <h5>Bitacoras Registradas</h5>
                    <table style={{border:'1px solid blue'}} className="table table-hover">
                        <thead>
                            <tr>
                                {bitacora_tabledata.map(({headerdatatable})=>(<th>{headerdatatable}</th>))}
                            </tr>
                        </thead>
                        <tbody>
                            {userdata.bitacoras.length>0?userdata.bitacoras.map((dato)=>(<tr>{bitacora_tabledata.map(({bodydatatable})=>bodydatatable==='contenido'?<td>{dato[bodydatatable].replaceAll(',"',', "')}</td>:<td>{dato[bodydatatable]}</td>)}</tr>)):<tr><td style={{textAlign:"center"}} colSpan={3}>no hay datos para mostrar</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
            
            
            
        </Navbar>:<h3>no hay datos para mostrar</h3>
    }
    
    

    </>
    );
}
 

export default VerUsuario;