// API URL
const API_URL = "https://fsa-puppy-bowl.herokuapp.com/api/2501-ftb-et-web-am-PUPPIES/players"


// Global variables
let puppies = []
const puppiesListDiv = document.querySelector("#puppiesList")
const addPuppyForm = document.querySelector("#addPuppyForm")

window.addEventListener("hashchange", (event) => {
  render()
})




//  Fetches all players from the API.
const fetchAllPlayers = async () => {
  //TODO
  try {
    const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2501-ftb-et-web-am-PUPPIES/players")
    const data = await response.json()
    console.log(data)
    puppies = data.data.players
    console.log(puppies)
    render()
  } catch (error) {
    console.error(error)
  }

};

fetchAllPlayers()




// Fetches a single player from the API.
const fetchSinglePlayer = async (playerId) => {
  //TODO
};




// Adds a new player to the roster via the API.
const addNewPlayer = async (newPlayer) => {
  //TODO
  
  newPlayer.preventDefault()
  // console.log(newPlayer.target.name.value)

  const newPuppy = {
    name: newPlayer.target.name.value,
    breed: newPlayer.target.breed.value,
    status: newPlayer.target.status.value,
    imageUrl: newPlayer.target.imageUrl.value,
    teamId: newPlayer.target.imageUrl.value*1,
  }
  console.log("newPuppy", newPuppy)

  try {
    const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2501-ftb-et-web-am-PUPPIES/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPuppy)
    })
    const data = await response.json()
    console.log("data", data)
    puppies.push(data.data.newPlayer)
    console.log("new puppies:", puppies)
    render()
  } catch (error) {
    console.error(error)
  }
};

addPuppyForm.addEventListener("submit", addNewPlayer)

// addPuppyForm.addEventListener("submit", async (newPlayer) => {
//   console.log("Line 83")
//   console.log("newPlayer", newPlayer)
//   newPlayer.preventDefault()

//   const newPuppy = {
//     name: newPlayer.target.name.value,
//     breed: newPlayer.target.breed.value,
//     status: newPlayer.target.status.value,
//     imageUrl: newPlayer.target.imageUrl.value,
//     teamId: newPlayer.target.imageUrl.value*1,
//   }
//   console.log("newPuppy", newPuppy)

//   try {
//     const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2501-ftb-et-web-am-PUPPIES/players`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(newPuppy)
//     })
//     const data = await response.json()
//     console.log("data", data)
//     puppies.push(data.data.newPlayer)
//     console.log("new puppies:", puppies)
//     render()
//   } catch (error) {
//     console.error(error)
//   }
// })




// Removes a player from the roster via the API.
const removePlayer = async (playerId) => {
  //TODO

};




// Updates html to display a list of all players or a single player page.
const render = () => {
  // TODO
  const html = puppies.map((puppy) => {
    return `
      <a href=#${puppy.name}>
        <div class="puppyCard">
          <h3>${puppy.name}</h3>
        </div>
      </a>
    `
    // <img src="${puppy.imageUrl}" />
  })
 
  const name = window.location.hash.slice(1)
  console.log(name)
  
  puppiesListDiv.innerHTML = html.join("")

};




// Updates html to display a single player.
const renderSinglePlayer = (player) => {
  // TODO

};




// Initializes the app by calling render
const init = async () => {
  //Before we render, what do we always need...?

  render();

};













/**THERE IS NO NEED TO EDIT THE CODE BELOW =) **/

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
  };
} else {
  init();
}
