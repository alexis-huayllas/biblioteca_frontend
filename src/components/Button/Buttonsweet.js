import React from 'react';
import Swal from 'sweetalert2';

const ButtonsSweet = () => {
  const showAlert = () => {
    Swal.fire('¡Hola!', 'Esto es un mensaje de SweetAlert2', 'success');
  };

  return (
    <div>
      <button onClick={showAlert}>Mostrar Alerta</button>
    </div>
  );
};

export default ButtonsSweet;
