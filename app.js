const charsContainer = document.querySelector(".chars");
const wordContainer = document.querySelector(".word");
const lives = document.querySelector(".lives");
const renderHangman = document.querySelector(".game");
const popup = document.querySelector(".popup");
const differentWords = ["cat", "hello", "beer", "cheese", "lion"];
let correctWord = "";
let currentLives = 10;
let currentCharsCorrect = 0;

const setup = () => {
  wordContainer.innerHTML = "";
  currentCharsCorrect = 0;
  currentLives = 10;
  correctWord = "";
  // hides popup
  popup.classList.remove("show");
  // resets hangman
  Array.from(renderHangman.children).forEach((item) =>
    item.classList.remove("show")
  );
  //show all characters
  Array.from(charsContainer.children).forEach((char) =>
    char.classList.remove("fade")
  );
  // setup the correct word
  correctWord =
    differentWords[Math.floor(Math.random() * differentWords.length)];
  lives.textContent = `You have ${currentLives} lives`;
  // render out all the "_"
  for (let i = 0; i < correctWord.length; i++) {
    wordContainer.innerHTML += `<li>_</li>`;
  }
};

charsContainer.addEventListener("click", (e) => {
  const words = document.querySelectorAll(".word > li");
  const charText = e.target.textContent.trim();
  const char = e.target;

  // checks if you clicked on a character
  if (charText.length < 2 && !char.className.includes("fade")) {
    // checks if the character you clicked on is inside the correctWord
    if (correctWord.includes(charText)) {
      //loop through correctWord and compare char you clicked vs correctChar
      for (let i = 0; i < correctWord.length; i++) {
        //if char you clicked matches correctChar, display it, add 1 to charscorrect, fade out char element
        if (charText === correctWord[i]) {
          words[i].textContent = charText.toUpperCase();
          currentCharsCorrect++;
          char.classList.add("fade");
          updateGame(currentCharsCorrect);
        }
      }
    } else {
      //else fade out the char element, decrease life by 1 and render out a hangman part
      char.classList.add("fade");
      currentLives--;
      updateGame(currentLives);
      lives.textContent = `You have ${currentLives} lives`;
      renderHangman.children[currentLives].classList.add("show");
    }
  }
});
const newGame = () => {
  setup();
};
const updateGame = (lives) => {
  if (lives === 0) {
    popup.innerHTML = `
      <h1>YOU LOST!</h1>
      <button class="newGame">New Game</button>
    `;
    popup.classList.add("show");
    popup.children[1].addEventListener("click", newGame);
  }
  if (currentCharsCorrect === correctWord.length) {
    popup.innerHTML = `
      <h1>YOU WON!</h1>
      <button class="newGame">New Game</button>
    `;
    popup.classList.add("show");
    popup.children[1].addEventListener("click", newGame);
  }
};

setup();
