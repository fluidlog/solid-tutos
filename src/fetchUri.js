import React, { useEffect, useState } from 'react';

export default function FetchList(){
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

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
        const response = await fetch("https://pod.inrupt.com/fluidlog/public/test-semapps/users", method)
        const responseData = await response.json()
        console.log("responseData",responseData)
        let responseLdp = {};
        let responseContains;
        let responseContainsList = []
        if (response.ok){
          responseLdp = responseData["@graph"][0];
          console.log("responseLdp",responseLdp)

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
          console.log("error", JSON.Stringify(responseLdp))
        }
        setLoading(false)
     })()
    }, []);
    if (loading)
      return "chargement..."
    return <ul>
      {users.map( (t, index) => <li key={index}>{t.split("/").pop()}</li>)}
    </ul>
  }
