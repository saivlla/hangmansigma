var words = ["Brick", "Charm", "Draft", "Elbow", "Fairy", "Ghost", "Hazel", "Ivory", "Joint", "Karma", "Lemon", "Magic", "Novel", "Orbit", "Paint", "Quick", "Raven",
  "Scalp", "Trend", "Unite", "Vigor", "Whisk", "Xerox", "Yacht", "Zebra", "Blush", "Crisp", "Dough", "Epoch", "Frost", "Glove", "Index", "Jumpy", "Knobs",
  "Lurgy", "Mirth", "Nymph", "Opium", "Pouch", "Quads", "Rocks", "Spiny", "Thumb", "Vexil", "Wreck", "Exult", "Fjord", "Gland", "Hymns", "Jokes"];

var wordsHints = ["A solid block for building.", "A tiny trinket or special magic.", "A first try at something or a cool breeze.",
  "The bend in your arm.", "A tiny magical creature.", "A spooky spirit.", "A brown-green color or a tree.",
  "A smooth, white material.", "A place where things connect.", "Good or bad energy from actions.", "A sour yellow fruit.", "Special powers or tricks.", "A long story in a book.", "A path around a planet.",
  "A liquid for coloring things.", "Fast-moving.", "A big black bird.", "The skin on your head.", "Something popular.",
  "To bring together.", "Strength and energy.", "A tool for mixing fast.", "A copy of something.", "A fancy boat.", "A striped black-and-white animal.", "A pink tint on cheeks.", "Fresh and crunchy.",
  "Soft bread mix.", "A long period of time.", "Ice on a cold morning.", "A cover for your hand.", "A list or pointer.", "Moving in a bouncy way.", "Small round handles.",
  "Feeling sick.", "Joy and laughter.", "A mythological spirit of nature.", "A drug from poppies.", "A small bag.", "Muscles in the thighs.", "Hard natural minerals.", "Covered with spikes.", "The short, thick finger.",
  "Related to flags.", "A destroyed structure.", "To celebrate happily.", "A narrow sea inlet bordered by steep cliffs.", "A body organ that produces substances.", "Religious songs.", "Funny remarks."];

const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text span");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector("img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector("#play-again");

// Game variables
let maxGuesses = 6; // Updated to match 6 images
let wrongCount = 0;
let correctLetters = [];
let selectedWord = "";
let selectedHint = "";

// Select a random word and hint
function getRandomWord() {
  let index = Math.floor(Math.random() * words.length);
  selectedWord = words[index].toUpperCase();
  selectedHint = wordsHints[index];

  // Display the hint
  document.getElementById("hint").innerHTML = `<b>Hint:</b> ${selectedHint}`;
  wordDisplay.innerHTML = selectedWord.split("").map(() => `<li class="letter">_</li>`).join("");
}

// Handle letter guesses
function handleGuess(letter) {
  let button = document.getElementById(letter);

  if (!button.disabled) {
      button.disabled = true;
      button.style.backgroundColor = "#888"; // Gray out disabled button
      button.style.color = "#fff";

      if (selectedWord.includes(letter)) {
          // Reveal correct letters in the display
          [...selectedWord].forEach((char, index) => {
              if (char === letter) {
                  correctLetters.push(letter);
                  wordDisplay.querySelectorAll(".letter")[index].innerText = letter;
              }
          });

          // Check if all letters are guessed
          if (correctLetters.length === [...new Set(selectedWord)].length) {
              showGameResult("win");
          }
      } else {
          // Wrong guess: increase count & update image
          wrongCount++;
          hangmanImage.src = `img${wrongCount}.jpg`; // Update image with correct format
          guessesText.innerText = `${wrongCount} / ${maxGuesses}`;

          // Check for game over
          if (wrongCount === maxGuesses) {
              showGameResult("lose");
          }
      }
  }
}

// Show game result
function showGameResult(result) {
  gameModal.classList.add("show");
  document.getElementById("correct-word").innerText = selectedWord;
}

// Generate the keyboard
function createKeyboard() {
  keyboardDiv.innerHTML = "";
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
      let button = document.createElement("button");
      button.innerText = letter;
      button.id = letter;
      button.classList.add("button");
      button.onclick = () => handleGuess(letter);
      keyboardDiv.appendChild(button);
  });
}

// Reset game
function resetGame() {
  wrongCount = 0;
  correctLetters = [];
  hangmanImage.src = "img0.jpg"; // Reset to first image
  guessesText.innerText = `0 / ${maxGuesses}`;
  gameModal.classList.remove("show");

  getRandomWord();
  createKeyboard();
}

// Initialize game
getRandomWord();
createKeyboard();

// Play again button
playAgainBtn.addEventListener("click", resetGame);