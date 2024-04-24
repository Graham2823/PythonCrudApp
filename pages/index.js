import React, {useEffect, useState} from "react";
import axios from "axios";
import DisplayTransfers from "@/components/DisplayTransfers";
const initialState = {
  "playerName": "",
  "playerPosition": "",
  "prevSchool": "",
  "newSchool":""
}
export default function Home() {
const [playerDetails, setPlayerDetails] = useState(initialState)
const [transfers, setTransfers] = useState([])
const [playerDeleted, setPlayerDeleted] = useState(false)
const [playerAdded, setPlayerAdded] = useState(false)
const [playerEdited, setPlayerEdited] = useState(false)

useEffect(()=>{
axios.get('http://localhost:8000/api/getTransfers')
  .then(response=>{
    setTransfers(response.data)
    setPlayerDeleted(false)
    setPlayerAdded(false)
    setPlayerEdited(false)
  })
},[playerDeleted, playerAdded, playerEdited])

const handleClick = () => {
  axios.post(`http://localhost:8000/api/create`, playerDetails)
    .then(response => {
      console.log(response.data); // This will log the response data from the server
      setPlayerAdded(true)
      setPlayerDetails(initialState)
    })
    .catch(error => {
      console.error('Error:', error);
    });
};
console.log(transfers)
  const handleInputChange = (e)=>{
    const text= e.target.value
    const input = e.target.name
    switch(input){
      case 'playerName':
        setPlayerDetails({...playerDetails, "playerName": text})
        break;
      case "playerPosition":
        setPlayerDetails({...playerDetails, "playerPosition": text})
        break;
      case "prevSchool":
        setPlayerDetails({...playerDetails, "prevSchool": text})
        break;
      case "newSchool":
        setPlayerDetails({...playerDetails, "newSchool": text})
        break;

    }

  }
  return (
    <div>
    <div>
      <h1>College Basketball Transfer Portal</h1>
      <form>
        <input placeholder="Player Name" name="playerName" onChange={(e)=> handleInputChange(e)}></input>
        <input placeholder="Player Position" name="playerPosition" onChange={(e)=> handleInputChange(e)}></input>
        <input placeholder="Previous School" name="prevSchool" onChange={(e)=> handleInputChange(e)}></input>
        <input placeholder="New School" name="newSchool" onChange={(e)=> handleInputChange(e)}></input>
      </form>
      <button onClick={()=>handleClick()}>Add Player to Transfer Target</button>
    </div>
    <div>
    <DisplayTransfers transfers={transfers} setPlayerDeleted={setPlayerDeleted} setPlayerEdited={setPlayerEdited}/>
    </div>
    </div>
  );
}
