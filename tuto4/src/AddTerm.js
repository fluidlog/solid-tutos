import {
  addStringNoLocale,
  addUrl,
  createThing,
  saveSolidDatasetAt,
  setThing,
} from "@inrupt/solid-client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SKOS } from "@inrupt/vocab-common-rdf";
import styled from 'styled-components'

const TYPE_PREDICATE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
const GLOSSARY_URL = "https://portal.carto4ch.huma-num.fr/glossary/";

function AddTerm(props) {
  const ShortInput = styled.input`
    width: auto;
    size:50;
  `;

  const Palert = styled.p`
    font-weight: bold;
    color: palevioletred;
  `;

  const Asterisk = styled.span`
    font-weight: bold;
    color: palevioletred;
  `;

  const [termText, setTermText] = useState("");
  const [significationText, setSignificationText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const addterm = async (termText, significationText, descriptionText) => {
//    console.log("addterm",termText+"/"+significationText+"/"+descriptionText)
    // Create object with all triplets
    const termWithType = addUrl(createThing({ url : GLOSSARY_URL+termText}), TYPE_PREDICATE, SKOS.Concept);
    const termWithPrefLabel = addStringNoLocale(termWithType, SKOS.prefLabel, termText);
    const termWithAltLabel = addStringNoLocale(termWithPrefLabel, SKOS.altLabel, significationText);
    const termWithDefinition = addStringNoLocale(termWithAltLabel, SKOS.definition, descriptionText);

    const updatedTermList = setThing(props.termList, termWithDefinition);
    const updatedDataset = await saveSolidDatasetAt(props.uriGlossary, updatedTermList, {
      fetch: props.session.fetch,
    });
    props.goSetTermList(updatedDataset);
  };

  const onSubmit = (data) => {
//    console.log("onSubmit data=",data)
    if (!props.session.info.isLoggedIn)
    {
      document.getElementById("message").textContent = "Please log before!";
      return
    }
    setTermText(data.termText)
    setSignificationText(data.significationText)
    setDescriptionText(data.descriptionText)
    addterm(data.termText, data.significationText, data.descriptionText);
    reset()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Term <Asterisk>*</Asterisk>
      <input
        name="term"
        type="text"
        { ...register("termText", {
          required: {
            value: "required",
            message: "Term is required"
          },
          maxLength: {
            value: 30,
            message: "Max length is 30"
          }
        }) }
      />
      {errors.termText && <Palert>{errors.termText.message}</Palert>}

      Signification <Asterisk>*</Asterisk>
      <input
        name="signification"
        type="text"
        { ...register("significationText", {
          required: {
            value: "required",
            message: "Signification is required"
          },
          maxLength: {
            value: 90,
            message: "Max length is 90"
          }
        }) }
      />
      {errors.significationText && <Palert>{errors.significationText.message}</Palert>}

      Description<input type="text" { ...register("descriptionText") } />

      <input type="submit" value="Ajouter un terme"></input>
    </form>
  );
}

export default AddTerm;
