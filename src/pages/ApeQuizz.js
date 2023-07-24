import React, { useState, useEffect } from "react";
import "./ApeQuizz.css";

function ApeQuizz() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [price, setPrice] = useState(0);
  const [volume, setVolume] = useState(0);

  const api_url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=apecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";

  useEffect(() => {
    getApeCoinData();
  }, []);

  const getApeCoinData = async () => {
    const response = await fetch(api_url);
    const data = await response.json();
    const price = data[0].current_price;
    const volume = data[0].total_volume;
    setPrice(price);
    setVolume(volume);
  };

  const questions = [
    {
      text: "On which blockchain ApeCoin was created?",
      options: [
        { id: 0, text: "Bitcoin", isCorrect: false },
        { id: 1, text: "Polygon", isCorrect: false },
        { id: 2, text: "Solana", isCorrect: false },
        { id: 3, text: "Ethereum", isCorrect: true },
      ],
    },
    {
      text: "What is the ApeCoin symbol?",
      options: [
        { id: 0, text: "APE", isCorrect: true },
        { id: 1, text: "APY", isCorrect: false },
        { id: 2, text: "APC", isCorrect: false },
        { id: 3, text: "ACOIN", isCorrect: false },
      ],
    },
    {
      text: "What is one of the main uses of ApeCoin?",
      options: [
        { id: 0, text: "Used as currency in the Bored Ape Yacht Club (BAYC) ecosystem", isCorrect: true },
        { id: 1, text: "Used to purchase virtual real estate in Decentraland", isCorrect: false },
        { id: 2, text: "Used for transactions on the Compound lending platform", isCorrect: false },
        { id: 3, text: "Used for transaction fees on the Ethereum blockchain", isCorrect: false },
      ],
    },
    {
      text: "What is the trading volume of ApeCoin in the last 24 hours?",
      options: [
        { id: 0, text: (volume * 2).toString() + " $", isCorrect: false },
        { id: 1, text: (volume + volume / 2).toString() + " $", isCorrect: false },
        { id: 2, text: volume.toString() + " $", isCorrect: true },
        { id: 3, text: (volume - volume / 2).toString() + " $", isCorrect: false },
      ],
    },
    {
      text: "What is the current value of an ApeCoin?",
      options: [
        { id: 0, text: (price * 3).toString() + " $", isCorrect: false },
        { id: 1, text: (price * 2).toString() + " $", isCorrect: false },
        { id: 2, text: (price / 2).toString() + " $", isCorrect: false },
        { id: 3, text: price.toString() + " $", isCorrect: true },
      ],
    },
  ];

  // Helper Functions

  /* A possible answer was clicked */
  const optionClicked = (isCorrect) => {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  return (
    <div className="ApeQuizz">
      {/* 1. Header  */}
      <h1>ApeCoin Quizz 💀🔵</h1>

      {/* 2. Current Score  */}
      <h2>Score: {score}</h2>

      {/* 3. Show results or show the question game  */}
      {showResults ? (
        /* 4. Final Results */
        <div className="final-results">
          <h1>Final Results</h1>
          <h2>
            {score} out of {questions.length} correct - ({(score / questions.length) * 100}%)
          </h2>
          <button onClick={() => restartGame()}>Restart game</button>
        </div>
      ) : (
        /* 5. Question Card  */
        <div className="question-card">
          {/* Current Question  */}
          <h2>
            Question: {currentQuestion + 1} out of {questions.length}
          </h2>
          <h3 className="question-text">{questions[currentQuestion].text}</h3>

          {/* List of possible answers  */}
          <ul>
            {questions[currentQuestion].options.map((option) => {
              return (
                <li key={option.id} onClick={() => optionClicked(option.isCorrect)}>
                  {option.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ApeQuizz;
