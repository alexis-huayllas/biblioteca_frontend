const FormFields = ({ formData, formDatafield, handleInputChange }) => {
    
    //console.log('formDatafield',formDatafield);
    const modalidades=[{name:'Trabajo Dirigido',value:'trabajo'},{name:'Proyecto de grado',value:'proyecto'},{name:'Tesis de Grado',value:'tesis'},{name:'Auxiliar de Investigacion',value:'auxiliar'},{name:'Proyecto de Investigacion',value:'proyectoinvestigacion'}];
    const categorias=[{name:'Arquitectura general',value:'Arquitectura general'},
    {name:'Diseño y proyectos',value:'Diseño y proyectos'},
    {name:'Rehabilitación y conservación',value:'Rehabilitacion y conservacion'},
    {name:'Urbanismo y paisajismo',value:'Urbanismo y paisajismo'},
    {name:'Historia y cultura',value:'Historia y cultura'},
    {name:'Referencias y manuales',value:'Referencias y manuales'},
    {name:'Profesionales y ética',value:'Profesionales y ética'},
    {name:'Revistas y publicaciones periódicas',value:'Revistas y publicaciones periodicas'},
    {name:'Exposiciones y congresos',value:'Exposiciones y congresos'},
    {name:'Biografías y premios',value:'Biografias y premios'},
    {name:'Turismo y guías ',value:'Turismo y guias '},
    {name:'Decoraciones y diseño interior',value:'Decoraciones y diseño interior'},
    {name:'Infraestructura educación ',value:'Infraestructura educación '},
    {name:'Infraestructura salud infraestructura deportiva',value:'Infraestructura salud infraestructura deportiva'},
    {name:'Infraestructura cultural ',value:'Infraestructura cultural '},
    {name:'Infraestructura mercado y comercio',value:'Infraestructura mercado y comercio'},
    {name:'Infraestructura espacios públicos y urbanismo',value:'Infraestructura espacios publicos y urbanismo'},
    {name:'Infraestructura instituciones',value:'Infraestructura instituciones'}];
  return (
    <>
        {formDatafield.map(({datalabel,dataname,typedata}) => <>
        {dataname==='file'?
            formData.tipo!=='fisico'?<>
            <label style={{display:'inline-flex',flexDirection:'row',width:'100%',paddingBottom:'2px'}} form={dataname}>
                <p style={{margin:'auto',alignContent:'initial'}}>{datalabel}:</p> 
            <input
                className='form-control w-75'
                type={typedata}
                name={dataname}
                value={formData[dataname]}
                onChange={handleInputChange}
                placeholder={datalabel}
            />
            </label>
            <br /></>:''
            :dataname==='modalidad'?<>
            <label style={{display:'inline-flex',flexDirection:'row',width:'100%',paddingBottom:'2px'}} form={dataname}>
                <p style={{margin:'auto',alignContent:'initial'}}>{datalabel}:</p> 
                <select className='form-control w-75' onChange={handleInputChange} name={dataname}>
                    {!formData[dataname]?<option disabled selected value={''}>seleccione</option>:''}
                    {modalidades.map(({name,value})=>formData[dataname]===value?<option selected value={value}>{name}</option>:<option value={value}>{name}</option>)}
                </select>
            
            </label>
            <br /></>
            :dataname==='categoria'?<>
            <label style={{display:'inline-flex',flexDirection:'row',width:'100%',paddingBottom:'2px'}} form={dataname}>
                <p style={{margin:'auto',alignContent:'initial'}}>{datalabel}:</p> 
                <select className='form-control w-75' onChange={handleInputChange} name={dataname}>
                    {!formData[dataname]?<option disabled selected value={''}>seleccione</option>:''}
                    {categorias.map(({name,value})=>formData[dataname]===value?<option selected value={value}>{name}</option>:<option value={value}>{name}</option>)}
                </select>
            
            </label>
            <br /></>
            :dataname==='cd'?<>
            <label style={{display:'inline-flex',flexDirection:'row',width:'100%',paddingBottom:'2px'}} form={dataname}>
                <p style={{margin:'auto',alignContent:'initial'}}>{datalabel}:</p> 
                <select className='form-control w-75' onChange={handleInputChange} name={dataname}>
                    {!formData[dataname]?<option disabled selected value={''}>seleccione</option>:''}
                    <option value={'si'}>{'si'}</option><option value={'no'}>{'no'}</option>
                </select>
            
            </label>
            <br /></>:dataname==='cantidad'?formData.tipo!=='digital'?<>
            <label style={{display:'inline-flex',flexDirection:'row',width:'100%',paddingBottom:'2px'}} form={dataname}>
                <p style={{margin:'auto',alignContent:'initial'}}>{datalabel}:</p> 
            <input
                className='form-control w-75'
                type={typedata}
                name={dataname}
                value={formData[dataname]}
                onChange={handleInputChange}
                placeholder={datalabel}
            />
            </label>
            <br /></>:''
            :<>
            <label style={{display:'inline-flex',flexDirection:'row',width:'100%',paddingBottom:'2px'}} form={dataname}>
                <p style={{margin:'auto',alignContent:'initial'}}>{datalabel}:</p> 
            <input
                className='form-control w-75'
                type={typedata}
                name={dataname}
                value={formData[dataname]}
                onChange={handleInputChange}
                placeholder={datalabel}
            />
            </label>
            <br /></>}
        </>)}
    </>
  );
}

export default FormFields;
