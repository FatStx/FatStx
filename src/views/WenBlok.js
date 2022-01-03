import ReactGA from "react-ga4";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function WenBlok() {

    ReactGA.send({ hitType: "pageview", page: "/wenblok" });

    return(
      <Container maxWidth={false} sx={{ mt: 4, mb: 4}}>
        <Stack direction={{ xs: 'column', sm: 'row', md: 'column', lg: 'row' }} spacing={3}>

            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Current STX Block
                </Typography>
                <Typography variant="h5" component="div">
                   43171
                </Typography>
                
              </CardContent>
              <div>
                <Divider/>
                <Typography variant="body2">
                    Refreshed from mainnet
                </Typography>
              </div>
            </Card>

            <Card sx={{ minWidth: 275 }}>
              <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Current NYC Cycle
              </Typography>
              <Typography variant="h5" component="div">
                 2
              </Typography>
              </CardContent>
              <div>
                <Divider/>
                <Typography variant="body2">
                    50%
                </Typography>
              </div>
            </Card>

            <Card sx={{ minWidth: 275 }}>
              <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Current MIA Cycle
              </Typography>
              <Typography variant="h5" component="div">
                8
              </Typography>
              </CardContent>
              <div>
                <Divider/>
                <Typography variant="body2">
                    80%
                </Typography>
              </div>
            </Card>

            <Card sx={{ minWidth: 275 }}>
              <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Your Timezone
              </Typography>
              <Typography variant="h5" component="div">
                America/New_York
              </Typography>
              </CardContent>
              <div>
                <Divider/>
                <Typography variant="body2">
                    Blah
                </Typography>
            </div>
            </Card>
        </Stack>
      </Container>
    )
}