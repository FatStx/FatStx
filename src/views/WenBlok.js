import ReactGA from "react-ga4";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Grid } from "@mui/material";


export default function WenBlok() {

    ReactGA.send({ hitType: "pageview", page: "/wenblok" });

    return(
      <Container maxWidth={false} sx={{ mt: 4, mb: 4}}>
        {/* <Stack direction={{ xs: 'column', sm: 'row', md: 'column', lg: 'row' }} spacing={3}> */}
        <Grid container spacing={3}>
            <Grid item xs={12} sm={3} md={3}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography align="center" sx={{ fontSize: 40, fontWeight: 200}} variant="h5" component="div">
                    43171
                  </Typography>
                  <Typography align="center" sx={{ fontSize: 14, fontWeight: 300}} color="text.secondary" gutterBottom>
                    Current STX Block
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={3} md={3}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                <Typography align="center" sx={{ fontSize: 40, fontWeight: 200}} variant="h5" component="div">
                    3
                  </Typography>
                  <Typography align="center" sx={{ fontSize: 14, fontWeight: 300}} color="text.secondary" gutterBottom>
                    NYC Cycle
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={3} md={3}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                <Typography align="center" sx={{ fontSize: 40, fontWeight: 200}} variant="h5" component="div">
                    8
                  </Typography>
                  <Typography align="center" sx={{ fontSize: 14, fontWeight: 300}} color="text.secondary" gutterBottom>
                    MIA Cycle
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={3} md={3}>
              <Card sx={{ minWidth: 275, height:"100%" }}>
                <CardContent>
                  <Typography align="center" sx={{ fontSize: 20, fontWeight: 500, pt:2, pb:1 }} variant="h5" component="div">
                    America/New_York
                  </Typography>
                  <Typography align="center" sx={{ fontSize: 14, fontWeight: 300}} color="text.secondary" gutterBottom>
                    Timezone
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
        </Grid>
        {/* </Stack> */}
      </Container>
    )
}