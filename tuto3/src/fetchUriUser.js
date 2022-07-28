import React, { useEffect, useState } from 'react';

export default function FetchUriUser(props){
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

//  console.log("props=",props);

  useEffect( () => {
      (async function () {
        const method = {
          method: 'GET',
          headers: {
            'accept': 'application/ld+json',
          }
        }
        // SemApps : https://data.virtual-assembly.org/users
        // SOLID : https://pod.inrupt.com/fluidlog/public/test-semapps/users
        const response = await fetch(props.uriUser, method)
        const responseData = await response.json()
        let responseLdp;
        let responseGraph;
        let responseContains;
        let responseContainsList = []
        if (response.ok){
          responseGraph = responseData["@graph"];
          console.log("responseGraph",responseGraph)
          if (responseGraph)
          {
            responseLdp = responseGraph[0];
            responseContains = responseLdp["contains"]
            if (Array.isArray(responseContains))
            {
              responseContains.forEach(item => {
                  responseContainsList.push(item)
              });
              console.log("responseContainsList",responseContainsList)
              setUsers(responseContainsList);
            }
            else // string
            {
              responseContainsList.push(responseContains)
              console.log("responseContainsList",responseContainsList)
              setUsers(responseContainsList);
            }
          }
          else {
            setLoading(false)
            setError(true)
            console.log("Erreur - URI incorrecte... ")
          }
        }
        else {
          console.log("error", JSON.Stringify(responseLdp))
        }
        setLoading(false)
     })()
   }, [props.uriUser]);

    if (loading)
      return "chargement..."

    if (error)
      return "Erreur lors de l'interrogation de l'URi..."

    return <ul>
      {users.map( (t, index) => <li key={index}>{t.split("/").pop()}</li>)}
    </ul>
  }
