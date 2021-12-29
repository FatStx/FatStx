
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import Divider from '@mui/material/Divider';


export default function Tx({inAmount, inSymbol, outAmount, outSymbol}) {

    let inPanel
    if (inAmount > 0) {
        inPanel = 
        <Stack direction="column" xs={4}>
            <Typography 
                fontSize="1.3em"
                fontWeight='300'
                align='right'
                color='success.light'
            >{inAmount}</Typography>
            <Typography 
                fontSize="0.8em"
                fontWeight='900'
                align='right'
                color='success.dark'
            >{inSymbol}</Typography>
        </Stack>
    } 

    let outPanel
    if (outAmount > 0) {
        outPanel = 
        <Stack align="left">
            <Typography 
                fontSize="1.3em"
                fontWeight='300'
                color='error.light'
            >{outAmount}</Typography>
            <Typography 
                fontSize="0.8em"
                fontWeight='900'
                color='error.dark'
            >{outSymbol}</Typography>
        </Stack>
    }


    return (
        <Grid container direction="row" alignItems="center">
            <Grid item xs> {inPanel} </Grid>
            <Divider orientation="vertical" flexItem > </Divider>
            <Grid item xs> {outPanel} </Grid>
        </Grid>
    )
}