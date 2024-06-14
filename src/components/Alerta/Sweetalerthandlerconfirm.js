import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySweetAlert = withReactContent(Swal);

const SweetAlertHandlerConfirm = ({titulo,texto,icono,link}) => {
    MySweetAlert.fire({
      title: titulo,//'¡Hola!',
      text: texto,//'Este es un mensaje de SweetAlert en React.',
      icon: icono,//'success',
      confirmButtonText: 'Aceptar',
      
    }).then((result) => {if (result.isConfirmed) { link();}});
};
export default SweetAlertHandlerConfirm;
