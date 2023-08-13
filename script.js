// Wait for the window to load before executing any JavaScript
window.addEventListener("load", function () {

   // Function to validate user input and update shuttle requirements
   function formSubmission(document, pilot, copilot, fuelLevel, cargoLevel) {
      let pilotStatus = validateInput(pilot);
      let copilotStatus = validateInput(copilot);
      let fuelStatus = validateInput(fuelLevel);
      let cargoStatus = validateInput(cargoLevel);

      // Update the shuttle requirements based on user input
      document.getElementById("pilotStatus").innerText = `${pilotStatus} ${pilot}`;
      document.getElementById("copilotStatus").innerText = `${copilotStatus} ${copilot}`;
      document.getElementById("fuelStatus").innerText = "Fuel level high enough for launch";
      document.getElementById("cargoStatus").innerText = "Cargo mass low enough for launch";

      // Check if any of the fields are empty
      if (pilotStatus === "Empty" || copilotStatus === "Empty" || fuelStatus === "Empty" || cargoStatus === "Empty") {
         alert("All fields are required!"); // Show an alert for empty fields
      } else {
         // Check if everything is ready for launch
         if (fuelStatus === "Is a Number" && fuelLevel >= 10000 && cargoStatus === "Is a Number" && cargoLevel <= 10000) {
            document.getElementById("launchStatus").innerText = "Shuttle is ready for launch";
            document.getElementById("launchStatus").style.color = "#419F6A"; // Green color for ready status
            document.getElementById("faultyItems").style.visibility = "hidden";
         } else {
            document.getElementById("launchStatus").innerText = "Shuttle not ready for launch";
            document.getElementById("launchStatus").style.color = "red"; // Red color for not ready status
            document.getElementById("faultyItems").style.visibility = "visible";
         }
      }
   }

   // Wait for the form submission event
   let form = document.querySelector("form[data-testid='testForm']");
   form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission

      // Get the values from the form fields
      let pilotName = document.querySelector("input[name='pilotName']").value;
      let copilotName = document.querySelector("input[name='copilotName']").value;
      let fuelLevel = document.querySelector("input[name='fuelLevel']").value;
      let cargoMass = document.querySelector("input[name='cargoMass']").value;

      // Call the formSubmission function with the entered values
      formSubmission(document, pilotName, copilotName, fuelLevel, cargoMass);
   });

   // Fetch planetary data and update the mission destination
   let listedPlanets;
   let listedPlanetsResponse = myFetch(); // Fetch the planetary data using the helper function myFetch()
   listedPlanetsResponse.then(function (result) {
      listedPlanets = result;
      console.log(listedPlanets);

      // Call the appropriate helper functions to pick a planet from the list of planets and add that information to destination.
      let randomPlanet = pickPlanet(listedPlanets);
      addDestinationInfo(
         document,
         randomPlanet.name,
         randomPlanet.diameter,
         randomPlanet.star,
         randomPlanet.distance,
         randomPlanet.moons,
         randomPlanet.image
      );
   });
});
