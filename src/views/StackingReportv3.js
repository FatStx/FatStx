import ReactGA from "react-ga4";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

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
import Backdrop from '@mui/material/Backdrop';
import DotLoader from "react-spinners/DotLoader";

import Title from '../components/Title';
import Stacking from '../components/Stacking';
import {checkWallet} from '../api/StxApi'
import getStackingReportArrayV3 from '../bl/StackingV3BL'

export default function StackingReportV3(props) {

  const {walletInPath} = useParams();

  let walletId = props.walletId
  let setWalletId = props.setWalletId
  let stackDataV3 = props.stackDataV3
  let setStackDataV3 = props.setStackDataV3
  let coin = props.coin
  let setCoin = props.setCoin
  
  ReactGA.send({ hitType: "pageview", page: "/stackingnew" });

  const [spinnerVisible, setSpinnerVisible] = useState(false);

  const handleCoinChange = (event) => {
      setCoin(event.target.value);
  };

  const handleWalletIdChange = (event) => {
      setWalletId(event.target.value)
  }

  async function handleGoClick() {
      if (coin === '') 
      {
        alert("Please select a coin");
        return;
      }

      if (walletId === '') {
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

      ReactGA.send({ hitType: "pageview", page: "/transactions" });

      let outputArray = await getStackingReportArrayV3(walletId,coin);
      setStackDataV3(outputArray)

      setSpinnerVisible(false)

      return;
  };

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
                <Grid item xs={12} s={12} md>
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

                <Grid item xs={12} sm={12} md={1}>
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
        <Stacking stackDataV3={stackDataV3} spinnerVisible={spinnerVisible} />
       </Grid>
    </Container>
  )
}