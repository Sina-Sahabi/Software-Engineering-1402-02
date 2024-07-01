import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import colors from "../../../colors";
import { Buttons } from "./Buttons";


// Define the layout of the keyboard with keys arranged in rows
const keyboardLayout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
];

// WordleKeyboard component to render the on-screen keyboard
export function WordleKeyboard({
    handleKeyPress, // Function to handle key press events
    handleBackspace, // Function to handle backspace events
    handleSubmit, // Function to handle submit events
    keyboard, // State object representing the color of each key based on its status
}) {
    return (
        <Box sx={{ mt: 2 }}>
            {/* Map over each row in the keyboardLayout to create rows of keys */}
            {keyboardLayout.map((row, rowIndex) => (
                <Box
                    key={rowIndex} // Unique key for each row
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: 1,
                    }}
                >
                    {/* Map over each key in the row to create individual buttons */}
                    {row.map((key) => (
                        <Button
                            key={key} // Unique key for each button
                            onClick={() => handleKeyPress(key)} // Attach click handler for key press
                            sx={{
                                width: 40,
                                height: 40,
                                backgroundColor: keyboard[key]=== colors.wordleDefault? colors.background: keyboard[key], // Set background color based on key status
                                color: colors.textSecondary, // Set text color
                                margin: 0.5,
                            }}
                        >
                            {key} {/* Display the key letter */}
                        </Button>
                    ))}
                </Box>
            ))}
            {/* controls for Backspace and Submit actions */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                <Buttons name="Backspace" onClick={handleBackspace} /> {/* Backspace button */}
                <Buttons name="Submit" onClick={handleSubmit} /> {/* Submit button */}
            </Box>
        </Box>
    );
}
