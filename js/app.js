// Javascript Tech Degree Project 5
// Fetch API code was used from the "Working with the Fetch API" workshop.
// Specific videos being "Create a Reusable Fetch Function" and "Handling Errors"

// Fetch API function

function fetchData(url){
	return fetch(url)
		.then(checkStatus)
		.then(response => response.json())
		.catch(error => console.log("An error has occured! ", error))
}

// Status check function

function checkStatus(response){
	if(response.ok){
		return Promise.resolve(response);
	} else {
		return Promise.reject(new Error(response.statusText));
	}
}

// the fetchData function is called passing the url

fetchData("https://randomuser.me/api/?results=12&nat=us").then((data) => {
	let randomEmployees = data.results;
	createContainers(randomEmployees)
});


function createContainers(randomEmployees){
	
	// For each of the employee data provided, a card and modal container are created.
	// The card and modal container then pull the data for use.
	
	randomEmployees.forEach( employee =>{
		
		// The employee card div is created and the class name is set.
		
		const galleryDiv = document.getElementById("gallery");
		const cardDiv = document.createElement("div");
		cardDiv.className = "card";

		// The card image container is created, the class name is set, and the inner HTML is inserted.
		
		const cardImageContainer = document.createElement("div");
		cardImageContainer.className = "card-img-container";
		cardImageContainer.innerHTML = `<img class="card-img" src="${employee.picture.large}" alt="profile picture">`;

		// The card info container is created, the class name is set, and the inner HTML is inserted.
		
		const cardInfoContainer = document.createElement("div");
		cardInfoContainer.className = "card-info-container";
		cardInfoContainer.innerHTML = `
			<h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
			<p class="card-text">${employee.email}</p>
			<p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>`;

		// The cardDiv is appended to the gallery div.
		// The containers are appended to the card div.
		// NOTE: I tried to create these HTML elements the same way I did the modal container with one big template literal but the style went all messy.
		// NOTE: That is why I decided to stay with my inital creation attempt for the cardDiv HTML element.

		galleryDiv.appendChild(cardDiv);
		cardDiv.appendChild(cardImageContainer);
		cardDiv.appendChild(cardInfoContainer);
	})
	
	// The modal container creation is created to append the modal divs after the card divs.
	// NOTE: This was done so that viewing the html in the console would show like items together as opposed to 
	// alternating between the card and modal as my inital code had previously done.
	
	modalContainerCreation(randomEmployees)
	
}

function modalContainerCreation(randomEmployees){	
	
	// The modal container is created, the class name is set, and the inner HTML is inserted.
	// NOTE: The date format was found at MDN web docs after vigerous searching after seeing the inital ugly dob.date format.

	const galleryDiv = document.getElementById("gallery");
	randomEmployees.forEach( employee =>{
		const modalContainer = document.createElement("div");
		modalContainer.className ="modal-container";
		modalContainer.innerHTML = `
			<div class="modal">
				<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
				<div class="modal-info-container">
					<img class="modal-img" src="${employee.picture.large}" alt="profile picture">
					<h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
					<p class="modal-text">${employee.email}</p>
					<p class="modal-text cap">${employee.location.city}</p>
					<hr>
					<p class="modal-text">${employee.cell}</p>
					<p class="modal-text">${employee.location.street.number} 
						${employee.location.street.name}, 
						${employee.location.city}, 
						${employee.location.state} 
						${employee.location.postcode}
					</p>
					<p class="modal-text">${new Date(employee.dob.date).toLocaleDateString()}</p>
				</div>
			</div>`;

		// The modal container is appended to the gallery div.
		// The modal container is hidden by default.

		galleryDiv.appendChild(modalContainer);
		modalContainer.style.display = "none";
	});
	
	// Calls the function after the page has been populated with data.
	
	setModalFunctionality();
	
}

// This function creates the functionality 
// NOTE: Prior to this function's creation, I had code outside of a function which ran before the page was populated with data thus resulting in the closeButton 
// and modalContain variables having no data. The amount of time it took me to realize that I should call said code after the forEach was just embarassing.

function setModalFunctionality(){
	const cards = document.getElementsByClassName("card");
	const closeButton = document.querySelectorAll(".modal-close-btn");
	const modalContain = document.querySelectorAll(".modal-container");

	// This for loop sets up an event listener for each of the employee cards to show the modal container div when clicked.
	
	for (let i = 0; i < cards.length; i++){
		cards[i].addEventListener("click", () =>{
			modalContain[i].style.display = "block";
		});
	}

	// This for loop sets up an event listener for each of the modal containers div to hide when the close button is clicked.
	
	for (let i = 0; i < closeButton.length; i++){
		closeButton[i].addEventListener("click", () =>{
			modalContain[i].style.display = "none";
		});
	}
}