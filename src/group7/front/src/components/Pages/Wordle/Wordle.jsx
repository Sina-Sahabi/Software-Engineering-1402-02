import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import colors from "../../../colors";
import { WordleKeyboard } from "./WordleKeyboard";
import WordleTable from "./WordleTable";
import axios from "axios";
import { Win } from "../../Win";
const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

const initialKeyboard = "QWERTYUIOPASDFGHJKLZXCVBNM"
    .split("")
    .reduce((acc, letter) => {
        acc[letter] = colors.wordleDefault;
        return acc;
    }, {});

export function Wordle() {
    const [gameId, setGameId] = useState(null);
    const [finish, setFinish] = useState(false);
    const [guesses, setGuesses] = useState(Array(MAX_ATTEMPTS).fill(""));
    const [firstSubmit, setFirstSubmit] = useState(0);
    const [currentGuess, setCurrentGuess] = useState("");
    const [attempt, setAttempt] = useState(0);
    const [keyboard, setKeyboard] = useState(initialKeyboard);
    const [resultMap, setResultMap] = useState(
        Array(MAX_ATTEMPTS).fill(Array(WORD_LENGTH).fill(""))
    );

    useEffect(() => {
        if (firstSubmit === 1 && gameId !== null) {
            submitGuess(gameId);
        }
    }, [gameId]);

    const handleKeyPress = (letter) => {
        if (currentGuess.length < WORD_LENGTH && !finish) {
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

        setCurrentGuess(updatedGuess);

        newGuesses[attempt] = updatedGuess;
        setGuesses(newGuesses);
    };

    const handleFirstSubmit = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/group7/wordel/create/"
            );
            const data = response.data;

            if (response.status === 200) {
                setGameId(data.game_id);
                setFirstSubmit(1);
            } else {
                console.error("Error creating game:", data.error);
            }
        } catch (error) {
            console.error("Error creating game:", error);
        }
    };

    const handleSubmit = async () => {
        if (currentGuess.length === WORD_LENGTH) {
            if (firstSubmit === 0) {
                await handleFirstSubmit();
            } else {
                await submitGuess(gameId);
            }
        }
    };

    const submitGuess = async (gameId) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/group7/wordel/guess/${gameId}/`,
                { guess: currentGuess }
            );

            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = response.data;
            const result = data.feedback;
            console.log(result);
            const newResultMap = [...resultMap];
            newResultMap[attempt] = result;
            let corrects = 0;
            const newKeyboard = { ...keyboard };
            result.forEach((status, index) => {
                const letter = currentGuess[index];
                if (status === "correct") {
                    corrects++;
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

            if (!data.is_active) {
                if (corrects === 5) {
                    setFinish(true);
                } else {
                    alert("Game over!");
                }
            }
        } catch (error) {
            console.error("Failed to submit guess:", error);
        }
    };

    const handleReset = () => {
        setGuesses(Array(MAX_ATTEMPTS).fill(""));
        setCurrentGuess("");
        setAttempt(0);
        setFirstSubmit(0);
        setKeyboard(initialKeyboard);
        setResultMap(Array(MAX_ATTEMPTS).fill(Array(WORD_LENGTH).fill("")));
        setFinish(false);
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
            {finish ? (
                <Win onReset={handleReset} />
            ) : (
                <WordleTable
                    guesses={guesses}
                    WORD_LENGTH={WORD_LENGTH}
                    getColor={(row, col) => getColor(row, col)}
                />
            )}
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
