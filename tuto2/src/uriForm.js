import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import styled from 'styled-components'

export default function UriForm(props) {
  // CSS adaptation
  const P1 = styled.p`
    margin : 0px;
  `;

  const HighInput = styled.input`
    width: auto;
    display: inline-block;
    line-height: 2;
  `;

  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({
    defaultValues : { uriInput : props.defaultUri }
  });

  const onSubmit = () => {
//    console.log("uriInput=", watch("uriInput"));
		props.saveUri(watch("uriInput")); // feel input with value
    props.goFetch(true);
	};

  const [selectedOption, setSelectedOption] = useState(props.options[0].value);

  const onChange = (e) => {
    console.log("e.target.value=", e.target.value);
    setSelectedOption(e.target.value)
    setValue("uriInput", e.target.value)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HighInput type='text' { ...register("uriInput") } size="50"/>
      <IconButton aria-label="delete" onClick={() => {
          setValue("uriInput", props.options[0].uri);
          setSelectedOption(props.options[0].value)
        }}><RefreshIcon />
      </IconButton>
      <P1>Ou de sélectionner un des exemples ci-dessous</P1>
      <select {...register("selectedUri")}
          value={selectedOption}
          onChange={onChange}
          width="50">
      {props.options.map((item) => (
        <option key={item.value} value={item.uri}>
          {item.uri}
        </option>
      ))}
      </select>

      <input type="submit" value="Lister les ressources"></input>

      <p className="has-error">{errors.uriInput?.message}</p>
    </form>
  );
}
