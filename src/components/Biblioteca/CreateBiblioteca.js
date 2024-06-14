//Filename - components/CreateBiblioteca.js 
import "bootstrap/dist/css/bootstrap.min.css";
import Formulario from "../Formularios/Formulario";
//import { v4 as uuid } from "uuid";
import { biblioteca_formdata, biblioteca_initform } from '../../constantes/values';
import { endPointsbiblioteca } from "../../constantes/endpoints";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function CreateBiblioteca(){

    const [token, setToken] = useState(localStorage.getItem('token'));
    
    let history = useNavigate();
    
    const handleSubmitdata = (form) => {
        const formData = new FormData();
        //e.preventDefault();
        if (form.titulo==="") {
            console.log('error de titulo');
            return {valor:false};
        }
        if (form.archivo!==null) {
            //console.log('Datos del formulario handleSubmitdata e:', e);
            //console.log('Datos del formulario handleSubmitdata e value:', e.target[2].attributes.name.value);
            //console.log('Datos del formulario handleSubmitdata e file :', e.target[2].files[0]);
            console.log('Datos del formulario handleSubmitdata archivo data:', form.archivo);
            //console.log('Datos del formulario handleSubmitdata archivo:', e.target.files[0]);
        }
        console.log('Datos del formulario handleSubmitdata:', form);

        Object.keys(form).map((value)=>{if(form[value]!==null&&form[value]!==undefined&&form[value]!=='')formData.append(''+value, form[value])}/*console.log(value,form[value])*/);
        //Object.keys(form).map((value)=>{formData.append(`${value}`, form[value])}/*console.log(value,form[value])*/);
        return {valor:true,url:endPointsbiblioteca.registrarbiblioteca.url,formulario:formData,redireccion:history};
      };

    


    return (<>
        { token===null?<Link to="/login">Iniciar Sesion</Link>:
        <div style={{ margin: "5rem" }}>
            <Link className="d-grid gap-2" to="/">
                <Button variant="primary" size="lg">
                    Inicio
                </Button>
            </Link>

            <Formulario initForm={biblioteca_initform} Formudata={biblioteca_formdata} handleSubmitdata={handleSubmitdata} cerrarmodal={'home'} />
        </div>}</>
    );
} 
export default CreateBiblioteca;
