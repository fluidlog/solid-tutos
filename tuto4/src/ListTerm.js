import React, { useEffect, useState } from 'react';
import { getSolidDataset, getThingAll, getDatetime, getUrl, getStringWithLocale, addStringNoLocale, createThing, saveSolidDatasetAt } from "@inrupt/solid-client";
import { SKOS, RDF } from "@inrupt/vocab-common-rdf";
import {
  Table,
  TableColumn
} from "@inrupt/solid-ui-react";

const TEXT_PREDICATE = "http://schema.org/text";
const TEXT_PREFLABEL = "http://www.w3.org/2004/02/skos/core#prefLabel"
const CREATED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#created";
const TYPE_PREDICATE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";

export default function ListTerm(props){
  console.log("ListTerm/props=",props);

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!props.session || !props.session.info.isLoggedIn) return;
    (async () => {
      const profileDataset = await getSolidDataset(props.uriGlossary, {
        fetch: props.session.fetch,
      });
      const termList = await getSolidDataset(props.uriGlossary, {
        fetch: props.session.fetch
      });
      props.goSetTermList(termList);
      setLoading(false)
    })();
  }, [props.session, props.session.info.isLoggedIn]);

  console.log("props.termList=",props.termList);

  const termThings = props.termList ? getThingAll(props.termList) : [];
  termThings.sort((a, b) => {
    return (
      getDatetime(a, CREATED_PREDICATE) - getDatetime(b, CREATED_PREDICATE)
    );
  });

  console.log("termThings=",termThings);

   const thingsArray = termThings
//     .filter((t) => getUrl(t, TYPE_PREDICATE) === TODO_CLASS)
     .map((t) => {
       return { dataset: props.termList, thing: t };
     });

  console.log("thingsArray=",thingsArray);

   if (!thingsArray.length)
    return null;

   if (loading)
    return "chargement..."

    return (
      <>
      <Table className="table" things={thingsArray}>
        <TableColumn
          property={TEXT_PREFLABEL}
          header="Terme"
          sortable
        />
      </Table>
    </>
    )
}

