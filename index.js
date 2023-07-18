const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');


// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-ACC-PT-WEB-PT-B';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
        const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`);
        const result = await response.json();
        const players = result.data.players;
        return players;
     } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
        return [];
       
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/player/${playerId}`);
        const result = await response.json();
        const player = result.data.player;
        return player;
    } catch (err) {
        console.error(`Oh no, trouble fetching player # ${playerId} !`, err);
        return null;
    }
};

const addNewPlayer = async (playerObj) => {
    try {
        const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`, {
            method: 'POST',
            headers: {
               'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ player: playerObj })
        });
        const result = await response.json();
        return result.data.player;
        } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
        return null;
    }
};

const removePlayer = async (playerId) => {
    try {
        const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/player/${playerId}`, {
            method: 'DELETE'
           });
           const result = await response.json();
           return result.success;
           } catch (err) {
           console.error(`Whoops, trouble removing player #${playerId} from the roster!`, err);
           return false;
        }
  };

/**
 * It t akes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (playerList) => {
    try {
        let playerContainerHTML = '';
        playerList.forEach((player) => {
            playerContainerHTML += `  
        <div class="container">
         <div class="player-card">
          <img src="${player.imageUrl}" alt="${player.name}">
            <h2>${player.name}</h2>
            <p>${player.breed}</p>
            <p>${player.status}</p>
              <button class="details-button" data-player-id="${player.id}">See details</button>
              <button class="remove-button" data-player-id="${player.id}">Remove from roster</button>
            
          </div>`;
        });
        playerContainer.innerHTML = playerContainerHTML;
        // Add event Listeners to the buttons in each player card
        const seeDetailsBtns = document.querySelectorAll('.details-button');
        const removeFromRosterBtns = document.querySelectorAll('.remove-button');
/*See Details button functionality,
 To be able to see the details about player*/
         seeDetailsBtns.forEach((btn) => {
            btn.addEventListener('onclick', async (event) => {
                const playerId = event.target.dataset.playerId;
                const player = await fetchSinglePlayer(playerId);
                if (player) {
                   alert(`player name: ${player.name} is a ${player.breed}`);
                };
            

        
               });
        
            });
        
         removeFromRosterBtns.forEach((btn) => {
           btn.addEventListener('click', async (event) => {
                const playerId = event.target.dataset.playerId;
                const success = await removePlayer(playerId);
                console.log(success);
             });
           });
  
        } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};


/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
    try {
        // Create the form element
        const newPlayerForm = document.createElement('form');

        // Add form elements (input fields, buttons, etc) to the form element

        // Add an event Listener to the form submission
            newPlayerForm.addEventListener('submit', async (event) => {
               event.preventDefault();
            
            // retrieve form data
            const formData = new FormData(newPlayerForm);
            await addNewPlayer(Object.fromEntries(formData));


            // send request to add the new player to the database
            const players = await fetchAllPlayers();

            // render all players to the DOM
            renderAllPlayers(players);

            // Clear the for
            newPlayerForm.reset();
       });

         // Append the form to the DOM
        newPlayerFormContainer.appendChild(newPlayerForm);

        
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);
    renderNewPlayerForm();
}

init();