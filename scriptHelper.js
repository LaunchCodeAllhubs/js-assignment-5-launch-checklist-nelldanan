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
function formSubmission(document, list, pilotName, copilotName, fuelLevel, cargoMass) {
   const launchStatus = document.getElementById("launchStatus");
   const pilotStatus = document.getElementById("pilotStatus");
   const copilotStatus = document.getElementById("copilotStatus");
   const fuelStatus = document.getElementById("fuelStatus");
   const cargoStatus = document.getElementById("cargoStatus");

   if (
      validateInput(pilotName) === "Empty" ||
      validateInput(copilotName) === "Empty" ||
      validateInput(fuelLevel) === "Empty" ||
      validateInput(cargoMass) === "Empty"
   ) {
      window.alert("All fields required, Please fill in field.");
   } else if (
      validateInput(fuelLevel) === "Not a number" ||
      validateInput(cargoMass) === "Not a number" ||
      validateInput(pilotName) === "Is a number" ||
      validateInput(copilotName) === "Is a number"
   ) {
      window.alert("Invalid Input: Please enter a proper name.");
   } else {
      // Update pilot and copilot status using template literals
      pilotStatus.innerText = `Pilot ${pilotName} is ready`;
      copilotStatus.innerText = `Co-pilot ${copilotName} is ready`;

      if (cargoMass <= 10000 && fuelLevel >= 10000) {
         launchStatus.innerText = "Shuttle is ready for launch!";
         launchStatus.style.color = "rgb(65, 159, 106)";
         list.style.visibility = "hidden";
      } else {
         list.style.visibility = "visible";
         launchStatus.innerText = "Shuttle is not ready for launch";
         launchStatus.style.color = "rgb(199, 37, 78)";

         if (fuelLevel > 10000) {
            fuelStatus.innerText = "Fuel level high enough for launch";
         } else {
            fuelStatus.innerText = "Fuel level too low for launch";
         }

         if (cargoMass < 10000) {
            cargoStatus.innerText = "Cargo mass low enough for launch";
         } else {
            cargoStatus.innerText = "Cargo mass too high for launch";
         }
      }
   }
}



async function myFetch() {
   let planetsReturned;

   planetsReturned = await fetch(
      "https://handlers.education.launchcode.org/static/planets.json"
   ).then(function (response) {
      return response.json();
   });
   return planetsReturned;
}

function pickPlanet(planets) {
   return planets[Math.floor(Math.random() * planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.pickPlanet = pickPlanet;
module.exports.formSubmission = formSubmission;
module.exports.myFetch = myFetch;
