// Import the 'isomorphic-fetch' library
require('isomorphic-fetch');

// Function to add destination information to the mission target
function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   const missionTarget = document.getElementById("missionTarget");
   missionTarget.innerHTML = `
      <h2>Mission Destination</h2>
      <ol>
         <li>Name: ${name}</li>
         <li>Diameter: ${diameter}</li>
         <li>Star: ${star}</li>
         <li>Distance from Earth: ${distance}</li>
         <li>Number of Moons: ${moons}</li>
      </ol>
      <img src="${imageUrl}" alt="Destination Image">
   `;
}

// Function to validate user input
function validateInput(testInput) {
   if (testInput === "") {
      return "Empty";
   } else if (isNaN(testInput)) {
      return "Not a Number";
   } else {
      return "Is a Number";
   }
}

// Function to handle form submission and update shuttle requirements
function formSubmission(document, faultyItems, pilotName, coPilotName, fuelLevel, cargoMass) {
   // Validate input
   const pilotValidation = validateInput(pilotName);
   const coPilotValidation = validateInput(coPilotName);
   const fuelValidation = validateInput(fuelLevel);
   const cargoValidation = validateInput(cargoMass);


   // Update pilot and co-pilot status
   const pilotStatus = document.getElementById("pilotStatus");
   pilotStatus.innerHTML = `Pilot ${pilotValidation === "Is a Number" ? ` ${pilotName} is ready for launch` : "Not Ready"}`;
   const coPilotStatus = document.getElementById("copilotStatus");
   coPilotStatus.innerHTML = `Co-pilot ${coPilotValidation === "Is a Number" ? ` ${coPilotName} is ready for launch` : "Not Ready"}`;


   // Update faulty items list and launch status
   const listVisibility = faultyItems.style;
   const launchStatus = document.getElementById("launchStatus");
   if (pilotValidation !== "Is a Number" || coPilotValidation !== "Is a Number" || fuelValidation !== "Is a Number" || cargoValidation !== "Is a Number") {
      listVisibility.visibility = "visible";
      launchStatus.style.color = "#C7254E";
      launchStatus.textContent = "Shuttle Not Ready for Launch";
   } else {
      listVisibility.visibility = "hidden";
      launchStatus.style.color = "#419F6A";
      launchStatus.textContent = "Shuttle is Ready for Launch";
   }

   // Update fuel status
   const fuelStatus = document.getElementById("fuelStatus");
   if (fuelLevel < 10000) {
      fuelStatus.textContent = "Fuel level too low for launch";
   } else {
      fuelStatus.textContent = "Fuel level high enough for launch";
   }

   // Update cargo status
   const cargoStatus = document.getElementById("cargoStatus");
   if (cargoMass > 10000) {
      cargoStatus.textContent = "Cargo mass too heavy for launch";
   } else {
      cargoStatus.textContent = "Cargo mass low enough for launch";
   }
}

// Function to fetch planetary data
async function myFetch() {
   let planetsReturned;

   planetsReturned = await fetch('https://api.example.com/planetaryData').then(function (response) { // Corrected fetch URL
      if (response.ok) {
         return response.json();
      } else {
         throw new Error('Failed to fetch planets data');
      }
   });

   return planetsReturned;
}

// Function to pick a planet randomly
function pickPlanet(planets) {
   // Generate a random index within the range of available planets
   const randomIndex = Math.floor(Math.random() * planets.length);

   // Return the planet at the randomly generated index
   return planets[randomIndex];
}

// Export the functions to make them accessible from other files
module.exports = {
   addDestinationInfo,
   validateInput,
   formSubmission,
   myFetch,
   pickPlanet
};
