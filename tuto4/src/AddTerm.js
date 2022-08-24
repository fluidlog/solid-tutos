import {
  addDatetime,
  addStringNoLocale,
  addUrl,
  createThing,
  getSourceUrl,
  saveSolidDatasetAt,
  setThing,
} from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SKOS, RDF } from "@inrupt/vocab-common-rdf";

const TEXT_PREDICATE = "http://schema.org/text";
const CREATED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#created";
const TERM_CLASS = "http://www.w3.org/2002/12/cal/ical#Vterm";
const TYPE_PREDICATE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
const GLOSSARY_NAME = "carto4chglo"
const GLOSSARY_URL = "https://portal.carto4ch.huma-num.fr/docs/project-documentation/Lexique/";

function AddTerm(props) {
  const [termText, setTermText] = useState("");

  const addterm = async (text) => {
    // Create object with all triplets
    const termWithText = addStringNoLocale(createThing({ url : GLOSSARY_URL, name : text }), TYPE_PREDICATE, SKOS.Concept);
    console.log("termWithText:", termWithText)

    const updatedTermList = setThing(props.termList, termWithText);
    const updatedDataset = await saveSolidDatasetAt(props.uriGlossary, updatedTermList, {
      fetch: props.session.fetch,
    });
    props.goSetTermList(updatedDataset);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    addterm(termText);
    setTermText("");
  };

  const handleChange = (e) => {
    e.preventDefault();
    setTermText(e.target.value);
  };

  return (
    <form className="term-form" onSubmit={handleSubmit}>
      <label htmlFor="term-input">
        <input
          id="term-input"
          type="text"
          value={termText}
          onChange={handleChange}
        />
      </label>
      <button className="add-button" type="submit">
        Add term
      </button>
    </form>
  );
}

export default AddTerm;
