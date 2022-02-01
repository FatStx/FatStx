import React, { useState } from "react";
import { Route, Routes, Link as RouterLink } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Popover from '@mui/material/Popover';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CoffeeIcon from '@mui/icons-material/Coffee';
// import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';

import TxReport from './TxReport'
import StackingReport from './StackingReport'
import WenBlok from './WenBlok'
import Disclaimer from './Disclaimer'
import Faq from './Faq'
import { Stack } from "@mui/material";

const mdTheme = createTheme();

function Home() {

  const [walletId, setWalletId] = useState('');
  const [txnData, setTxnData] = useState([]);
  const [stackData, setStackData] = useState([]);
  const [coin, setCoin] = useState('');
  const [year, setYear] = useState('2021');
  const [supportShow, setSupportShow] = useState(null);

  const handleSupportClick = (event) => {
    setSupportShow(event.currentTarget);
  };

  const handleSupportClose = () => {
    setSupportShow(null);
  };

  const open = Boolean(supportShow);
  const id = open ? 'simple-popover' : undefined;

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex'}} >
        <CssBaseline />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <AppBar position="absolute">
            <Toolbar>
              <Grid container alignItems="center">
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <Stack direction="row" justifyContent={{xs:"center", sm:"center", md:"center", lg:"flex-start"}}>
                    <Typography
                      component="h1"
                      variant="h6"
                      color="inherit"
                      noWrap
                      sx={{ fontWeight: 'bold', fontSize: '2rem',  letterSpacing: 4 }}
                    >
                      FAT
                    </Typography>
                    <Typography
                      component="h1"
                      variant="h6"
                      color="inherit"
                      noWrap
                      sx={{ fontWeight: 'light', fontSize: '2rem', letterSpacing: 4  }}
                    >
                      STX
                    </Typography>
                    {/* <Chip label="BETA" variant="outlined" size="small" sx={{fontSize: "0.6rem", ml:"0.4rem", mt:"0.5rem", alignSelf:"flex-start", color: "#ffffff"}} /> */}
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={2} >
                  <Stack justifyContent="center">
                    <Button 
                      variant="outlined" 
                      color="inherit"
                      endIcon={<FavoriteIcon />}
                      sx = {{ mr:2 }}
                      onClick = {handleSupportClick}
                    >
                      Support Us
                    </Button>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={supportShow}
                      onClose={handleSupportClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                    >
                      <Card sx={{ maxWidth: 395 }}>
                        <CardContent>
                          <Stack direction="row" spacing={2} sx={{ py:3 }} >
                            <CoffeeIcon sx={{ mt:"5px", color:"#777777"}} />
                            <Typography gutterBottom variant="h5" component="div">
                              Buy us a Coffee!
                            </Typography>
                          </Stack>
                          <Typography variant="body2" color="text.secondary">
                            We hope you're enjoying fatstx! If you'd like to support its continued development feel free to send some fatstx or other stx tokens our way!
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" fullWidth sx={{ py:3 }} >SP07VQYYWJZ421DSBST3J4N5RTXV1S66XWTPTCG8</Button>
                        </CardActions>
                      </Card>
                    </Popover>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={12} md={6} >
                  <Stack direction="row" justifyContent={{xs:"center", sm:"center", md:"flex-end"}}>
                    <Link
                      variant="button"
                      color="inherit"
                      underline="hover"
                      component={RouterLink}
                      to="/transactions"
                      sx={{ my: 1, mx: 1.5 }}
                    >
                      Transactions
                    </Link>
                    <Link
                      variant="button"
                      color="inherit"
                      underline="hover"
                      component={RouterLink}
                      to="/stacking"
                      sx={{ my: 1, mx: 1.5 }}
                    >
                      Stacking
                    </Link>
                    <Link
                      variant="button"
                      color="inherit"
                      underline="hover"
                      component={RouterLink}
                      to="/wenblok"
                      sx={{ my: 1, mx: 1.5 }}
                    >
                      Wenblok
                    </Link>
                    <Link
                      variant="button"
                      color="inherit"
                      underline="hover"
                      component={RouterLink}
                      to="/faq"
                      sx={{ my: 1, mx: 1.5 }}
                    >
                      Faq
                    </Link>
                    <Link
                      variant="button"
                      color="inherit"
                      underline="hover"
                      component={RouterLink}
                      to="/about"
                      sx={{ my: 1, mx: 1.5 }}
                    >
                      About
                    </Link>
                  </Stack>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          <Box sx={{mt:20}}>
            <Routes>
                <Route path="transactions" 
                  element={
                    <TxReport 
                      walletId = {walletId}
                      setWalletId = {setWalletId}
                      txnData = {txnData} 
                      setTxnData = {setTxnData}
                      year = {year}
                      setYear = {setYear}
                    />
                  } 
                />

                <Route path="transactions/:walletInPath" 
                  element={
                    <TxReport 
                      walletId = {walletId}
                      setWalletId = {setWalletId}
                      txnData = {txnData} 
                      setTxnData = {setTxnData}
                      year = {year}
                      setYear = {setYear}
                    />
                  } 
                />
                
                <Route path="stacking" 
                  element={
                    <StackingReport 
                      walletId = {walletId}
                      setWalletId = {setWalletId}
                      stackData = {stackData} 
                      setStackData = {setStackData}
                      coin = {coin}
                      setCoin = {setCoin}
                    />
                  } 
                />

                <Route path="stacking/:walletInPath" 
                  element={
                    <StackingReport 
                      walletId = {walletId}
                      setWalletId = {setWalletId}
                      stackData = {stackData} 
                      setStackData = {setStackData}
                      coin = {coin}
                      setCoin = {setCoin}
                    />
                  } 
                />

                <Route path="wenblok" element={<WenBlok />} />
                <Route path="disclaimer" element={<Disclaimer />} />
                <Route path="about" element={<Disclaimer />} />
                <Route path="faq" element={<Faq />} />
                
                <Route path="*" 
                  element={
                    <TxReport 
                      walletId = {walletId}
                      setWalletId = {setWalletId}
                      txnData = {txnData} 
                      setTxnData = {setTxnData}
                      year = {year}
                      setYear = {setYear}
                    />
                  } 
                />
            </Routes>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <Home />;
}
