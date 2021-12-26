import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Transactions from '../components/Transactions';

export default function TxReport() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>

        {/* Wallet Input */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 100,
            }}
          >

            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '90%' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  required
                  id="fullWidth"
                  label="Wallet Address"
                />

                <Button sx={{mt: 2, ml:2}} variant="contained">Go</Button>
              </div>
            </Box>
          </Paper>
        </Grid>

        {/* Transactions*/}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Transactions />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
  
}

