// Wait for the DOM to be fully loaded
window.addEventListener("load", function () {
   
   let listedPlanets;

   // Fetch the list of planets
   let listedPlanetsResponse = myFetch();

   // Handle the fetched data
   listedPlanetsResponse.then(function (result) {
      listedPlanets = result;
      
      // Pick a planet and add its information to the mission target
      const selectedPlanet = pickPlanet(listedPlanets);
      addDestinationInfo(selectedPlanet.name, selectedPlanet.diameter, selectedPlanet.star, selectedPlanet.distance, selectedPlanet.moons, selectedPlanet.image);
   });

   // Add an event listener for the form submission
   document.getElementById("formSubmit").addEventListener("click", function (event) {
      event.preventDefault(); // Prevent form submission and page reload

      // Get user input
      const pilotName = document.querySelector('input[name="pilotName"]').value;
      const coPilotName = document.querySelector('input[name="copilotName"]').value;
      const fuelLevel = document.querySelector('input[name="fuelLevel"]').value;
      const cargoMass = document.querySelector('input[name="cargoMass"]').value;

      // Call the formSubmission function from scriptHelper.js to validate and update shuttle requirements
      const faultyItems = document.getElementById("faultyItems"); // Get faultyItems element
      formSubmission(document, faultyItems, pilotName, coPilotName, fuelLevel, cargoMass);
   });
});

