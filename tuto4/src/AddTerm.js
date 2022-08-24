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

const TEXT_PREDICATE = "http://schema.org/text";
const CREATED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#created";
const TERM_CLASS = "http://www.w3.org/2002/12/cal/ical#Vterm";
const TYPE_PREDICATE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";

function AddTerm(props) {
  const [termText, settermText] = useState("");

  const addterm = async (text) => {
    const indexUrl = getSourceUrl(props.termList);
    console.log("termList:", props.termList)
    const termWithText = addStringNoLocale(createThing(), TEXT_PREDICATE, text);
    const termWithDate = addDatetime(
      termWithText,
      CREATED_PREDICATE,
      new Date()
    );
    const termWithType = addUrl(termWithDate, TYPE_PREDICATE, TERM_CLASS);
    const updatedTermList = setThing(props.termList, termWithType);
    const updatedDataset = await saveSolidDatasetAt(indexUrl, updatedTermList, {
      fetch: props.session.fetch,
    });
    props.goSetTermList(updatedDataset);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    addterm(termText);
    settermText("");
  };

  const handleChange = (e) => {
    e.preventDefault();
    settermText(e.target.value);
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

