import React from 'react';
import TableRow from './TableRow';

const Tables = ({ data, handleRowClick, rows, tipodata }) => {
  //data=JSON.parse(JSON.stringify(data));
  return (
    <table style={{backgroundImage:'none'}} className='table table-hover'>
      <thead >
        <tr>
          <th>nro</th>
          {rows.map(({headerdatatable})=><th>{headerdatatable}</th>)}
          {tipodata!=='bitacora'?
          <th>acciones</th>
          :''}
        </tr>
      </thead>
      <tbody>
        {data.length>0?data.map((item,numero)=>
          <TableRow numero={numero+1} key={item.id} item={item} handleRowClick={handleRowClick} cols={rows} tipodata={tipodata}/>
        ):<tr><td colSpan={2+rows.length} style={{textAlign:'center'}}>no hay datos para mostrar</td></tr>}
      </tbody>
    </table>
  );
};

export default Tables;
