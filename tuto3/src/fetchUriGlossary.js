import React, { useEffect, useState } from 'react';
import { getSolidDataset, getThingAll, getStringWithLocale, getUrl } from "@inrupt/solid-client";
import { SKOS, RDF } from "@inrupt/vocab-common-rdf";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from "react-hook-form";

export default function FetchUriGlossary(props){
  console.log("FetchUriGlossary/props=",props);
  const [terms, setTerms] = useState([])
  const [loading, setLoading] = useState(true)

  const { handleSubmit, watch, setValue } = useForm({
    defaultValues : { selectedUri : "", selectedTerm : "", selectedSignification : "" }
  });

  const onSubmit = () => {
    props.goSetReadyToDisplaySelectedTerm();
    props.goSetUriSelectedTerm(watch("selectedUri"));
    props.goSetSignification(watch("selectedSignification"));
    document.getElementById("selectedUri").textContent = "("+watch("selectedUri")+")";
    document.getElementById("selectedTerm").textContent = watch("selectedTerm");
    document.getElementById("significationInput").value = watch("selectedSignification");
	};

  useEffect( () => {
      (async function () {
        console.log("affichage du tableau : login =",props.session)
        if (!props.session || !props.session.info.isLoggedIn) return;
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
            myThingPrefLabel = getStringWithLocale(item, SKOS.prefLabel, "fr");
            myThingAltLabel = getStringWithLocale(item, SKOS.altLabel, "fr");
            myThingDefinition = getStringWithLocale(item, SKOS.definition, "fr");
            myThingList.push({
              "uri" : myThingUri,
              "prefLabel" : myThingPrefLabel,
              "altLabel" : myThingAltLabel,
              "definition" : myThingDefinition,
            })
          }
        });

        setTerms(myThingList);
        setLoading(false)
     })()
   }, [props.signification]);

    if (loading)
    {
      if (props.session.info.isLoggedIn)
        return "chargement..."
      else {
        return "Please log before..."
      }
    }

    return (
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
    )
}
