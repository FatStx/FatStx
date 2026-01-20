import ReactGA from 'react-ga4';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

export default function StackingReportV3(props) {
  ReactGA.send({ hitType: 'pageview', page: '/stackingnew' });

  return (
    <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3} sx={{ width: '100%' }}>
        <Typography sx={{ fontWeight: 900 }}>
          Stacking V3 is not supported by FatStx. To reliably support it requires either one or two
          additions to the CityCoins Api, or a more complicated set of logic on fatStx which still
          may not be as reliable. So there are no plans at the moment to add support.
        </Typography>
      </Grid>
    </Container>
  );
}
