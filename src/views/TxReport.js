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
import processAllXactnWithTransfersApiPages, { checkWallet } from '../api/StxApi'

export default function TxReport(props) {

  const {walletInPath} = useParams();

  let walletId = props.walletId
  let setWalletId = props.setWalletId
  let txnData = props.txnData
  let setTxnData = props.setTxnData
  let year = props.year
  let setYear = props.setYear
  let currency = props.currency
  let setCurrency = props.setCurrency
  
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
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

    let checkWalletResults=await checkWallet(walletId);

    if (!checkWalletResults[0])
    {
      alert("Please enter a valid wallet address");
      return;
    }
    else
    {
      walletId=checkWalletResults[1];
    }
    
    setSpinnerVisible(true)

    let apiResults = await processAllXactnWithTransfersApiPages(walletId, year);
        if (apiResults[0]) {
      alert("There have been one or more errors connecting to Stacks to obtain your data. Normally this is due to problems with either the network or the APIs. Please try again in a few minutes.");
    } else {
      let json=apiResults[1];
      let outputArray = await convertJsonToTxReportArray(json,walletId,currency);
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

  return (
    <Container sx={{ mt: 4, mb: 4}}>
      <Grid container spacing={3}>

        {/* Wallet Input */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper sx={{p: 2}}>

              <Grid container alignItems="center" spacing={2}> 
                <Grid item xs={12} s={12} md >
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
                <Grid item xs={12} s={12} md={2} >
                    <FormControl fullWidth>
                        <InputLabel id="Currency">Currency</InputLabel>
                        <Select
                            labelId="currency"
                            id="currency"
                            value={currency}
                            label="Currency"
                            onChange={handleCurrencyChange}
                        >
                            <MenuItem selected={true} value={'USD'}>USD</MenuItem>
                            <MenuItem value={'EUR'}>EUR</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} s={12} md={2} >
                    <FormControl fullWidth>
                        <InputLabel id="Year">Year</InputLabel>
                        <Select
                            labelId="year"
                            id="year"
                            value={year}
                            label="Year"
                            onChange={handleYearChange}
                        >
                            <MenuItem value={'2019'}>2019</MenuItem>
                            <MenuItem value={'2020'}>2020</MenuItem>
                            <MenuItem value={'2021'}>2021</MenuItem>
                            <MenuItem value={'2022'}>2022</MenuItem>
                            <MenuItem value={'2023'}>2023</MenuItem>
                            <MenuItem value={'2024'}>2024</MenuItem>
                            <MenuItem value={'2025'}>2025</MenuItem>
                            <MenuItem selected={true} value={'2026'}>2026</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item  xs={12} sm={12} md={1}>
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

            <Transactions txnData = {txnData} name={walletId} currency={currency}/>
            
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
  
}

