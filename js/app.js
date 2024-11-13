// Selecting the necessary elements
const choices = document.querySelectorAll(".choice");
const actionText = document.querySelector(".action-text p");
const scoreDisplay = document.querySelector(".score p");
let score = parseInt(localStorage.getItem("score")) || 0; // Retrieve score from localStorage

// Update score display on page load
scoreDisplay.textContent = score;

// Possible options for computer choice
const options = ["rock", "paper", "scissor"];

// Function to get computer's random choice
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

// Function to determine the winner
function getResult(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return "draw";
  if (
    (playerChoice === "rock" && computerChoice === "scissor") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissor" && computerChoice === "paper")
  )
    return "win";
  return "lose";
}

// Function to update the UI based on the result
function updateUI(choiceElement, result) {
  if (result === "win") {
    choiceElement.style.borderColor = "green";
    actionText.textContent = "You won!";
    score++;
  } else if (result === "lose") {
    choiceElement.style.borderColor = "red";
    actionText.textContent = "You lose";
  } else {
    choiceElement.style.borderColor = "gray";
    actionText.textContent = "It's a draw";
  }

  scoreDisplay.textContent = score;
  localStorage.setItem("score", score); // Save score to localStorage
}

// Add click event listeners to each choice
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    // Reset border color for all choices
    choices.forEach((c) => (c.style.borderColor = ""));

    const playerChoice = choice.classList[1]; // Get player's choice from class name
    const computerChoice = getComputerChoice();
    const result = getResult(playerChoice, computerChoice);

    updateUI(choice, result); // Update UI with result
  });
});

// Selecting the reset button
const resetButton = document.querySelector(".button button");

// Event listener for resetting the score to zero
resetButton.addEventListener("click", () => {
  score = 0; // Reset the score to zero
  scoreDisplay.textContent = score; // Update the score display on the page
  localStorage.setItem("score", score); // Save the reset score to localStorage
});
