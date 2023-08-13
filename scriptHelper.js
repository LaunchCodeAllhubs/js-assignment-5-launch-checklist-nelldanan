// Write your helper functions here!
require('isomorphic-fetch');

// Function to add destination information to the mission target div
function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Get the mission target div
   const missionDiv = document.getElementById("missionTarget");

   // Create an h2 element for the heading
   const missionHeading = document.createElement("h2");
   missionHeading.textContent = "Mission Destination";

   // Create an ordered list element for the mission details
   const missionList = document.createElement("ol");

   // Create list items for mission details
   const liName = document.createElement("li");
   liName.textContent = "Name: " + name;

   const liDiameter = document.createElement("li");
   liDiameter.textContent = "Diameter: " + diameter;

   const liStar = document.createElement("li");
   liStar.textContent = "Star: " + star;

   const liDistance = document.createElement("li");
   liDistance.textContent = "Distance from Earth: " + distance;

   const liMoons = document.createElement("li");
   liMoons.textContent = "Number of Moons: " + moons;

   // Create an image element
   const missionImage = document.createElement("img");
   missionImage.src = imageUrl;

   // Append elements to the mission target div
   missionDiv.appendChild(missionHeading);
   missionDiv.appendChild(missionList);

   missionList.appendChild(liName);
   missionList.appendChild(liDiameter);
   missionList.appendChild(liStar);
   missionList.appendChild(liDistance);
   missionList.appendChild(liMoons);

   missionDiv.appendChild(missionImage);
}

// Function to validate user input and return the status
function validateInput(value) {
   if (value.trim() === "") {
      return "Empty";
   } else if (isNaN(value)) {
      return "Not a Number";
   } else {
      return "Is a Number";
   }
}

// Function to update shuttle requirements and display launch status
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   // Validate user input
   const pilotStatus = validateInput(pilot);
   const copilotStatus = validateInput(copilot);
   const fuelStatus = validateInput(fuelLevel);
   const cargoStatus = validateInput(cargoLevel);

   // Update shuttle requirements based on user input
   document.getElementById("pilotStatus").innerText = pilotStatus + " " + pilot;
   document.getElementById("copilotStatus").innerText = copilotStatus + " " + copilot;
   document.getElementById("fuelStatus").innerText = "Fuel level high enough for launch";
   document.getElementById("cargoStatus").innerText = "Cargo mass low enough for launch";

   // Check if any fields are empty
   if (pilotStatus === "Empty" || copilotStatus === "Empty" || fuelStatus === "Empty" || cargoStatus === "Empty") {
      alert("All fields are required!");
   } else {
      // Check fuel and cargo status
      if (fuelStatus === "Is a Number" && fuelLevel < 10000) {
         document.getElementById("fuelStatus").innerText = "Fuel level is too low for launch";
         document.getElementById("launchStatus").innerText = "Shuttle not ready for launch";
         document.getElementById("launchStatus").style.color = "red";
         document.getElementById("faultyItems").style.visibility = "visible";
      }

      if (cargoStatus === "Is a Number" && cargoLevel > 10000) {
         document.getElementById("cargoStatus").innerText = "Cargo mass is too large for launch";
         document.getElementById("launchStatus").innerText = "Shuttle not ready for launch";
         document.getElementById("launchStatus").style.color = "#C7254E";
         document.getElementById("faultyItems").style.visibility = "visible";
      }

      if (fuelStatus === "Is a Number" && fuelLevel >= 10000 && cargoStatus === "Is a Number" && cargoLevel <= 10000) {
         document.getElementById("launchStatus").innerText = "Shuttle is ready for launch";
         document.getElementById("launchStatus").style.color = "#419F6A";
         document.getElementById("faultyItems").style.visibility = "hidden";
      }
   }
}

// Fetch planetary data using async/await
async function myFetch() {
   try {
      const response = await fetch("<URL>"); // Replace <URL> with the actual URL
      const planetsReturned = await response.json();
      return planetsReturned;
   } catch (error) {
      console.error("Error fetching planetary data:", error);
      return null;
   }
}

// Function to pick a random planet from the list
function pickPlanet(planets) {
   const randomIndex = Math.floor(Math.random() * planets.length);
   return planets[randomIndex];
}

// Export the functions to be used in other scripts
module.exports = {
   addDestinationInfo: addDestinationInfo,
   validateInput: validateInput,
   formSubmission: formSubmission,
   pickPlanet: pickPlanet,
};
