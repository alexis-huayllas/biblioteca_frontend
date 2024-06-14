import React, { useEffect } from 'react';
//import { PDFViewer, PDFDownloadLink } from 'react-pdf-js';
import { Document, Page, Text, View, PDFViewer } from '@react-pdf/renderer';

const PdfViewer = ({ base64Pdf }) => {

  useEffect(() => {
    const disableCopy = (e) => {
      e.preventDefault();
      alert('¡Copiar está deshabilitado en esta página!');
    };

    const disablesave = (e) => {
      if (e.which==83&&(navigator.userAgent.includes('Mac')?e.metaKey:e.ctrlKey)) {
        e.preventDefault();
        e.stopPropagation();
        alert('guardar está deshabilitado en esta página!');
      }
      if (e.which==80&&(navigator.userAgent.includes('Mac')?e.metaKey:e.ctrlKey)) {
        e.preventDefault();
        e.stopPropagation();
        alert('imprimir está deshabilitado en esta página!');
      }
      //alert('¡Copiar está deshabilitado en esta página!');
    };

    const disabledermouse=(e)=> {
      e.preventDefault();
      alert('¡La función clic derecho está deshabilitada!');
    };

    document.addEventListener('copy', disableCopy);
    document.addEventListener('keydown', disablesave,false);
    document.addEventListener('contextmenu', disabledermouse);
    //document.addEventListener('mousedown', disableCopy);

    return () => {
      document.removeEventListener('copy', disableCopy);
      document.removeEventListener('keydown', disablesave);
      document.removeEventListener('contextmenu', disabledermouse);
  };
  }, []);
  /*return (
    <div>
      <h2>Visor de PDF</h2>
      <PDFViewer
        document={{
          base64: base64Pdf,
        }}
      />
      <PDFDownloadLink
        document={{
          base64: base64Pdf,
        }}
        fileName="documento.pdf"
      >
        Descargar PDF
      </PDFDownloadLink>
    </div>
    ----return(
    <PDFViewer width="600" height="800">
      <iframe
        style={{ width: '100%', height: '100%' }}
        src={`data:application/pdf;base64,${base64Pdf}`}
        type="application/pdf"
      />
    </PDFViewer>)-----
  );*/
  return (<>
    {/*<iframe
    id='disa'
    onLoad={()=>{window.frames["disa"].document.oncontextmenu=function () {
      alert('way');return false;
    }}}
    
      style={{ width: '100%', height: '800px' }}
      src={`data:application/pdf;base64,${base64Pdf}#toolbar=0&navpanes=0&statusbar=0&view=Fit;readonly=true;disableprint=true;`}
      type="application/pdf"
    />*/}
    <PDFViewer width="100%" height="800" src={`data:application/pdf;base64,${base64Pdf}#toolbar=0&navpanes=0&statusbar=0&view=Fit;readonly=true;disableprint=true;`}>
    
      </PDFViewer>
  </>);
};

export default PdfViewer;
