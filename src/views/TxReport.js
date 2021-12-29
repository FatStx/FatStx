import ReactGA from "react-ga4";
import React, { useState } from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import Transactions from '../components/Transactions';
import convertJsonToOutputArray from '../api/convertapijsontooutputarray'
import processAllXactnWithTransfersApiPages from '../api/stxapicalls'

export default function TxReport() {

  const [walletId, setWalletId] = useState('');
  const [txnData, setTxnData] = useState([]);

  const handleWalletIdChange = (event) => {
    setWalletId(event.target.value);
  };

  async function getWalletTxData() {

    ReactGA.send({ hitType: "pageview", page: "/transactions" });
  
    if (walletId.length<5) // TODO: need a more robust check - perhaps against explorer API?
    {
        alert("Please enter a valid wallet address");
        return;
    }
  
    let json= await processAllXactnWithTransfersApiPages(walletId);
    let outputArray=await convertJsonToOutputArray(json,walletId);
    setTxnData(outputArray)
    return;
  
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>

        {/* Wallet Input */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper sx={{p: 2}}>

              <Grid container alignItems="center"> 
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

                <Grid item xs={2}>
                  <Button 
                    sx={{ float: "right", minWidth: 100 }} 
                    variant="contained" 
                    onClick={ getWalletTxData }
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
            <Transactions txnData = {txnData} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
  
}

