// Wait for the window to load before executing any JavaScript
window.addEventListener("load", function() {

    // Function to validate user input and update shuttle requirements
    function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
       // Call the validateInput function to check if the entered values are valid
       let pilotStatus = validateInput(pilot);
       let copilotStatus = validateInput(copilot);
       let fuelStatus = validateInput(fuelLevel);
       let cargoStatus = validateInput(cargoLevel);
 
       // Check if any of the fields are empty
       if (pilotStatus === "Empty" || copilotStatus === "Empty" || fuelStatus === "Empty" || cargoStatus === "Empty") {
          // Show an alert to notify the user that all fields are required
          alert("All fields are required!");
       } else {
          // Update the shuttle requirements based on user input
          document.getElementById("pilotStatus").innerText = `${pilotStatus} is ready for launch`;
          document.getElementById("copilotStatus").innerText = `${copilotStatus} is ready for launch`;
          document.getElementById("fuelStatus").innerText = "Fuel level high enough for launch";
          document.getElementById("cargoStatus").innerText = "Cargo mass low enough for launch";
          document.getElementById("launchStatus").innerText = "Shuttle is ready for launch";
          document.getElementById("launchStatus").style.color = "green";
          document.getElementById("faultyItems").style.visibility = "hidden";
       }
    }
 
    // Wait for the form submission event
    let form = document.querySelector("form[data-testid='testForm']");
    form.addEventListener("submit", function(event) {
       // Prevent the default form submission behavior, which would cause the page to reload
       event.preventDefault();
 
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
    listedPlanetsResponse.then(function(result) {
       listedPlanets = result;
       console.log(listedPlanets);
    }).then(function() {
       console.log(listedPlanets);
       // Call the appropriate helper functions to pick a planet from the list of planets and add that information to destination.
       
    });
 
 });
 