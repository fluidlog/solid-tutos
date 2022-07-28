import React, { useState } from 'react';
// import { useForm } from "react-hook-form";

export default function Form({ inputValue, changeInputValue, doFetch }) {
  console.log("doFetch=",doFetch);

  const handleSubmit = (evt) => {
    console.log("evt=",evt);

    evt.preventDefault();
      doFetch(true);
    }

  const handleChange = (evt) => {
    changeInputValue(evt.target.value);
  };

  return (
    <div>
        <input
          value={inputValue}
          onChange={handleChange}
          size="80" />
         <input type="submit" onSubmit={handleSubmit} value="Lister les ressources"></input>
     </div>
  )
};
