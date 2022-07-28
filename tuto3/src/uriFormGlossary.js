import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import styled from 'styled-components'
import { getSolidDataset, getThing, setStringWithLocale, setThing, saveSolidDatasetAt } from "@inrupt/solid-client";
import { SKOS } from "@inrupt/vocab-common-rdf";

export default function UriFormGlossary(props) {
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

  const { register: registerEdit } = useForm({
    defaultValues : { signification : props.signification }
  });

  const onSubmit = () => {
    props.saveUriGlossary(watch("uriInputGlossary")); // feel input with value
    props.goSetReadyToFetchGlossary();
    props.goSetReadyToDisplayEditForm();
  };

  async function modifySignificationInPod() {
    console.log("Modification de la signification : props.signification =",props.signification)

    props.goSetSignification(document.getElementById("significationInput").value);
    let myProfileDataset = await getSolidDataset(props.uriGlossary, {
        fetch: props.session.fetch
    });
    let profile = await getThing(myProfileDataset, props.uriSelectedTerm);
    profile = setStringWithLocale(profile, SKOS.altLabel, props.signification, "fr");
    myProfileDataset = setThing(myProfileDataset, profile);
    // Write back the dataset to your Pod.
    await saveSolidDatasetAt(props.uriGlossary, myProfileDataset, {
      fetch: props.session.fetch
    });

    // refresh signification in table
    document.getElementById("s["+props.uriSelectedTerm+"]").textContent = props.signification;
  }

  useEffect( () => {
    if (props.signification)
      modifySignificationInPod()
  }, [props.signification])

  const onSubmitEdit = () => {
    modifySignificationInPod();
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
        <P1>Ou de sélectionner un des exemples ci-dessous</P1>
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

      { // Affichage conditionnel du texte indicateur ou du formulaire de modification
        props.readyToFetchGlossary && !props.readyToDisplaySelectedTerm && !props.readyToDisplayEditForm ? (
          <P1>Sélectionnez l'URi souhaitée et cliquez "Lister les termes du lexique"</P1>
        ) : (<P1></P1>)
      }
      { // Affichage conditionnel du texte indicateur ou du formulaire de modification
        props.readyToFetchGlossary && !props.readyToDisplaySelectedTerm ? (
          <P1><b>Le lexique est affiché à droite </b></P1>
        ) : (<P1></P1>)
      }
      { // Affichage conditionnel de la modification d'un terme
        props.readyToFetchGlossary && !props.readyToDisplaySelectedTerm ? (
          <P1>Merci de sélectionner un terme à modifier dans le tableau...</P1>
        ):(<P1></P1>)
      }
      { // Affichage conditionnel de la modification d'un terme
        props.readyToFetchGlossary && props.readyToDisplaySelectedTerm ? (
          <P1><b>Terme sélectionné : </b></P1>
        ):(<P1></P1>)
      }
      {
        props.readyToFetchGlossary && props.readyToDisplayEditForm && !props.readyToDisplaySelectedTerm ? (
            <div>
              <div id="selectedTerm"></div>
              <div id="selectedUri"></div>
            </div>
        ) : (
          <P1></P1>
        )
      }
      {
        props.readyToFetchGlossary && props.readyToDisplayEditForm && props.readyToDisplaySelectedTerm ? (
            <form onSubmit={handleSubmit(onSubmitEdit)}>
              <div id="selectedTerm"></div>
              <div id="selectedUri"></div>
              <input type='text' id='significationInput' { ...registerEdit("signification") } size="50"/>
              <input type="submit" value="Mettre la signification à jour dans le POD"></input>
            </form>
        ) : (
          <P1></P1>
        )
      }
    </>
  );
}
