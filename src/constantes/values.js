// datos para bibliotecas
export const biblioteca_initform={
    titulo:'',
    autor:'',
    //tituloColeccion:'',
    anoPublicacion:'',
    editorial:'',
    edicion:'',
    volumen:'',
    isbn:'',
    archivo:null,
    portada:null,
    reseña:'',
    palabras_clave:'',
    tipo:'fisico',
    cantidad:'0',
    estado:'disponible',
    tutor:'',
    seleccion:'',
    modalidad:'',
    adquisicion:'',
    categoria:'',
    tipolibro:''

};

export const biblioteca_formdata=[
    //{dataname:'id',typedata:'text',datavalue:''},
    {datalabel:'Titulo',dataname:'titulo',typedata:'text',datavalue:''},
    {datalabel:'Autor',dataname:'autor',typedata:'text',datavalue:''},
    {datalabel:'Categoria',dataname:'categoria',typedata:'select',datavalue:''},
    //{datalabel:'Coleccion',dataname:'tituloColeccion',typedata:'text',datavalue:''},
    {datalabel:'Año de Publicacion',dataname:'anoPublicacion',typedata:'text',datavalue:''},
    {datalabel:'Editorial',dataname:'editorial',typedata:'text',datavalue:''},
    {datalabel:'Edicion',dataname:'edicion',typedata:'text',datavalue:''},
    {datalabel:'Volumen',dataname:'volumen',typedata:'text',datavalue:''},
    {datalabel:'Codigo',dataname:'isbn',typedata:'text',datavalue:''},
    {datalabel:'Archivo',dataname:'file',typedata:'file',datavalue:null},
    {datalabel:'Portada',dataname:'fileportada',typedata:'file',datavalue:null},
    //file es del campo archivo, compara y lo añade al formulario como archivo omitiendo lo del nombre file
    {datalabel:'Reseña',dataname:'reseña',typedata:'text',datavalue:''},
    {datalabel:'Palabras Clave',dataname:'palabras_clave',typedata:'text',datavalue:''},
    //{datalabel:'Tipo',dataname:'tipo',typedata:'text',datavalue:''},
    {datalabel:'Cantidad',dataname:'cantidad',typedata:'text',datavalue:''},
    {datalabel:'Via de Adquisicion',dataname:'adquisicion',typedata:'text',datavalue:''},
    {datalabel:'Tipo (original/copia)',dataname:'tipolibro',typedata:'text',datavalue:''},
    {datalabel:'Estado',dataname:'estado',typedata:'text',datavalue:''}
];

export const biblioteca_formdata_tesis=[
    //{dataname:'id',typedata:'text',datavalue:''},
    {datalabel:'Titulo',dataname:'titulo',typedata:'text',datavalue:''},
    {datalabel:'Autor',dataname:'autor',typedata:'text',datavalue:''},
    {datalabel:'Tutor',dataname:'tutor',typedata:'text',datavalue:''},
    {datalabel:'Modalidad',dataname:'modalidad',typedata:'select',datavalue:''},
    {datalabel:'Categoria',dataname:'categoria',typedata:'select',datavalue:''},
    //{datalabel:'Coleccion',dataname:'tituloColeccion',typedata:'text',datavalue:''},
    {datalabel:'Año',dataname:'anoPublicacion',typedata:'text',datavalue:''},
    //{datalabel:'Editorial',dataname:'editorial',typedata:'text',datavalue:''},
    //{datalabel:'Edicion',dataname:'edicion',typedata:'text',datavalue:''},
    //{datalabel:'Volumen',dataname:'volumen',typedata:'text',datavalue:''},
    //{datalabel:'Codigo',dataname:'isbn',typedata:'text',datavalue:''},
    {datalabel:'Archivo',dataname:'file',typedata:'file',datavalue:null},
    {datalabel:'Portada',dataname:'fileportada',typedata:'file',datavalue:null},
    {datalabel:'CD',dataname:'cd',typedata:'text',datavalue:''},
    //file es del campo archivo, compara y lo añade al formulario como archivo omitiendo lo del nombre file
    {datalabel:'Reseña',dataname:'reseña',typedata:'text',datavalue:''},
    {datalabel:'Palabras Clave',dataname:'palabras_clave',typedata:'text',datavalue:''},
    //{datalabel:'Tipo',dataname:'tipo',typedata:'text',datavalue:''},
    {datalabel:'Cantidad',dataname:'cantidad',typedata:'text',datavalue:''},
    {datalabel:'Estado',dataname:'estado',typedata:'text',datavalue:''}
];

export const biblioteca_tabledata=[
    //{headerdatatable:'id',bodydatatable:'id'},
    {headerdatatable:'Titulo',bodydatatable:'titulo'},
    {headerdatatable:'Autor',bodydatatable:'autor'},
    //{headerdatatable:'archivo',bodydatatable:'archivo'},
    {headerdatatable:'Reseña',bodydatatable:'reseña'},
    {headerdatatable:'Palabras Clave',bodydatatable:'palabras_clave'},
    {headerdatatable:'Tipo',bodydatatable:'tipo'},
    {headerdatatable:'Cantidad',bodydatatable:'cantidad'},
    {headerdatatable:'Estado',bodydatatable:'estado'}
];

export const usuario_initform={
    name:'',
    last_name:'',
    usuario:'',
    password:"",
    repassword:""
};

export const usuario_formdata=[
    {datalabel:'nombre',dataname:'name',typedata:'text',datavalue:""},
    {datalabel:'apellidos',dataname:'last_name',typedata:'text',datavalue:""},
    {datalabel:'usuario',dataname:'usuario',typedata:'email',datavalue:""},
    {datalabel:'Contraseña',dataname:'password',typedata:'password',datavalue:""},
    {datalabel:'ReContraseña',dataname:'repassword',typedata:'password',datavalue:""}
];


export const usuario_initformedit={
    name:'',
    last_name:'',
    usuario:'',
    role:"externo"
};

export const usuario_formdataedit=[
    {datalabel:'nombre',dataname:'name',typedata:'text',datavalue:""},
    {datalabel:'apellidos',dataname:'last_name',typedata:'text',datavalue:""},
    {datalabel:'usuario',dataname:'usuario',typedata:'email',datavalue:""},
    {datalabel:'Rol',dataname:'role',typedata:'select',datavalue:""}
];



export const persona_initform={
    name:'',
    last_name:'',
    usuario:'',
    password:"",
    role:"externo"
};

export const persona_formdata=[
    {datalabel:'nombre',dataname:'name',typedata:'text',datavalue:""},
    {datalabel:'Apellido',dataname:'last_name',typedata:'text',datavalue:""},
    {datalabel:'usuario',dataname:'usuario',typedata:'text',datavalue:""},
    {datalabel:'Contraseña',dataname:'password',typedata:'password',datavalue:""},
    {datalabel:'Rol',dataname:'role',typedata:'select',datavalue:""}
];

export const persona_tabledata=[
    {headerdatatable:'nombre',bodydatatable:'name'},
    {headerdatatable:'Apellido',bodydatatable:'last_name'},
    {headerdatatable:'usuario',bodydatatable:'usuario'},
    //{headerdatatable:'password',bodydatatable:'password'},
    {headerdatatable:'rol',bodydatatable:'role'}
];

export const personaprov_formdata=[
    {dataname:'nombre',typedata:'text',datavalue:""},
    {dataname:'apellidopaterno',typedata:'text',datavalue:""},
    {dataname:'apellidomaterno',typedata:'text',datavalue:""},
    {dataname:'ci',typedata:'text',datavalue:""},
    {dataname:'telefono',typedata:'text',datavalue:""},
    {dataname:'direccion',typedata:'text',datavalue:""},
    {dataname:'email',typedata:'text',datavalue:""},
];

export const personaprov_tabledata=[
    {headerdatatable:'nombre',bodydatatable:'nombre'},
    {headerdatatable:'apellidopaterno',bodydatatable:'apellidopaterno'},
    {headerdatatable:'apellidomaterno',bodydatatable:'apellidomaterno'},
    {headerdatatable:'ci',bodydatatable:'ci'},
    {headerdatatable:'telefono',bodydatatable:'telefono'},
    {headerdatatable:'direccion',bodydatatable:'direccion'},
    {headerdatatable:'email',bodydatatable:'email'}
];

export const rol_initform={
    nombre:''
};

export const rol_formdata=[
    {dataname:'nombre',typedata:'text',datavalue:""}
];

export const rol_tabledata=[
    {headerdatatable:'nombre',bodydatatable:'nombre'}
];


export const reserva_initform={
    fecha_reserva:'',
    libro_id:'',
    usuario_id:''
};

export const reserva_formdata=[
    {datalabel:'fecha_reserva',dataname:'fecha_reserva',typedata:'date',datavalue:""},
    {datalabel:'libro',dataname:'libro_id',typedata:'select',datavalue:""},
    {datalabel:'usuario',dataname:'usuario_id',typedata:'select',datavalue:""}
];

export const reserva_tabledata=[
    {headerdatatable:'fecha',bodydatatable:'fecha_reserva'},
    {headerdatatable:'libro',bodydatatable:'libro_id'},
    {headerdatatable:'usuario',bodydatatable:'usuario_id'}
];

export const prestamo_initform={
    fecha_prestamo:'',
    tiempo_limite:'2',
    //fecha_devolucion:'',
    id_documento:'',
    id_reserva:'',
    id_usuario:'',
    //id_sancion:''
    tipoprestamo:'',
    carrera:'',
    materia:'',
    grado:'',

};

export const prestamo_formdata=[
    {datalabel:'fecha prestamo',dataname:'fecha_prestamo',typedata:'date',datavalue:""},
    {datalabel:'tiempo limite (Dias)',dataname:'tiempo_limite',typedata:'text',datavalue:""},
    //{datalabel:'fecha devolucion',dataname:'fecha_devolucion',typedata:'text',datavalue:""},
    {datalabel:'reserva',dataname:'id_reserva',typedata:'select',datavalue:""},
    {datalabel:'documento',dataname:'id_documento',typedata:'select',datavalue:""},
    {datalabel:'usuario',dataname:'id_usuario',typedata:'select',datavalue:""},
    //{datalabel:'tipoprestamo',dataname:'tipoprestamo',typedata:'text',datavalue:""},
    {datalabel:'Carrera/Institucion',dataname:'carrera',typedata:'text',datavalue:""},
    {datalabel:'materia',dataname:'materia',typedata:'text',datavalue:""},
    {datalabel:'grado',dataname:'grado',typedata:'text',datavalue:""},
    //{datalabel:'sancion',dataname:'id_sancion',typedata:'text',datavalue:""}
];

export const prestamotabledata=[
    {headerdatatable:'fecha prestamo',bodydatatable:'fecha_prestamo'},
    {headerdatatable:'tiempo limite (Dias)',bodydatatable:'tiempo_limite'},
    //{headerdatatable:'fecha devolucion',bodydatatable:'fecha_devolucion'},
    {headerdatatable:'documento',bodydatatable:'id_documento'},
    {headerdatatable:'reserva',bodydatatable:'id_reserva'},
    {headerdatatable:'usuario',bodydatatable:'id_usuario'},
    {headerdatatable:'Carrera/Institucion',bodydatatable:'carrera'},
    {headerdatatable:'Materia',bodydatatable:'materia'},
    //{headerdatatable:'sancion',bodydatatable:'id_sancion'}
];


export const devolucion_initform={
    //prestamo_id:'',
    fecha_devolucion:'',
    id_sancion:'',
    estado_sancion:'cancelado'
};

export const devolucion_formdata=[
    {datalabel:'fecha devolucion',dataname:'fecha_devolucion',typedata:'date',datavalue:""},
    //{datalabel:'Prestamo',dataname:'prestamo_id',typedata:'select',datavalue:""},
    {datalabel:'sancion',dataname:'id_sancion',typedata:'select',datavalue:""},
    {datalabel:'Estado(cancelado/sin cancelar)',dataname:'estado_sancion',typedata:'text',datavalue:""}
];

export const devoluciontabledata=[
    {headerdatatable:'fecha devolucion',bodydatatable:'fecha_devolucion'},
    {headerdatatable:'tiempo limite',bodydatatable:'tiempo_limite'},
    {headerdatatable:'documento',bodydatatable:'id_documento'},
    {headerdatatable:'reserva',bodydatatable:'id_reserva'},
    {headerdatatable:'usuario',bodydatatable:'id_usuario'},
    {headerdatatable:'sancion',bodydatatable:'id_sancion'},
    {headerdatatable:'Estado',bodydatatable:'estado_sancion'}
];


export const sancion_initform={
    detalle:'',
    penalizacion:'',
    multa:''
};

export const sancion_formdata=[
    {datalabel:'detalle',dataname:'detalle',typedata:'text',datavalue:""},
    {datalabel:'penalizacion',dataname:'penalizacion',typedata:'text',datavalue:""},
    {datalabel:'multa',dataname:'multa',typedata:'text',datavalue:""}
];

export const sancion_tabledata=[
    {headerdatatable:'detalle',bodydatatable:'detalle'},
    {headerdatatable:'penalizacion',bodydatatable:'penalizacion'},
    {headerdatatable:'multa',bodydatatable:'multa'}
];

export const bitacora_initform={
    fecha_evento:'',
    detalle:'',
    contenido:'',
    usuario_id:'',
    //estado:''
};

export const bitacora_formdata=[
    {datalabel:'fecha_evento',dataname:'fecha_evento',typedata:'text',datavalue:""},
    {datalabel:'detalle',dataname:'detalle',typedata:'text',datavalue:""},
    {datalabel:'contenido',dataname:'contenido',typedata:'text',datavalue:""},
    {datalabel:'usuario_id',dataname:'usuario_id',typedata:'text',datavalue:""},
    //{datalabel:'estado',dataname:'estado',typedata:'text',datavalue:""}
];

export const bitacora_tabledata=[
    {headerdatatable:'fecha',bodydatatable:'fecha_evento'},
    {headerdatatable:'detalle',bodydatatable:'detalle'},
    {headerdatatable:'contenido',bodydatatable:'contenido'},
    //{headerdatatable:'usuario_id',bodydatatable:'usuario_id'},
    //{headerdatatable:'estado',bodydatatable:'estado'}
];






