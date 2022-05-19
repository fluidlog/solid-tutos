import React, { useState } from 'react';
import { useForm } from "react-hook-form";

export default function UriForm(props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues : { uriInput : props.defaultUri }
  });
  const [ uri, setUri ] = useState();

//  console.log(watch("uriInput")); // watch input value by passing the name of it

  return (
    <form onSubmit={ handleSubmit(dataInput => {
        setUri(dataInput.uriInput);
        console.log("dataInput = ",dataInput)
      }
    )}>
      <input {...register("uriInput", {required : "Merci de renseigner une uri..."})} size="80" />

      <input type="submit" value="Lister les ressources"></input>
      <p className="App-error">{errors.uriInput?.message}</p>
    </form>
  );
}
