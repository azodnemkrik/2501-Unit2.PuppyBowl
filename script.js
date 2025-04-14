// API URL
const API_URL = "https://fsa-puppy-bowl.herokuapp.com/api/2501-ftb-et-web-am-PUPPIES/players"

// Global variables
let puppies = [] // State
const puppiesListDiv = document.querySelector("#puppiesList")
const addPuppyForm = document.querySelector("#addPuppyForm")

window.addEventListener("hashchange", () => {
  render()
})


//  Fetches all players from the API.
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    puppies = data.data.players
    console.log(puppies)
    render()
  } catch (error) {
    console.error(error)
  }
};


// Fetches a single player from the API.
const fetchSinglePlayer = async (playerId) => {
  //TODO
};


// Adds a new player to the roster via the API.
const addNewPlayer = async (newPlayer) => {
  //TODO
  
  newPlayer.preventDefault()
  console.log(newPlayer.target.name.value)

  const newPuppy = {
    name: newPlayer.target.name.value,
    breed: newPlayer.target.breed.value,
    status: newPlayer.target.status.value,
    imageUrl: newPlayer.target.imageUrl.value,
    teamId: newPlayer.target.imageUrl.value*1,
  }
  console.log("newPuppy", newPuppy)

  try {
    const response = await fetch(API_URL , {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPuppy)
    })
    const data = await response.json()
    puppies.push(data.data.newPlayer)
    console.log("data", data)
    console.log("new puppies:", puppies)

    // Clear form
    addPuppyForm.name.value = ""
    addPuppyForm.breed.value = ""
    addPuppyForm.status.value = ""
    addPuppyForm.imageUrl.value = ""
    addPuppyForm.teamId.value = ""

    // Render
    render()
  } catch (error) {
    console.error(error)
  }
};
addPuppyForm.addEventListener("submit", addNewPlayer)


// Removes a player from the roster via the API.
const removePlayer = async (player) => {
  //TODO
  if(player.target.classList.contains("deleteButton")){
    const playerId = player.target.id*1
    const playerName = player.target.name
    console.log("player", player)
    console.log("playerId", playerId)
    console.log("playerName", playerName)
    for(let i=0; i < puppies.length ; i++) {
      console.log("puppies[i]", puppies[i].name, playerName)
      if(puppies[i].name === playerName) {
        console.log("match")
        puppies.splice(i,1)
      } else {
        console.log("no match")
      }
    }

    try {
      const response = await fetch(API_URL+`/${playerId}`, {
        method: "DELETE"
      })
      console.log("response", response)
      player.target.parentElement.remove()
      // render()
    } catch (error) {
      console.error(error)
    }
    
    render()
  }
};

puppiesListDiv.addEventListener('click', removePlayer)



const renderSinglePlayer = (player) => {
  const html = `
  <div class="singlePlayer">
    <img src=${player.imageUrl} />
    <h2>Name: ${player.name} </h2>
    <h2>Breed: ${player.breed} </h2>
    <h2>Status: ${player.status} </h2>
    <h2>TeamId: ${player.teamId} </h2>
    <br/>
    <a href=#>Back to all Players</a>
    <br/>
    <a href=# class="deleteButton" id=${player.id} name=${player.name}>Delete This Player</a>
  </div>
  `
  return html
}

// Updates html to display a list of all players OR a single player page.
const render = () => {

  // All Players HTML
  const allPlayerHTML = puppies.map((puppy) => {
    return `
    <a href=#${puppy.name}>
      <div class="puppyCard">
        <img src="${puppy.imageUrl}" />
        <h3>${puppy.name}</h3>
      </div> 
    </a>
    `
  })

  const pageName = window.location.hash.slice(1)
  console.log("render:", pageName)

  // Single Player Result (name || undefined) 
  const singlePlayer = puppies.find((player) => {
    return player.name === pageName
  })

  puppiesListDiv.innerHTML = singlePlayer ? renderSinglePlayer(singlePlayer) : `${allPlayerHTML.join("")}`

}


// Initializes the app by calling render
const init = async () => {
  console.log("init")
  fetchAllPlayers()
};

init()
