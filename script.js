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
	for(let i=0; i < puppies.length; i++){
		const dog = puppies[i]
		const dogName = dog.name
		// console.log(puppies[i].name)
		if(dogName.indexOf(" ")>=0){
			const newDogName = dogName.replace(/\s+/g, '-')
			// console.log("newDogName:", newDogName)
			dog.name = newDogName
		}
	}
    // console.log(puppies)
    render()
  } catch (error) {
    console.error(error)
  }
};


// Fetches a single player from the API.
const fetchSinglePlayer = async (playerId) => {
	try {
		const response = await fetch(API_URL+`/${playerId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			  },
			  body: JSON.stringify(newPuppy)
		  })
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
};


// Adds a new player to the roster via the API.
const addNewPlayer = async (newPlayer) => {
  newPlayer.preventDefault()
//   console.log(newPlayer.target.name.value)

  const newPuppy = {
    name: newPlayer.target.name.value.replace(/\s+/g, '-'),
    breed: newPlayer.target.breed.value,
    status: newPlayer.target.status.value,
    imageUrl: newPlayer.target.imageUrl.value,
    teamId: newPlayer.target.imageUrl.value*1,
  }
//   console.log("newPuppy", newPuppy)

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
    // console.log("data", data)
    // console.log("new puppies:", puppies)

    // Clear form
    clearForm()

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
    // console.log("player", player)
    // console.log("playerId", playerId)
    // console.log("playerName", playerName)
    for(let i=0; i < puppies.length ; i++) {
      console.log("puppies[i]", puppies[i].name, playerName)
      if(puppies[i].name === playerName) {
        // console.log("match")
        puppies.splice(i,1)
      } else {
        // console.log("no match")
      }
    }

    try {
      const response = await fetch(API_URL+`/${playerId}`, {
        method: "DELETE"
      })
    //   console.log("response", response)
      player.target.parentElement.remove()
      // render()
    } catch (error) {
      console.error(error)
    }
    
    render()
  }
};

// puppiesListDiv.addEventListener('click', removePlayer)
const checkRemove = (event) => {
	console.log("!!", event)
	console.log("Are you sure?")
	// if(event.target.classList.contains("deleteButton")){
	if (confirm("Are you sure?")) {
		console.log("You pressed OK!")
		removePlayer(event)
	} else {
		console.log("You pressed Cancel!")
		// }
	}
}

const clearForm = () => {
    addPuppyForm.name.value = ""
    addPuppyForm.breed.value = ""
    addPuppyForm.status.value = ""
    addPuppyForm.imageUrl.value = ""
    addPuppyForm.teamId.value = ""
	document.querySelector("#bench").checked = true
  }



const renderSinglePlayer = (player) => {
	const checkTeam = player.teamId*1
	console.log("checkTeam:", checkTeam)

	const html = `
	<div class="singlePlayer two-column-layout">
		<div class="layoutColumn">
			<img src=${player.imageUrl} />
		</div>
		<div class="layoutColumn">
			<h2 class="luckiestGuyFont">Name:</h2>
			<p>${player.name}</p> 
			<h2 class="luckiestGuyFont">Breed:</h2>
			<p>${player.breed}</p> 
			<h2 class="luckiestGuyFont">Status:</h2>
			<p>${player.status}</p> 
			<h2 class="luckiestGuyFont">TeamId:</h2>
			<p>${checkTeam <= 0 ? "Unassigned" : checkTeam }</p> 
			<br/>
			<a href=# class="backButton domButton">Back to all Players</a>
			<br/>
			<a class="deleteButton domButton" onclick="checkRemove(event)" id=${player.id} name=${player.name}>Delete This Player</a>
		</div>
	</div>
  `;
  return html;
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

  const pageName = window.location.hash.slice(1);
  console.log("render:", pageName);

  // Single Player Result (name || undefined)
  const singlePlayer = puppies.find((player) => {
    return player.name === pageName;
  });

  const form = document.querySelector(".formContainer");

  puppiesListDiv.innerHTML = singlePlayer ? renderSinglePlayer(singlePlayer) : `${allPlayerHTML.join("")}`;
 
  if (singlePlayer) {
    console.log("Show Single Player");
    form.style.display = "none";
	gsap.from(".singlePlayer" , .35 , { scale: 0 , ease: Back.easeOut , boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0)" })
  } else {
    console.log("Show Team Roster");
    form.style.display = "block";
	gsap.from(".puppyCard" , .35 , { scale: 0 , y: 300 , ease: Back.easeOut , boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0)" , stagger: .05 })
  }


}


// Initializes the app by calling render
const init = async () => {
  console.log("init")
  fetchAllPlayers()
};

init()
