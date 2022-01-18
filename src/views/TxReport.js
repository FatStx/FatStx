import ReactGA from "react-ga4";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Backdrop from '@mui/material/Backdrop';
import DotLoader from "react-spinners/DotLoader";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import Transactions from '../components/Transactions';
import convertJsonToTxReportArray from '../bl/TransactionsBL'
import processAllXactnWithTransfersApiPages, { isValidWallet } from '../api/StxApi'

export default function TxReport(props) {

  const {walletInPath} = useParams();

  let walletId = props.walletId
  let setWalletId = props.setWalletId
  let txnData = props.txnData
  let setTxnData = props.setTxnData
  
  const [year, setYear] = React.useState('2021');
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleWalletIdChange = (event) => {
    setWalletId(event.target.value);
  };

  async function getWalletTxData() {

    ReactGA.send({ hitType: "pageview", page: "/transactions" });

    if (walletId === '')
    {
      return;
    }

    let isAValidWallet=await isValidWallet(walletId);

    if (!isAValidWallet)
    {
      alert("Please enter a valid wallet address");
      return;
    }
    
    setSpinnerVisible(true)

    let apiResults = await processAllXactnWithTransfersApiPages(walletId, year);
    if (apiResults[0]) {
      alert("There have been one or more errors connecting to Stacks to obtain your data. Normally this is due to problems with either the network or the APIs. Please try again in a few minutes.");
    } else {
      let json=apiResults[1];
      let outputArray = await convertJsonToTxReportArray(json,walletId);
      setTxnData(outputArray)
    }

    setSpinnerVisible(false)
    return;
  
  }

  useEffect(()=> {
    if (walletInPath !== undefined) {
      setWalletId(walletInPath)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletInPath])

  useEffect(()=> {
    if (txnData.length === 0){
      getWalletTxData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletId])

  return (
    <Container sx={{ mt: 4, mb: 4}}>
      <Grid container spacing={3}>

        {/* Wallet Input */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper sx={{p: 2}}>

              <Grid container alignItems="center" spacing={2}> 
                <Grid item xs={9}>
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

                <Grid item xs={2} >
                    <FormControl fullWidth>
                        <InputLabel id="Year">Year</InputLabel>
                        <Select
                            labelId="year"
                            id="year"
                            value={year}
                            label="Year"
                            onChange={handleYearChange}
                        >
                            <MenuItem value={'2021'}>2021</MenuItem>
                            <MenuItem value={'2022'}>2022</MenuItem>
                        </Select>
                    </FormControl>
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

