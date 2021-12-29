import ReactGA from "react-ga4";
import React, { useState } from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



export default function StackingReport() {

    ReactGA.send({ hitType: "pageview", page: "/stacking" });

    const [coin, setCoin] = React.useState('');
    const [walletId, setWalletId] = useState('');
    const [stackData, setStackData] = useState([]);

    const handleCoinChange = (event) => {
        setCoin(event.target.value);
    };

    const handleWalletIdChange = (event) => {
        setWalletId(event.target.value)
    }

    const handleGoClick = (event) => {
        if (coin === '') 
        {
            alert("Please select Coin");
            return;
        }

        if (walletId.length<5) // TODO: need a more robust check - perhaps against explorer API?
        {
            alert("Please enter a valid wallet address");
            return;
        }

        setStackData([])

    };

    return (
        <Container maxWidth={false} sx={{ mt: 4, mb: 4}}>
          <Grid container spacing={3}>
    
            {/* Wallet Input */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper sx={{p: 2}}>
    
                  <Grid container alignItems="center" spacing={2}> 
                    <Grid item xs={10}>
                      <TextField
                        fullWidth
                        component="form"
                        autoComplete="on"
                        required
                        label="Wallet Address"
                        onChange={ handleWalletIdChange }
                      />
                    </Grid>

                    <Grid item xs={1} >
                        <FormControl fullWidth>
                            <InputLabel id="coin-label">Coin</InputLabel>
                            <Select
                                labelId="coin-label"
                                id="coin-select"
                                value={coin}
                                label="Coin"
                                onChange={handleCoinChange}
                            >
                                <MenuItem value={'MIA'}>MIA</MenuItem>
                                <MenuItem value={'NYC'}>NYC</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
    
                    <Grid item xs={1}>
                      <Button 
                      fullWidth
                        sx={{ float: "right"}} 
                        variant="contained" 
                        onClick={ handleGoClick }
                      >
                        GO <PlayArrowIcon />
                      </Button>
                    </Grid>
                  </Grid>
              </Paper>
            </Grid>
    
            {/* Transactions*/}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Table size="small">

                <colgroup>
                  <col style={{width:'15%'}}/>
                  <col style={{width:'15%'}}/>
                  <col style={{width:'15%'}}/>
                  <col style={{width:'15%'}}/>
                  <col style={{width:'15%'}}/>
                  <col style={{width:'25%'}}/>
                </colgroup>

                <TableHead>
                  <TableRow>
                    <TableCell>Cycle</TableCell>
                    <TableCell>Starting Block</TableCell>
                    <TableCell>Ending Block</TableCell>
                    <TableCell>Stacked Amount</TableCell>
                    <TableCell>STX Claimed</TableCell>
                    <TableCell>Claim Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stackData.map((row) => (
                    <TableRow key={row.rowId}>
                      <TableCell>Cycle</TableCell>
                      <TableCell>Starting Block</TableCell>
                      <TableCell>Ending Block</TableCell>
                      <TableCell>Stacked Amount</TableCell>
                      <TableCell>STX Claimed</TableCell>
                      <TableCell>Claim Date</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )
}