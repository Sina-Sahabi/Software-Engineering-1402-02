import React from "react";
import Button from "@mui/material/Button";
import colors from "../../../colors";

export function Buttons({ name, onClick }) {
    return (
        <Button
            onClick={onClick}
            sx={{
                width: 140,
                height: 40,
                margin: 0.7,
                background: `${colors.button}`,
                color: `${colors.textSecondary}`,
                fontSize: "15px",
                fontWeight: "550",
            }}
        >
            {name}
        </Button>
    );
}
