import { useState } from "react";

  export const useForm = (initForm) => {
    const [form, setForm] = useState(initForm);
    const handlerChangeForm = ({ target }) => {
      //console.log(target.checked);
      //console.log(target.name, target.value);
      if (target.name==='file'||target.name==='fileportada'){
        if (target.name==='file') {
          setForm({ ...form, archivo:target.files[0] });
        } else {
          setForm({ ...form, portada:target.files[0] });
        }
        //setForm({ ...form, [target.name]:target.files[0] });
        //setForm({ ...form,  archivo: target.files[0] });
        //console.log('target', target.files[0]);
      }else{
        setForm({ ...form, [target.name]: target.value });
      }
    };
    const resetForm = () => {
      setForm(initForm);
    };
    
    return [form, handlerChangeForm, resetForm];
  };
  