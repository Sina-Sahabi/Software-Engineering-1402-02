import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import '@fontsource/roboto/400.css';

const WordleTable = ({ guesses, WORD_LENGTH, getColor }) => {
  return (
    <Box>
      {guesses.map((guess, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 1,
          }}
        >
          {[...Array(WORD_LENGTH)].map((_, i) => (
            <TextField
              key={i}
              value={guess[i] ? guess[i] : ""}
              variant="outlined"
              sx={{
                width: 50,
                height: 50,
                
                margin: '1.5px',
                '& .MuiInputBase-root': {
                  height: '100%',
                  backgroundColor: getColor(index, i),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                '& .MuiInputBase-input': {
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "22px",
                  padding: 0,
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                  boxShadow:"0px 2px #cecece"
                },
              }}
              InputProps={{
                readOnly: true,
              }}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default WordleTable;
