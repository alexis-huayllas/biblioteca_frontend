import { useState } from "react";

  export const useFormEdit = (initFormu) => {
    const [formu, setFormu] = useState(initFormu);
    const handlerChangeFormu = ({ target }) => {
      //console.log(target.checked);
      //console.log(target.name, target.value);
      if (target.name==='file'||target.name==='fileportada'){
        if (target.name==='file') {
          setFormu({ ...formu, archivo:target.files[0] });
        } else {
          setFormu({ ...formu, portada:target.files[0] });
        }
        //setFormu({ ...formu, archivo:target.files[0] });
        //setFormu({ ...formu, [target.name]:target.files[0] });
        //setFormu({ ...formu,  archivo: target.files[0] });
        //console.log('target', target.files[0]);
      }else{
        setFormu({ ...formu, [target.name]: target.value });
      }
    };
    const resetFormu = () => {
      setFormu(initFormu);
    };
    
    return [formu, handlerChangeFormu, resetFormu];
  };
  