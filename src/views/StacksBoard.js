import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
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

const drawerWidth = 190;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const mdTheme = createTheme();

function DashboardContent() {

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
                href="transactions"
                sx={{ my: 1, mx: 1.5 }}
              >
                Transactions
              </Link>
              <Link
                variant="button"
                color="inherit"
                underline="hover"
                href="/stacking"
                sx={{ my: 1, mx: 1.5 }}
              >
                Stacking
              </Link>
              <Link
                variant="button"
                color="inherit"
                underline="hover"
                href="/wenblok"
                sx={{ my: 1, mx: 1.5 }}
              >
                Wenblok
              </Link>
              <Link
                variant="button"
                color="inherit"
                underline="hover"
                href="/about"
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
              <Route path="transactions" element={<TxReport />} />
              <Route path="transactions/:walletInPath" element={<TxReport />} />
              <Route path="stacking" element={<StackingReport />} />
              <Route path="wenblok" element={<WenBlok />} />
              
              <Route path="disclaimer" element={<Disclaimer />} />
              <Route path="about" element={<Disclaimer />} />
              <Route path="*" element={<TxReport />} />
          </Routes>

        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
