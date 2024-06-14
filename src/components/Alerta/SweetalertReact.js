import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySweetAlert = withReactContent(Swal);

const SweetAlertReact = ({titulo,texto,icono}) => {
  const showAlert = () => {
    MySweetAlert.fire({
      title: titulo,//'¡Hola!',
      text: texto,//'Este es un mensaje de SweetAlert en React.',
      icon: icono,//'success',
      confirmButtonText: 'Aceptar',
    });
  };

  return (
    <div>
      <button onClick={showAlert}>Mostrar Alerta</button>
    </div>
  );
};

export default SweetAlertReact;
