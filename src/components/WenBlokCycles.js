import React, { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

import PropTypes from 'prop-types';

import getBlockInfo from '../bl/WenBlokMethods';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', paddingLeft: '5%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          sx={{ fontSize: 12, fontWeight: 300 }}
          variant="body1"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function WenblokCycles() {
  const [currentBlock, setCurrentBlock] = useState('0');

  const [nycCycle, setNycCycle] = useState(0);
  const [nycCycleStart, setNycCycleStart] = useState(0);
  const [nycCycleEnd, setNycCycleEnd] = useState(0);
  const [nycCyclePercentComplete, setNycCyclePercentComplete] = useState(0);
  const [nycDaysLeftInCycle, setNycDaysLeftInCycle] = useState(0);

  const [miaCycle, setMiaCycle] = useState(0);
  const [miaCycleStart, setMiaCycleStart] = useState(0);
  const [miaCycleEnd, setMiaCycleEnd] = useState(0);
  const [miaCyclePercentComplete, setMiaCyclePercentComplete] = useState(0);
  const [miaDaysLeftInCycle, setMiaDaysLeftInCycle] = useState(0);

  useEffect(() => {
    (async () => {
      const blockInfo = await getBlockInfo();
      setCurrentBlock(blockInfo.currentBlock);

      setNycCycle(blockInfo.nycCurrentCycle);
      setNycCycleStart(blockInfo.nycCycleStartingBlock);
      setNycCycleEnd(blockInfo.nycCycleEndBlock);
      setNycCyclePercentComplete(blockInfo.nycCyclePercentComplete);
      setNycDaysLeftInCycle(
        Math.floor(((blockInfo.nycCycleEndBlock - blockInfo.currentBlock) * 10) / 60 / 24)
      );

      setMiaCycle(blockInfo.miaCurrentCycle);
      setMiaCycleStart(blockInfo.miaCycleStartingBlock);
      setMiaCycleEnd(blockInfo.miaCycleEndBlock);
      setMiaCyclePercentComplete(blockInfo.miaCyclePercentComplete);
      setMiaDaysLeftInCycle(
        Math.floor(((blockInfo.miaCycleEndBlock - blockInfo.currentBlock) * 10) / 60 / 24)
      );
    })();
  }, []);

  return (
    <Grid container spacing={3} sx={{ width: '100%' }}>
      <Grid
        size={{
          xs: 12,
          sm: 3,
          md: 3,
        }}
      >
        <Card sx={{ minWidth: 275, height: '100%' }}>
          <CardContent>
            <Typography
              align="center"
              sx={{ fontSize: 40, fontWeight: 100 }}
              variant="h5"
              color="#344767"
              component="div"
            >
              {currentBlock}
            </Typography>
            <Typography
              align="center"
              sx={{ fontSize: 14, fontWeight: 300 }}
              color="text.secondary"
              gutterBottom
            >
              Current STX Block
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 3,
          md: 3,
        }}
      >
        <Card sx={{ minWidth: 275, height: '100%' }}>
          <Tooltip title={'Start: ' + nycCycleStart + ' End: ' + nycCycleEnd}>
            <CardContent>
              <Typography
                align="center"
                sx={{ fontSize: 40, fontWeight: 100 }}
                variant="h5"
                color="#344767"
                component="div"
              >
                {nycCycle}
              </Typography>
              <Typography
                align="center"
                sx={{ fontSize: 14, fontWeight: 300 }}
                color="text.secondary"
                gutterBottom
              >
                NYC Cycle: {nycDaysLeftInCycle} days left
              </Typography>
              <Box sx={{ width: '100%' }}>
                <LinearProgressWithLabel value={nycCyclePercentComplete} />
              </Box>
            </CardContent>
          </Tooltip>
        </Card>
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 3,
          md: 3,
        }}
      >
        <Card sx={{ minWidth: 275, height: '100%' }}>
          <Tooltip title={'Start: ' + miaCycleStart + ' End: ' + miaCycleEnd}>
            <CardContent>
              <Typography
                align="center"
                sx={{ fontSize: 40, fontWeight: 100 }}
                variant="h5"
                color="#344767"
                component="div"
              >
                {miaCycle}
              </Typography>
              <Typography
                align="center"
                sx={{ fontSize: 14, fontWeight: 300 }}
                color="text.secondary"
                gutterBottom
              >
                MIA Cycle: {miaDaysLeftInCycle} days left
              </Typography>
              <Box sx={{ width: '100%' }}>
                <LinearProgressWithLabel value={miaCyclePercentComplete} />
              </Box>
            </CardContent>
          </Tooltip>
        </Card>
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 3,
          md: 3,
        }}
      >
        <Card sx={{ minWidth: 275, height: '100%' }}>
          <CardContent>
            <Typography
              align="center"
              sx={{ fontSize: 20, fontWeight: 500, pt: 2, pb: 1 }}
              variant="h5"
              color="#344767"
              component="div"
            >
              {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </Typography>
            <Typography
              align="center"
              sx={{ fontSize: 14, fontWeight: 300 }}
              color="text.secondary"
              gutterBottom
            >
              Timezone
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
