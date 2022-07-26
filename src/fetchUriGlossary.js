import React, { useEffect, useState } from 'react';
import { getSolidDataset, getThingAll, getThing, getStringWithLocale, getStringNoLocale, getUrl } from "@inrupt/solid-client";
import { SKOS, RDF } from "@inrupt/vocab-common-rdf";

export default function FetchUriGlossary(props){
  const [terms, setTerms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  console.log("FetchUriGlossary/props=",props);

  useEffect( () => {
      (async function () {
        // https://fluidlog.solidcommunity.net/public/glossary/
        // Get Dataset glossary
        let myDataset = await getSolidDataset(props.uriGlossary+"terms.ttl");
        // Get all things in Dataset
        let myThingAll = await getThingAll(myDataset);
        let myThingList = [];
        let myThingPrefLabel, myThingAltLabel, myThingDefinition;
        let myThingType;
        // For each term, with concept type, get the altLabel
        myThingAll.forEach(item => {
          myThingType = getUrl(item, RDF.type).split("#").pop();
          if (myThingType === "Concept")
          {
            myThingPrefLabel = getStringWithLocale(item, SKOS.prefLabel, "fr");
            myThingAltLabel = getStringWithLocale(item, SKOS.altLabel, "fr");
            myThingDefinition = getStringWithLocale(item, SKOS.definition, "fr");
            myThingList.push({
              "prefLabel" : myThingPrefLabel,
              "altLabel" : myThingAltLabel,
              "definition" : myThingDefinition,
            })
          }
        });

        setTerms(myThingList);
        console.log("myThingList=",myThingList);
        setLoading(false)
     })()
   }, [props.goFetchGlossary]);

    if (loading)
      return "chargement..."

    if (error)
      return "Erreur lors de l'interrogation de l'URi..."

    return <table><thead><tr>
    <th>Terme</th>
    <th>Signification</th>
    <th>Définition</th>
    <th>Modification</th>
    </tr>
    </thead>
      {terms.map( (t, index) =>
        <tr key={index}>
          <td>{t.prefLabel}</td>
          <td>{t.altLabel}</td>
          <td>{t.definition}</td>
        </tr>
      )}
    </table>
}