//Filename - components/Contacto.js 
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import array from "./array";
//import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom"; 
import { biblioteca_formdata } from "../../constantes/values";
import Navbar from "../Menu/Navbar";


function Contacto() {
    let history = useNavigate(); 
    
    return (
        <div>
            <Navbar/>
            <h1>Contacto</h1>

        </div>
    );
} 
export default Contacto;
