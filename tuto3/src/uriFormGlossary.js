import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import styled from 'styled-components'
import { SKOS } from "@inrupt/vocab-common-rdf";

export default function UriFormGlossary(props) {
  console.log("FetchUriGlossary/props=",props);
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
    defaultValues : { uriInputGlossary : props.uriGlossary }
  });

  const onSubmit = () => {
    props.saveUriGlossary(watch("uriInputGlossary")); // feel input with value
    props.goSetReadyToFetchGlossary();
    props.goSetReadyToDisplayEditForm();
  };

  const [selectedOption, setSelectedOption] = useState(props.options[0].value);

  const onChange = (e) => {
    setSelectedOption(e.target.value)
    setValue("uriInputGlossary", e.target.value)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HighInput type='text' { ...register("uriInputGlossary") } size="50"/>
        <IconButton aria-label="delete" onClick={() => {
            setValue("uriInputGlossary", props.options[0].uri);
            setSelectedOption(props.options[0].value)
          }}><RefreshIcon />
        </IconButton>
        <P1>Ou de sélectionner un des Lexiques ci-dessous</P1>
        <select {...register("selectedUriGlossary")}
            value={selectedOption}
            onChange={onChange}
            width="50">
        {props.options.map((item) => (
          <option key={item.value} value={item.uri}>
            {item.uri}
          </option>
        ))}
        </select>

        <input type="submit" value="Lister les termes du lexique"></input>

        <p className="has-error">{errors.uriInput?.message}</p>
      </form>
    </>
  );
}
