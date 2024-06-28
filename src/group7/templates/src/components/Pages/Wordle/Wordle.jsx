import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import colors from "../../../colors";
import { WordleKeyboard } from "./WordleKeyboard";
import WordleTable from "./WordleTable"; 

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

const initialKeyboard = "QWERTYUIOPASDFGHJKLZXCVBNM"
  .split("")
  .reduce((acc, letter) => {
    acc[letter] = colors.wordleDefault;
    return acc;
  }, {});

export function Wordle() {
  const [guesses, setGuesses] = useState(Array(MAX_ATTEMPTS).fill(""));
  const [currentGuess, setCurrentGuess] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [keyboard, setKeyboard] = useState(initialKeyboard);
  const [resultMap, setResultMap] = useState(
    Array(MAX_ATTEMPTS).fill(Array(WORD_LENGTH).fill(""))
  );

  const handleKeyPress = (letter) => {
    if (currentGuess.length < WORD_LENGTH) {
      const updatedGuess = currentGuess + letter;
      setCurrentGuess(updatedGuess);

      // Update the current guess in the guesses array
      const newGuesses = [...guesses];
      newGuesses[attempt] = updatedGuess;
      setGuesses(newGuesses);
    }
  };

  const handleBackspace = () => {
    const newGuesses = [...guesses];
    const updatedGuess = currentGuess.slice(0, -1);

    setCurrentGuess("");
    setCurrentGuess(updatedGuess);

    newGuesses[attempt] = updatedGuess;
    setGuesses(newGuesses);
  };

  const handleSubmit = async () => {
    if (currentGuess.length === WORD_LENGTH) {
      try {
        // const response = await fetch("/api/check-guess", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ guess: currentGuess }),
        // });

        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }

        // const result = await response.json();
        const result = ["correct", "present", "notIn", "notIn", "notIn"];

        const newResultMap = [...resultMap];
        newResultMap[attempt] = result;

        const newKeyboard = { ...keyboard };
        result.forEach((status, index) => {
          const letter = currentGuess[index];
          if (status === "correct") {
            newKeyboard[letter] = colors.green;
          } else if (status === "present") {
            newKeyboard[letter] = colors.yellow;
          } else if (status === "notIn") {
            newKeyboard[letter] = colors.gray;
          }
        });

        setResultMap(newResultMap);
        setKeyboard(newKeyboard);
        setAttempt(attempt + 1);
        setCurrentGuess("");
      } catch (error) {
        console.error("Failed to submit guess:", error);
      }
    }
  };
  

  return (
    <Box sx={{ textAlign: "center", mt: 4, scale: "1.3" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: colors.textSecondary }}
      >
        Wordle
      </Typography>
      <WordleTable
        guesses={guesses}
        WORD_LENGTH={WORD_LENGTH}
        getColor={(row, col) => getColor(row, col)} // Pass getColor function if necessary
      />
      <WordleKeyboard
        handleKeyPress={handleKeyPress}
        handleBackspace={handleBackspace}
        handleSubmit={handleSubmit}
        keyboard={keyboard}
      />
    </Box>
  );
  function getColor(row, col) {
    if (row < attempt) {
        const status = resultMap[row][col];
        if (status === "correct") {
            return colors.green;
        } else if (status === "present") {
            return colors.yellow;
        } else {
            return colors.gray;
        }
    }
    return colors.wordleDefault;
}
}
