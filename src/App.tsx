import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Form from './components/Form';
import List from './components/List';
import { Sub, SubsResponseFromApi } from './types'


interface AppState {
  subs: Array<Sub>
  newSubsNumber: number
}

function App() {

  const [subs, setSubs] = useState<AppState["subs"]>([])
  const [newSubsNumber, setNewSubsNumber] = useState<AppState["newSubsNumber"]>(0)
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchSubs = (): Promise<SubsResponseFromApi> => {
      return fetch('http://localhost:3001/subs').then(res => res.json())
      //con axios
      /* return axios
        .get('http://localhost:3001/subs')
        .then(response => response.data) */
    }

    const mapFromApiToSubs = (apiResponse: SubsResponseFromApi): 
    Array<Sub> => {
      return apiResponse.map(subFromApi => {
        const {
          nick,
          months: subMonths,
          profileUrl: avatar,
          description
        } = subFromApi

        return {
          nick,
          description,
          avatar,
          subMonths
        }
      })
    } 

    fetchSubs()
      .then(mapFromApiToSubs)
      .then(setSubs)
  }, [])

  const handleNewSub = (newSub: Sub): void => {
    setSubs(subs => [...subs, newSub])
    setNewSubsNumber(n => n + 1)
  }


  return (
    <div className="App" ref={divRef}>
      <h1>subs</h1>
      <List subs={subs} />
      New subs: {newSubsNumber}
      <Form onNewSub={handleNewSub} />
    </div>
  );
}

export default App;
