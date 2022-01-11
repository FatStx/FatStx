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
import Switch from '@mui/material/Switch';
import Brightness6OutlinedIcon from '@mui/icons-material/Brightness6Outlined';

import TxReport from './TxReport'
import StackingReport from './StackingReport'
import WenBlok from './WenBlok'
import Disclaimer from './Disclaimer'
import Faq from './Faq'


const mdTheme = createTheme();

function StacksBoard() {

  const [walletId, setWalletId] = useState('');
  const [txnData, setTxnData] = useState([]);
  const [stackData, setStackData] = useState([]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              StacksBoard
            </Typography>

            <nav>
              <Brightness6OutlinedIcon sx={{mb:-1}}/>
              <Switch disabled sx={{mr:3}}/>
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
              <Button 
                variant="outlined"
                color="inherit"
                sx = {{ ml:3}}
              >
                  Login
              </Button>
            </nav>
          </Toolbar>
        </AppBar>

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
          <Toolbar />
          <Routes>

              <Route path="transactions" 
                element={
                  <TxReport 
                    walletId = {walletId}
                    setWalletId = {setWalletId}
                    txnData = {txnData} 
                    setTxnData = {setTxnData}
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
                  />
                } 
              />
          </Routes>

        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <StacksBoard />;
}
