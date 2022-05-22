import React, { useState } from 'react';
import { useForm } from "react-hook-form";

export default function UriForm(props) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues : { uriInput : props.defaultUri }
  });

  const onSubmit = (data) => {
    console.log("data.uriInput", data.uriInput)
		props.saveUri(data.uriInput);
    props.goFetch(true);
	};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='text' name='uri' {...register("uriInput", {required : "Merci de renseigner une uri..."})} size="80" />

      <input type="submit" value="Lister les ressources"></input>
      <p className="has-error">{errors.uriInput?.message}</p>
    </form>
  );
}
