let global='http://localhost:3002/';
export const endPointsbiblioteca = {
  listabiblioteca: {url: `${global}bibliotecas`,method: "GET",},
  listabibliotecabaja: {url: `${global}bibliotecas/bajas`,method: "GET",},
  listabibliotecadigital: {url: `${global}bibliotecas/digital`,method: "GET",},
  listabibliotecafisica: {url: `${global}bibliotecas/fisico`,method: "GET",},
  verbiblioteca: { url: `${global}bibliotecas/`, method: "GET" },
  //tomarbiblioteca: { url: `${global}bibliotecas/take/all/digital`, method: "GET" },//10 primeros y 10 ultimos por fecha
  tomarbiblioteca: {url: `${global}prestamos/portada/dataindex`,method: "GET"},
  obtenerpaginabiblioteca: { url: `${global}bibliotecas/`, method: "GET" },
  obtenerpaginabibliotecaordenadapor: { url: `${global}bibliotecas/`, method: "GET" },//autor,palabras_clave,titulo
  obtenerpaginabibliotecaordenada: { url: `${global}bibliotecas/order/`, method: "GET" },//autor,palabras_clave,titulo
  buscarbiblioteca: {url: `${global}bibliotecas/buscar/data/type`,method: "POST",},
  registrarbiblioteca: {url: `${global}bibliotecas/`,method: "POST",},
  editarbiblioteca: {url: `${global}bibliotecas/`,method: "PATCH",},
  eliminarbiblioteca: {url: `${global}bibliotecas/`,method: "DELETE",},
  
};

export const endPointsauth = {
  login: {url: `${global}auth/login`,method: "POST",},
  register: {url: `${global}auth/register`,method: "POST",},
  profile1: {url: `${global}auth/profile`,method: "GET",},
  profile2: {url: `${global}auth/profile2`,method: "GET",},
  profile3: {url: `${global}auth/profile3`,method: "GET",},
};

export const endPointsreserva = {
  create: {url: `${global}reserva`,method: "POST",},
  list: {url: `${global}reserva`,method: "GET",},
  //show: {url: `${global}reserva/`,method: "GET",},
  //update: {url: `${global}reserva/`,method: "PATCH",},
  delete: {url: `${global}reserva/`,method: "DELETE",},
};

export const endPointsprestamo = {
  create: {url: `${global}prestamos`,method: "POST",},
  list: {url: `${global}prestamos`,method: "GET",},
  listPrestamos: {url: `${global}prestamos/prestamos`,method: "GET",},
  listDevoluciones: {url: `${global}prestamos/devoluciones`,method: "GET",},
  portada: {url: `${global}prestamos/portada/data`,method: "GET"},
  usuario: {url: `${global}prestamos/user`,method: "GET"},
  perfiles: {url: `${global}prestamos/perfil`,method: "GET"},
  //show: {url: `${global}prestamos/`,method: "GET",},
  update: {url: `${global}prestamos/`,method: "PATCH",},
  delete: {url: `${global}prestamos/`,method: "DELETE",},
};

export const endPointsusuario = {
  portada: {url: `${global}users/portada/data`,method: "GET"},
  baja: {url: `${global}users/data/baja`,method: "GET"},
  listar: {url: `${global}users`,method: "GET",},
  ver: { url: `${global}users/`, method: "GET" },
  registrar: {url: `${global}users/`,method: "POST",},
  editar: {url: `${global}users/`,method: "PATCH",},
  contraseña: {url: `${global}users/passw/data`,method: "PATCH",},
  contraseña_usuario: {url: `${global}users/pass/`,method: "PATCH",},
  eliminar: {url: `${global}users/`,method: "DELETE",},
  profile: { url: `${global}auth/profile`, method: "GET" },
  
};

export const endPointssancion = {
  listar: {url: `${global}sancion`,method: "GET",},
  ver: { url: `${global}sancion/`, method: "GET" },
  registrar: {url: `${global}sancion/`,method: "POST",},
  editar: {url: `${global}sancion/`,method: "PATCH",},
  eliminar: {url: `${global}sancion/`,method: "DELETE",},
  
};

export const endPointsbitacora = {
  listar: {url: `${global}bitacora`,method: "GET",},
  ver: { url: `${global}bitacora/`, method: "GET" },
  registrar: {url: `${global}bitacora/`,method: "POST",},
  editar: {url: `${global}bitacora/`,method: "PATCH",},
  eliminar: {url: `${global}bitacora/`,method: "DELETE",},
  
};

export const endPointsvisualizaciones = {
  listar: {url: `${global}visualizaciones`,method: "GET",},
  ver: { url: `${global}visualizaciones/`, method: "GET" },
  registrar: {url: `${global}visualizaciones/`,method: "POST",},
  editar: {url: `${global}visualizaciones/`,method: "PATCH",},
  eliminar: {url: `${global}visualizaciones/`,method: "DELETE",},
  
};