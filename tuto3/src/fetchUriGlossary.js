import React, { useEffect, useState } from 'react';
import { getSolidDataset, getThingAll, getStringNoLocale, getUrl, getThing, setStringWithLocale, setThing, saveSolidDatasetAt } from "@inrupt/solid-client";
import { SKOS, RDF } from "@inrupt/vocab-common-rdf";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from "react-hook-form";
import styled from 'styled-components'

export default function FetchUriGlossary(props){
  console.log("FetchUriGlossary/props=",props);
  // CSS adaptation
  const P1 = styled.p`
    margin : 0px;
  `;

  const [terms, setTerms] = useState([])
  const [loading, setLoading] = useState(true)

  const { handleSubmit, watch, setValue } = useForm({
    defaultValues : { selectedUri : "", selectedTerm : "", selectedSignification : "" }
  });

  const { register: registerEdit } = useForm({
    defaultValues : { signification : props.signification }
  });

  const onSubmit = () => {
    if (!props.session.info.isLoggedIn)
    {
      document.getElementById("message").textContent = "Please log before...";
      return
    }
    props.goSetReadyToDisplaySelectedTerm();
    props.goSetUriSelectedTerm(watch("selectedUri"));
    props.goSetSignification(watch("selectedSignification"));
    console.log("selectedSignification=",watch("selectedSignification"))
    document.getElementById("selectedUri").textContent = "("+watch("selectedUri")+")";
    document.getElementById("selectedTerm").textContent = watch("selectedTerm");
    document.getElementById("significationInput").value = watch("selectedSignification");
	};

  useEffect( () => {
      (async function () {
        // console.log("affichage du tableau : login =",props.session)
        // if (!props.session || !props.session.info.isLoggedIn) return;
        // props.uriGlossary = https://fluidlog.solidcommunity.net/public/glossary/
        // Get Dataset glossary
        let myProfileDataset = await getSolidDataset(props.uriGlossary, {
          fetch: props.session.fetch
        });
        // Get all things in Dataset
        const myThingAll = await getThingAll(myProfileDataset);
        let myThingList = [];
        let myThingUri, myThingPrefLabel, myThingAltLabel, myThingDefinition;
        let myThingType;
        // For each term, with concept type, get all proprieties
        myThingAll.forEach(item => {
          myThingType = getUrl(item, RDF.type).split("#").pop();
          if (myThingType === "Concept")
          {
            myThingUri = item.url;
            myThingPrefLabel = getStringNoLocale(item, SKOS.prefLabel);
            myThingAltLabel = getStringNoLocale(item, SKOS.altLabel);
            myThingDefinition = getStringNoLocale(item, SKOS.definition);
            myThingList.push({
              "uri" : myThingUri,
              "prefLabel" : myThingPrefLabel,
              "altLabel" : myThingAltLabel,
              "definition" : myThingDefinition,
            })
          }
        });

        console.log("affichage du tableau : myThingList =",myThingList)
        setTerms(myThingList);
        setLoading(false)
     })()
   }, [props.signification]);

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

   if (loading)
    return "chargement..."

    return (
      <>
      { // Affichage conditionnel de la modification d'un terme
        props.readyToFetchGlossary && !props.readyToDisplaySelectedTerm ? (
          <P1>Pour modifier la signification d'un terme, <br/>cliquez sur le bouton "Edition" a droite du terme dans le tableau</P1>
        ):(<P1></P1>)
      }
      {
        props.readyToFetchGlossary && props.readyToDisplaySelectedTerm ? (
          <P1><b>Terme sélectionné : </b></P1>
        ):(<P1></P1>)
      }

      <form onSubmit={handleSubmit(onSubmitEdit)}>
        <div id="selectedTerm"></div>
        <div id="selectedUri"></div>
        <input type='text' id='significationInput' { ...registerEdit("signification") } size="50"/>
        <input type="submit" value="Mettre la signification à jour dans le POD"></input>
      </form>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table>
          <thead>
            <tr>
              <th>Terme</th>
              <th>Signification</th>
              <th>Définition</th>
              <th>Modification</th>
            </tr>
            </thead>
          {terms.map( (t, index) =>
            <tr key={index}>
              <td>{t.prefLabel}</td>
              <td id={"s["+t.uri+"]"}>{t.altLabel}</td>
              <td>{t.definition}</td>
              <td>
                   <IconButton type="submit" onClick={() => {
                         setValue("selectedUri", t.uri);
                         setValue("selectedTerm", t.prefLabel);
                         setValue("selectedSignification", t.altLabel);
                      }}><EditIcon />
                    </IconButton>
              </td>
            </tr>
          )}
        </table>
      </form>
      </>
    )
}
