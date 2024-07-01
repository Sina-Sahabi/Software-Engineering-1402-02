import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import colors from "../../../colors";

const keyboardLayout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
];

export function HangmanKeyboard({
    handleKeyPress,
    keyboard,
}) {
    return (
        <Box sx={{ mt: 2 }}>
            {keyboardLayout.map((row, rowIndex) => (
                <Box
                    key={rowIndex} 
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: 1,
                    }}
                >
                    {row.map((key) => (
                        <Button
                            key={key} 
                            onClick={() => handleKeyPress(key)} 
                            sx={{
                                width: 40,
                                height: 40,
                                backgroundColor: keyboard[key] || colors.wordleDefault,
                                color: colors.textSecondary, 
                                margin: 0.5,
                            }}
                        >
                            {key} 
                        </Button>
                    ))}
                </Box>
            ))}

        </Box>
    );
}
