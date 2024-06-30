import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import colors from "../../../colors";

export function GuessPlaceholder({ guess }) {
    const WORD_LENGTH = 5;
    return (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            {[...Array(WORD_LENGTH)].map((_, index) => (
                <Box
                    key={index}
                    sx={{
                        width: 50,
                        height: 50,
                        borderBottom: `2px solid gray`,
                        borderRadius: "7px",
                        margin: "0 5px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: colors.placeHolder,
                    }}
                >
                    <Typography variant="h5">
                        {guess[index] ? guess[index] : ""}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
}
