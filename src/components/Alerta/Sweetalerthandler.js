import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySweetAlert = withReactContent(Swal);

const SweetAlertHandler = ({titulo,texto,icono}) => {
    MySweetAlert.fire({
      title: titulo,//'¡Hola!',
      text: texto,//'Este es un mensaje de SweetAlert en React.',
      icon: icono,//'success',
      confirmButtonText: 'Aceptar',
      
    });
};

export default SweetAlertHandler;
