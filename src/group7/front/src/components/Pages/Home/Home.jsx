import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import colors from "../../../colors";
import Typography from "@mui/material/Typography";
import { HomeOptions } from "./HomeOptions";

export function Home() {
    return (
        <Box
            sx={{
                scale: "1.5",
                width: "700px",
                flexGrow: 1,
                margin: "auto",
                padding: 2,
                backgroundColor: colors.mainCard,
                borderRadius: 4,
                boxShadow: 3,
            }}
        >
            <Grid container spacing={2} sx={{ height: "100%" }}>
                <Grid item xs={12}>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{ color: colors.textPrimary }}
                    >
                        Choose a game to play
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <HomeOptions />
                </Grid>
            </Grid>
        </Box>
    );
}
