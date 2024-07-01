import React, { useState } from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import colors from "../../../colors";
import { Figure } from "./Figure";
import { HangmanKeyboard } from "./HangmanKeyboard";
import { GuessPlaceholder } from "./PlaceHolder";
import axios from "axios";
import { Win } from "../../Win";

const MAX_ATTEMPTS = 6;
const MAX_LENGTH = 5;

const initialKeyboard = "QWERTYUIOPASDFGHJKLZXCVBNM"
    .split("")
    .reduce((acc, letter) => {
        acc[letter] = colors.wordleDefault;
        return acc;
    }, {});

export function Hangman() {
    const [attempt, setAttempt] = useState(0);
    const [finish, setFinish] = useState(false);
    const [lock, setLock] = useState(false);
    const [currLetter, setCurLetter] = useState(" ");
    const [keyboard, setKeyboard] = useState(initialKeyboard);
    const [firstClick, setFirstCLick] = useState(0);
    const [gameId, setGameId] = useState(null);
    const [guess, setGuess] = useState(Array(MAX_LENGTH).fill(" "));

    useEffect(() => {
        if (firstClick === 1 && gameId !== null) {
            submitGuess(gameId, currLetter);
        }
    }, [gameId]);

    useEffect(() => {
        if (!guess.includes(" ")) {
            setFinish(true);
        }
    }, [guess]);

    useEffect(() => {
        if (attempt === 6) {
            alert("Game Over!");
            setLock(true);
        }
    }, [attempt]);

    const handleFirstClick = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/group7/hangman/create/"
            );
            const data = response.data;

            if (response.status === 200) {
                setGameId(data.game_id);
                setFirstCLick(1);
            } else {
                console.error("Error creating game:", data.error);
            }
        } catch (error) {
            console.error("Error creating game:", error);
        }
    };

    const handleKeyPress = async (letter) => {
        setCurLetter(letter);
        if (attempt <= MAX_ATTEMPTS && !lock) {
            if (firstClick === 0) {
                setFirstCLick(1);
                await handleFirstClick();
            } else {
                await submitGuess(gameId, letter);
            }
        }
    };

    const handleReset = () => {
        setAttempt(0);
        setGameId(null);
        setFirstCLick(0);
        setCurLetter(" ");
        setKeyboard(initialKeyboard);
        setFinish(false);
        setGuess(Array(MAX_LENGTH).fill(" "));
    };

    const submitGuess = async (gameId, letter) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/group7/hangman/guess/${gameId}/`,
                { guess: letter }
            );

            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = response.data;
            const result = data.feedback;
            console.log(attempt);
            if (result.length === 0) {
                setAttempt(attempt + 1);
                console.log(attempt);

                setKeyboard({
                    ...keyboard,
                    [letter]: colors.incorrect,
                });
            } else {
                setKeyboard({
                    ...keyboard,
                    [letter]: colors.correct,
                });

                const newGuess = [...guess];
                result.forEach((index) => {
                    newGuess[index] = letter;
                });
                setGuess(newGuess);
            }
        } catch (error) {
            console.error("Failed to submit guess:", error);
        }
    };

    return (
        <Box sx={{ textAlign: "center", mt: 4, scale: "1.3" }}>
            <Grid container spacing={2} sx={{ height: "100%" }}>
                <Grid item xs={12}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{ color: colors.textSecondary }}
                    >
                        Hangman
                    </Typography>
                </Grid>
                {finish ? (
                    <Win onReset={handleReset} />
                ) : (
                    <Grid item xs={12}>
                        <Figure errors={attempt} />
                    </Grid>
                )}
                <Grid item xs={12}></Grid>
                <Grid item xs={12}>
                    <GuessPlaceholder guess={guess} />
                </Grid>

                <Grid item xs={12}>
                    <HangmanKeyboard
                        handleKeyPress={handleKeyPress}
                        keyboard={keyboard}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
