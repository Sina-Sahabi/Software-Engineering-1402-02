import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import colors from '../colors'; 

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : colors.cards, 
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: colors.textSecondary, 
  }));