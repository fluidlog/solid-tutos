import React, { useState } from 'react';
import { useForm } from "react-hook-form";

export default function UriForm(props) {
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({
    defaultValues : { uriInput : props.defaultUri }
  });
  setValue("uri", props.uriInput ? props.uriInput : props.defaultUri )

  const onSubmit = (data) => {
//    console.log("uriInput=", watch("uriInput"));
		props.saveUri(watch("uriInput"));
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
