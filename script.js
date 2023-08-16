// Wait for the DOM to be fully loaded//
window.addEventListener("load", function () {

   // Fetch the list of planets
   myFetch().then(function (result) {
      // Store the fetched list of planets
      const listedPlanets = result;

      // Select a random planet
      const selectedPlanet = pickPlanet(listedPlanets);

      // Add destination information to the mission target
      addDestinationInfo(
         document,
         selectedPlanet.name,
         selectedPlanet.diameter,
         selectedPlanet.star,
         selectedPlanet.distance,
         selectedPlanet.moons,
         selectedPlanet.image
      );
   });

   // Add an event listener for the form submission
   const form = document.querySelector("form");
   form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission and page reload

      // Get user input
      const pilotName = document.querySelector('input[name="pilotName"]').value;
      const coPilotName = document.querySelector('input[name="copilotName"]').value;
      const fuelLevel = document.querySelector('input[name="fuelLevel"]').value;
      const cargoMass = document.querySelector('input[name="cargoMass"]').value;

      // Call the formSubmission function to validate and update shuttle requirements
      const faultyItems = document.getElementById("faultyItems");
      formSubmission(document, faultyItems, pilotName, coPilotName, fuelLevel, cargoMass);
   });
});
