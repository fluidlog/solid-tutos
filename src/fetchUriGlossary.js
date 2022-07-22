import React, { useEffect, useState } from 'react';
import { getSolidDataset, getThingAll } from "@inrupt/solid-client";
import { SCHEMA_INRUPT } from "@inrupt/vocab-common-rdf";

export default function FetchUriGlossary(props){
  const [terms, setTerms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  console.log("FetchUriGlossary/props=",props);

  useEffect( () => {
      (async function () {
        // https://fluidlog.solidcommunity.net/public/glossary/
        let myDataset = await getSolidDataset(props.uriGlossary);
        let myDatasetGraphs = myDataset["graphs"];
        let myDatasetGraphsDefault = myDatasetGraphs["default"];
        console.log("myDatasetGraphsDefault",myDatasetGraphsDefault);

        let myThing = await getThingAll(myDataset);
        let myThingList = [];
        myThing.forEach(item => {
          console.log("item.url",item.url);
            myThingList.push(item.url.split("/").pop())
        });

        setTerms(myThingList);
        setLoading(false)
     })()
   }, [props.goFetchGlossary]);

    if (loading)
      return "chargement..."

    if (error)
      return "Erreur lors de l'interrogation de l'URi..."

    return <ul>
      {terms.map( (t, index) => <li key={index}>{t}</li>)}
    </ul>
}
