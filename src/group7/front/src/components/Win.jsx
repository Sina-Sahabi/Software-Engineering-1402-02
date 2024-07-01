// YouWinCard.jsx
import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import colors from '../colors';
export function Win ({ onReset }){
  return (
    <Card sx={{ maxWidth: 500 , minHeight:200, margin: 'auto', mt: 4, textAlign: 'center', backgroundColor: colors.mainCard }}>
      <CardContent>
        <Typography variant="h2" component="div" sx={{color : colors.textPrimary , fontWeight: "bold"}}>
          You Win!
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 , color : colors.textSecondary}}>
          Congratulations! You've successfully completed the game.
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button variant="contained" sx={{background: colors.buttonText}} onClick={onReset}>
          Play Again
        </Button>
      </CardActions>
    </Card>
  );
};

