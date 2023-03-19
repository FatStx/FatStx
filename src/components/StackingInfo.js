import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

export default function StackingInfo(currentBitcoinBlock) {
  return (
    <React.Fragment>
    <Typography component="p" id='bitcoin-block' gutterBottom>
      <em>Current Bitcoin Block: {currentBitcoinBlock.currentBitcoinBlock} (rewards available 100 blocks after cycle end)</em>
    </Typography>
    </React.Fragment>
  );
}
