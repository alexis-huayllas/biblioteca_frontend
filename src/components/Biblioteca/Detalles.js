//Filename - components/VerLibro.js
 
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, Navigate, useSearchParams } from "react-router-dom";
import axios from 'axios';
import { endPointsbiblioteca } from "../../constantes/endpoints";
import Navbar from "../Menu/Navbar";
//import { PDFDocument } from 'pdf-lib';
import PdfViewer from './PdfViewer';
import NavBar1 from "../navbarprueba/navbar1/NavBar1";
import Navbar2 from "../navbarprueba/navbar2/Navbar2";
import NavBar3 from "../navbarprueba/navbar3/NavBar3";
import { biblioteca_formdata } from "../../constantes/values";

function VerLibro() {
    let history = useNavigate();
    //let param = useSearchParams();

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [titulo] = useState(localStorage.getItem('titulo')?localStorage.getItem('titulo'):sessionStorage.getItem('titulo'));
    const [book] = useState(localStorage.getItem('num_book')?localStorage.getItem('num_book'):sessionStorage.getItem('num_book'));
    const [page,setPage] = useState(1/*sessionStorage.getItem('page')?sessionStorage.getItem('page'):1*/);
    const [lim,setLim] = useState(sessionStorage.getItem('lim')?sessionStorage.getItem('lim'):0);
    const [databook,setDatabook] = useState([]);
    //console.log(num_libro);
    
    //localStorage.getItem('num_book')?localStorage.removeItem('num_book'):'';
    //localStorage.getItem('page')?localStorage.removeItem('page'):'';
    const verDatos=async ()=>{
        //console.log('llega a la funcion verdatos');
        document.getElementById('verdatos').setAttribute('disabled','disabled');
        await axios.get(endPointsbiblioteca.editarbiblioteca.url+`${book}`/*'9/2'id_libro/numpage*/,{headers:{'Authorization':`Bearer ${token}`}}).then(async (response)=>{
            //console.log(response.data);
            //document.getElementById('getdata').innerHTML='<iframe src="data:application/pdf;base64,'+response.data.archivo+'" width="100%" height="600px" frameborder="0"></iframe>';
            //document.getElementById('iframedata').removeAttribute('hidden');
            //document.getElementById('iframedata').setAttribute('src','data:application/pdf;base64,'+response.data.archivo)
            setDatabook(response.data);
            sessionStorage.setItem('lim',response.data.lim);
            sessionStorage.setItem('num_book',book);
            sessionStorage.setItem('page',page);
            if(localStorage.getItem('num_book')){localStorage.removeItem('num_book');localStorage.removeItem('titulo');}
            if (response.data.lim!==lim){setLim(sessionStorage.getItem('lim'));console.log('limset',lim);}
            
            //const base64PDF = ''+response.data.archivo; // Reemplaza con tu PDF en base64
            // Decodificar el PDF base64 a un Uint8Array
            //const uint8Array = Uint8Array.from(atob(base64PDF), c => c.charCodeAt(0));
            // Cargar el PDF desde el Uint8Array utilizando pdf-lib
            /*await PDFDocument.load(uint8Array).then((pdfDoc) => {
                // Obtener la primera página del PDF
                const firstPage = pdfDoc.getPage(0);
                // Crear un canvas para renderizar la página del PDF
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                // Renderizar la página del PDF en el canvas
                //const viewport = firstPage.getViewport({ scale: 1.0 });
                //canvas.height = viewport.height;
                //canvas.width = viewport.width;
                //firstPage.draw(context, { viewport });

                const pageSize = [595, 842]; // Tamaño estándar de una página A4 en puntos (unidad de medida de PDF)

                canvas.height = pageSize[1];
                canvas.width = pageSize[0];
            
                firstPage.draw(context, {
                x: 0,
                y: 0,
                width: pageSize[0],
                height: pageSize[1],
                scale: 1,
                //colorRgb: rgb(1, 1, 1),
                });

                // Convertir el canvas a una imagen en base64
                const imageData = canvas.toDataURL('image/png');
                document.getElementById('getdata').innerHTML="<img src='"+imageData+"'>";
                console.log('imageData',imageData); // Aquí puedes usar imageData como desees
            }).catch(error => {
            console.error('Error al cargar el PDF:', error);
            });*/
            //const bytes = Uint8Array.from(atob(base64PDF), c => c.charCodeAt(0));
            /*PDFDocument.load(bytes).then((pdfDoc) => {
                const firstPage = pdfDoc.getPage(0);

                const pageSize = [595, 842]; // Tamaño estándar de una página A4 en puntos (unidad de medida de PDF)

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                canvas.height = pageSize[1];
                canvas.width = pageSize[0];

                const scale = 1; // Puedes ajustar el escalamiento si es necesario

                const scaledSize = [pageSize[0] * scale, pageSize[1] * scale];

                const renderContext = {
                    canvasContext: context,
                    transform: [scale, 0, 0, scale, 0, 0],
                    viewport: { width: scaledSize[0], height: scaledSize[1] },
                    //background: rgb(1, 1, 1),
                };


                firstPage.render(renderContext).promise.then(() => {
                    const imageData = canvas.toDataURL('image/png');
                    document.getElementById('getdata').innerHTML="<img src='"+imageData+"'>";
                    console.log('imageData',imageData); // Aquí puedes usar imageData como desees
                }).catch(error => {
                    console.error('Error al renderizar la página:', error);
                });
                }).catch(error => {
                console.error('Error al cargar el PDF:', error);
            });*/
            /*PDFDocument.load(bytes).then((pdfDoc) => {
                const firstPage = pdfDoc.getPage(0);
            
                const pageSize = [595, 842]; // Tamaño estándar de una página A4 en puntos (unidad de medida de PDF)
            
                const img = new Image();
            
                img.onload=()=>(()=>{
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
            
                canvas.height = pageSize[1];
                canvas.width = pageSize[0];
            
                context.drawImage(img, 0, 0);
            
                const imageData = canvas.toDataURL('image/png');
                console.log('imageData',imageData); // Aquí puedes usar imageData como desees
                document.getElementById('getdata').innerHTML=imageData;
                });
            
                const pdfUrl = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
                img.src = pdfUrl;
                console.log('img',img);
            }).catch(error => {
            console.error('Error al cargar el PDF:', error);
            });*/
            /*const pdfData = Buffer.from(base64PDF, 'base64');//atob(base64PDF);
            console.log('pdfData',pdfData);
            const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
            console.log('pdf',pdf);
            const page = await pdf.getPage(0); // Página a renderizar
            const scale = 1.5; // Escala para ajustar el tamaño de la imagen

            const viewport = page.getViewport({ scale });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context, viewport }).promise;

            // Obtener la imagen como base64
            const imageData = canvas.toDataURL('image/png');
            console.log('imageData',imageData); // Aquí puedes usar imageData como desees*/
        }).catch((error)=>console.log(error));
    }

    const aumentar=()=>setPage(Number(page)+1);
    const reducir=()=>setPage(Number(page)-1);

    const Siguiente=async ()=>{
        aumentar();
        //console.log('dataset',page);
            //console.log('llega a la funcion verdatos');
        await axios.get(endPointsbiblioteca.obtenerpaginabiblioteca.url+`${book}/${Number(page)+1}`/*'9/2'id_libro/numpage*/,{headers:{'Authorization':`Bearer ${token}`}}).then(async (response)=>{
            //console.log(response.data);

            //document.getElementById('getdata').innerHTML='<iframe src="data:application/pdf;base64,'+response.data.archivo+'" width="100%" height="600px" frameborder="0"></iframe>';
            //document.getElementById('iframedata').setAttribute('src','data:application/pdf;base64,'+response.data.archivo)
            //sessionStorage.setItem('num_book',book);
            sessionStorage.setItem('page',Number(page)+1);
        });
    }
    const Anterior=async ()=>{
        //console.log('llega a la funcion verdatos');
        //setPage(Number(page)-1);
        reducir();
        //setPage(page-1);
        await axios.get(endPointsbiblioteca.obtenerpaginabiblioteca.url+`${book}/${Number(page)-1}`/*'9/2'id_libro/numpage*/,{headers:{'Authorization':`Bearer ${token}`}}).then(async (response)=>{
            //console.log(response.data);

            //document.getElementById('getdata').innerHTML='<iframe src="data:application/pdf;base64,'+response.data.archivo+'" width="100%" height="600px" frameborder="0"></iframe>';
            //document.getElementById('iframedata').setAttribute('src','data:application/pdf;base64,'+response.data.archivo)
            //setPage(Number(page)-1);
            //sessionStorage.setItem('num_book',book);
            sessionStorage.setItem('page',Number(page)-1);
        });
    }
    console.log('book',book);
    console.log(book);
    console.log('page',page);
    const [panelControl] = useState(localStorage.getItem('panelControl'));
    

    //document.getElementById('getdata').innerHTML='<iframe src="data:application/pdf;base64,'+val+'" width="100%" height="600px" frameborder="0"></iframe>';
 
    return (<>
        {/*panelControl==='1'?<NavBar1/>:panelControl==='2'?<Navbar2/>:panelControl==='3'?<NavBar3/>:<Navbar/>*/}

        { token===null?<div>{/*<Link to="/login">Iniciar Sesion</Link>*/}<Navigate to="/login" /></div>:
        <div>{Object.keys(databook).length>0?<h3 style={{textAlign:"center"}}>{databook.titulo}</h3>:''}
        
        
        <div >{base64Pdf!==''?<center><PdfViewer base64Pdf={base64Pdf} /></center>:<button id="verdatos" onClick={verDatos} >Ver</button>}{/*<iframe hidden id="iframedata" width="100%" height="600px"></iframe>*/}</div>
        {page>1?<button onClick={Anterior}  >anterior</button>:''}
        {page<lim?<button onClick={Siguiente}>siguiente</button> :''}
        
        <div style={{border:'2px solid blue',padding:'3rem'}}>
            <h5>Detalles del Documento</h5>
        {Object.keys(databook).length>0?biblioteca_formdata.map(({datalabel,dataname})=>dataname!=='file'&&dataname!=='fileportada'?<>{datalabel}:{databook[dataname]}<br/></>:''):<marquee>Presione en Ver para cargar los detalles del documento</marquee>}
        </div>
        
    
        
        
        
        </div>
    }
    
    

    </>
    );
}
 

export default VerLibro;