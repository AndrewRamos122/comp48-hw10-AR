// Kirby's stats are kept together so every activity updates the same pet.
var MAX_ENERGY = 10;
var messageTimer = null;

var pet_info = {
  name: "Kirby",
  weight: 8,
  happiness: 6,
  energy: 8,
};

//Generating a Console Message for Dev Tools
function logPetActivity(activity) {
  console.groupCollapsed("Kirby activity: " + activity);

  console.info("Current pet stats", {
    name: pet_info.name,
    weight: pet_info.weight,
    happiness: pet_info.happiness,
    energy: pet_info.energy,
  });

  console.table([pet_info]);

  if (pet_info.energy <= 3 && pet_info.energy > 0) {
    console.warn("Kirby's energy is low.", pet_info.energy);
  }
  if (pet_info.energy == 0) {
    console.warn(
      "Kirby's energy is 0, you need to give him a nap!",
      pet_info.energy,
    );
  }
  console.log(
    "%cDevTools example",
    "color: white; background: #596536; padding: 4px 8px;",
  );

  console.groupEnd();
}

(function () {
  // Show the starting values, then connect each activity button to its action.
  checkAndUpdatePetInfoInHtml();
  $(".treat-button").click(clickedTreatButton);
  $(".play-button").click(clickedPlayButton);
  $(".exercise-button").click(clickedExerciseButton);
  $(".nap-button").click(clickedNapButton);

  //Error logging button for demonstration purposes. It logs an error to the console when clicked.
  $(".devtools-error-button").click(function () {
    console.error("[DevTools demo] Intentional error-level message.");
    $(".devtools-404-button").click(function () {
      fetch("./assets/missing-demo-file.json");
    });

    $(".devtools-typeerror-button").click(function () {
      document.querySelector("#missing-demo-element").textContent = "test";
    });

    $(".devtools-violation-button").click(function () {
      var endTime = performance.now() + 3000;
      while (performance.now() < endTime) {
        // Intentionally blocks the page for the DevTools example.
      }
    });
  });
});

function clickedTreatButton() {
  //Changed pet_info.happiness += 1; to a tmporary variable to demonstrate a bug in the console. The bug is that the variable is not used to update the pet_info.happiness value and I will show in console how to fix it. using Number(pet_info.happiness) + 1
  pet_info.happiness += "1"; // Temporary bug for the demonstration
  pet_info.weight += 1;
  checkAndUpdatePetInfoInHtml();
  // Log the activity to the console for dev tools.
  logPetActivity("Treat");
  showPetMessage("That treat was delicious! Thanks for looking after me.");
}

function clickedPlayButton() {
  pet_info.happiness += 2;
  pet_info.weight -= 1;
  pet_info.energy -= 2;
  checkAndUpdatePetInfoInHtml();
  // Log the activity to the console for dev tools.
  logPetActivity("Play");
  showPetMessage("Playing with you is fun! I'm ready to explore.");
}

function clickedExerciseButton() {
  pet_info.happiness -= 1;
  pet_info.weight -= 2;
  pet_info.energy -= 3;
  checkAndUpdatePetInfoInHtml();
  // Log the activity to the console for dev tools.
  logPetActivity("Exercise");
  showPetMessage("Whew! Exercise is good for me. Time for a breather!");
}

function clickedNapButton() {
  pet_info.happiness += 1;
  pet_info.energy += 3;
  checkAndUpdatePetInfoInHtml();
  // Log the activity to the console for dev tools.
  logPetActivity("Nap");
  showPetMessage("That nap was cozy. I'm feeling rested and happy!");
}

function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

function checkWeightAndHappinessBeforeUpdating() {
  // Keep weight, happiness, and energy at zero or above.
  if (pet_info.weight < 0) {
    pet_info.weight = 0;
  }
  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  }
  if (pet_info.energy < 0) {
    pet_info.energy = 0;
  }

  // Energy is capped at 10 so repeated naps stay within its displayed scale.
  if (pet_info.energy > MAX_ENERGY) {
    pet_info.energy = MAX_ENERGY;
  }
}

function updatePetInfoInHtml() {
  $(".name").text(pet_info.name);
  $(".weight").text(pet_info.weight);
  $(".happiness").text(pet_info.happiness);
  $(".energy").text(pet_info.energy);
}

function showPetMessage(message) {
  var $petMessage = $("#pet-message");

  // Restart the timer so a quick follow-up click keeps the newest message visible.
  if (messageTimer !== null) {
    window.clearTimeout(messageTimer);
  }

  // jQuery addClass() adds "is-visible" to the message. CSS uses that class to
  // fade and slide the pet's comment into view after an activity button is pressed.
  $petMessage.addClass("is-visible");
  $petMessage.text(message);

  messageTimer = window.setTimeout(function () {
    // jQuery removeClass() removes "is-visible" when the timer expires. CSS then
    // fades the message away, while the live status element remains accessible.
    $petMessage.removeClass("is-visible");
    messageTimer = null;
  }, 2600);
}
