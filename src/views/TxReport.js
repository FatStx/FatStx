import ReactGA from "react-ga4";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Backdrop from '@mui/material/Backdrop';
import DotLoader from "react-spinners/DotLoader";

import Transactions from '../components/Transactions';
import convertJsonToOutputArray from '../api/convertapijsontooutputarray'
import processAllXactnWithTransfersApiPages from '../api/stxapicalls'


export default function TxReport() {

  const {walletInPath} = useParams();
  const [walletId, setWalletId] = useState( walletInPath === undefined ? '' : walletInPath );
  const [txnData, setTxnData] = useState([]);
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  const handleWalletIdChange = (event) => {
    setWalletId(event.target.value);
  };

  async function getWalletTxData() {

    setSpinnerVisible(true)

    ReactGA.send({ hitType: "pageview", page: "/transactions" });
  
    if (walletId.length < 5) // TODO: need a more robust check - perhaps against explorer API?
    {
        alert("Please enter a valid wallet address");
        return;
    }
  
    let json= await processAllXactnWithTransfersApiPages(walletId);
    let outputArray=await convertJsonToOutputArray(json,walletId);
    setTxnData(outputArray)

    setSpinnerVisible(false)
    return;
  
  }

  const intialLoad = useCallback(getWalletTxData, [walletId]);

  useEffect(()=> {
    if (walletInPath !== undefined) {
      console.log('initial load')
      console.log(walletInPath)
      intialLoad()
    }
  }, [intialLoad, walletInPath])

  return (
    <Container sx={{ mt: 4, mb: 4}}>
      <Grid container spacing={3}>

        {/* Wallet Input */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper sx={{p: 2}}>

              <Grid container alignItems="center" spacing={2}> 
                <Grid item xs={11}>
                  <TextField
                    fullWidth
                    component="form"
                    autoComplete="on"
                    required
                    label="Wallet Address"
                    onChange={ handleWalletIdChange }
                    value={walletId}
                  />
                </Grid>

                <Grid item xs={1}>
                  <Button 
                    fullWidth
                    sx={{ float: "right"}} 
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

            <Backdrop open={spinnerVisible}>
                <DotLoader  color="#ffffff" loading={true}  size={120} />
            </Backdrop>

            <Transactions txnData = {txnData} />
            
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
  
}

