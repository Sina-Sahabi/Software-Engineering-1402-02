import * as React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";

const images = [
    {
        url: "src/assets/Wordle_logo.svg.png",
        title: "Wordle",
        width: "30%",
    },
    {
        url: "src/assets/Hangman.png",
        title: "Hangman",
        width: "30%",
    },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    height: 200,
    width: 200,
    borderRadius: "20px%",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
        width: 100,
        height: 100,
    },
    "&:hover, &.Mui-focusVisible": {
        zIndex: 1,
        "& .MuiImageBackdrop-root": {
            opacity: 0.15,
        },
        "& .MuiImageMarked-root": {
            opacity: 0,
        },
        "& .MuiTypography-root": {
            border: "4px solid currentColor",
        },
    },
}));

const ImageSrc = styled("span")({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
    borderRadius: "20px",
});

const Image = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
    borderRadius: "20px",
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
    borderRadius: "20px",
}));

const ImageMarked = styled("span")(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
    borderRadius: "20px",
}));

export function HomeOptions() {


    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                minWidth: 300,
                width: "100%",
                justifyContent: "center",
            }}
        >
            {images.map((image) => (
                <Link key={image.title} to={`/${image.title.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                    <ImageButton
                        focusRipple
                        key={image.title}
                        style={{
                            margin: "20px",
                            borderRadius: "20px",
                        }}
                    >
                        <ImageSrc
                            style={{ backgroundImage: `url(${image.url})` }}
                        />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                sx={{
                                    position: "relative",
                                    p: 4,
                                    pt: 2,
                                    pb: (theme) =>
                                        `calc(${theme.spacing(1)} + 6px)`,
                                }}
                            >
                                {image.title}
                                <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                        </Image>
                    </ImageButton>
                </Link>
            ))}
        </Box>
    );
}
