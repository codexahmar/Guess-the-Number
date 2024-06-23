import React from "react";
import "./GuessGame.css";
import { useState } from "react";
function GuessGame() {
  let [Score, setScore] = useState(20);
  let [HighScore, setHighScore] = useState(0);
  let [Message, setMessage] = useState("Start Guessing...");
  let [Guess, setGuess] = useState("");
  let [RandomNumber, setRandomNumber] = useState(generateRandomNumber);
  function generateRandomNumber() {
    return Math.trunc(Math.random() * 20) + 1;
  }
  function handleInputChange(e) {
    setGuess(e.target.value);
  }
  function CheckButton() {
    let GuessedNumber = Number(Guess);
    if (!GuessedNumber || GuessedNumber < 1 || GuessedNumber > 20) {
      setMessage("Invalid Number");
    } else if (GuessedNumber === RandomNumber) {
      document.querySelector(".number").textContent = RandomNumber;
      document.body.style.backgroundColor = "#60b347";
      setMessage("Correct Number.");
      if (Score > HighScore) {
        HighScore = Score;
        setHighScore(HighScore);
      }
    } else if (Score < 1) {
      setMessage("You lost the game");
    } else {
      setMessage(GuessedNumber > RandomNumber ? "Too high!" : "Too low!");
      setScore(Score - 1);
    }
  }
  function AgainButton() {
    setRandomNumber(generateRandomNumber());
    document.querySelector(".number").textContent = "?";
    setScore(20);
    setGuess("");
    setMessage("Start Guessing...");
    document.body.style.backgroundColor = "black";
  }
  return (
    <>
      <header>
        <h1>Guess My Number!</h1>
        <p className="between">(Between 1 and 20)</p>
        <button className="btn again" onClick={AgainButton}>
          Again!
        </button>
        <div className="number"> {RandomNumber ? "?" : RandomNumber}</div>
      </header>
      <main>
        <section className="left">
          <input
            type="number"
            className="guess"
            value={Guess}
            onChange={handleInputChange}
          />
          <button className="btn check" onClick={CheckButton}>
            Check!
          </button>
        </section>
        <section className="right">
          <p className="message">{Message}</p>
          <p className="label-score">
            💯 Score: <span className="score">{Score}</span>
          </p>
          <p className="label-highscore">
            🥇 Highscore: <span className="highscore">{HighScore}</span>
          </p>
        </section>
      </main>
    </>
  );
}

export default GuessGame;
