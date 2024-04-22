import React, {useEffect, useState} from "react";
import axios from "axios";
const initialState = {
  "playerName": "",
  "playerPosition": "",
  "prevSchool": "",
  "newSchool":""
}
export default function Home() {
const [playerDetails, setPlayerDetails] = useState(initialState)

  const handleClick = ()=>{
    const request = axios.post(`http://localhost:8000/api/create`, playerDetails)
    console.log(request)
    console.log(playerDetails)
  }

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

console.log(playerDetails)
  }
  return (
    <div>
      <div>College Basketball Transfer Portal</div>
      <form>
        <input placeholder="Player Name" name="playerName" onChange={(e)=> handleInputChange(e)}></input>
        <input placeholder="Player Position" name="playerPosition" onChange={(e)=> handleInputChange(e)}></input>
        <input placeholder="Previous School" name="prevSchool" onChange={(e)=> handleInputChange(e)}></input>
        <input placeholder="New School" name="newSchool" onChange={(e)=> handleInputChange(e)}></input>
      </form>
      <button onClick={()=>handleClick()}>Click me to Hit Create Route</button>
    </div>
  );
}
