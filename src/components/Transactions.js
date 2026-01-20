import React, { useState, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import LinkIcon from '@mui/icons-material/Link';

import { CSVLink } from 'react-csv';

import Title from './Title';
import Tx from './Tx';
import { Box, Typography } from '@mui/material';
import convertTxReportArrayToTxCSVArray from '../bl/TransactionCsvBL';

export default function Transactions({ txnData, name, currency }) {
  const [textCopiedAlertVisible, setTextCopiedAlertVisible] = useState(false);
  const csvLink = useRef();
  let csvArray = [];
  if (txnData.length) {
    csvArray = convertTxReportArrayToTxCSVArray(txnData, currency);
  }

  const linkRows = (rowId) => {
    let txId = txnData.filter(function (data) {
      return data.rowId === rowId;
    })[0].xactnId;

    let prevTxId = txnData.filter(function (data) {
      return data.rowId === rowId - 1;
    })[0]?.xactnId;

    if (txId === prevTxId) {
      return (
        <Tooltip title="Same transaction Id" arrow>
          <Paper
            elevation={0}
            variant="outlined"
            sx={{
              background: '#fff8bd',
              px: 2,
              py: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <LinkIcon />
          </Paper>
        </Tooltip>
      );
    } else {
      return '';
    }
  };

  const handleCopyClick = () => {
    setTextCopiedAlertVisible(true);
  };

  const handleCopyClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setTextCopiedAlertVisible(false);
  };

  const handleExport = (event, reason) => {
    if (txnData.length !== 0) {
      csvLink.current.link.click();
    }
  };

  const toDateString = (dateString) => {
    var d = new Date(dateString);
    return (
      d.toISOString().slice(0, 10).replaceAll('-', '/') +
      '  ' +
      d.toISOString().slice(11, 16) +
      ' UTC'
    );
  };

  const toUTCString = (dateString) => {
    var d = new Date(dateString);
    return d.toUTCString();
  };

  const formatPrice = (price) => {
    if (price === '') {
      return '-';
    }
    return price;
  };

  const outputCurrencySymbol = (currency, price) => {
    if (price === '' || price === 'N/A') return null;
    if (currency === 'EUR') {
      return <span>&#x20AC;</span>;
    }
    return <span>$</span>;
  };

  return (
    <React.Fragment>
      <Snackbar
        open={textCopiedAlertVisible}
        autoHideDuration={1000}
        onClose={handleCopyClose}
        message="Transaction Id copied to clipboard"
      />
      <Grid container spacing={2} justifyContent="center" sx={{ width: '100%' }}>
        <Grid size={6}>
          <Title>Transactions</Title>
        </Grid>
        <Grid size={6}>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={handleExport}>
              {' '}
              Export{' '}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Table size="small">
        <colgroup>
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '16%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '7%' }} />
          <col style={{ width: '7%' }} />
          <col style={{ width: '7%' }} />
          <col style={{ width: '27%' }} />
          <col style={{ width: '2%' }} />
        </colgroup>

        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>TxID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align="right">Fee</TableCell>
            <TableCell align="right">In Price</TableCell>
            <TableCell align="right">Out Price</TableCell>
            <TableCell align="right">Fee Price</TableCell>
            <TableCell>
              <Grid container direction="row" alignItems="center" sx={{ width: '100%' }}>
                <Grid align="right" size="grow">
                  {' '}
                  IN
                </Grid>
                <Divider orientation="vertical" flexItem>
                  {' '}
                </Divider>
                <Grid size="grow"> OUT </Grid>
              </Grid>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {txnData.map((row) => (
            <TableRow key={row.rowId}>
              <Tooltip title={toUTCString(row.burnDate)} arrow>
                <TableCell>{toDateString(row.burnDate)}</TableCell>
              </Tooltip>

              <TableCell sx={{ fontFamily: 'Monospace' }}>
                <a
                  href={'https://explorer.stacks.co/txid/' + row.xactnId + '?chain=mainnet'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {'…' + row.xactnId.slice(-4)}
                </a>
                <ContentCopyIcon
                  sx={{
                    ml: 1,
                    fontSize: '16px',
                    color: '#AAA',
                  }}
                  onClick={() => {
                    handleCopyClick();
                    // Copy Txid to clipbpoard
                    navigator.clipboard.writeText(
                      txnData.filter((obj) => {
                        return obj.rowId === row.rowId;
                      })[0].xactnId
                    );
                  }}
                />
              </TableCell>

              <TableCell>
                <Stack>
                  <Typography sx={{ fontSize: '0.875rem' }}>{row.xactnType} </Typography>
                  <Typography sx={{ fontSize: '0.675rem' }} color="#888">
                    {row.xactnTypeDetail}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell align="right">{`${row.xactnFee === 0 ? '-' : 'Ӿ ' + row.xactnFee}`}</TableCell>
              <TableCell align="right">
                {outputCurrencySymbol(currency, row.inCoinPrice)}
                {formatPrice(row.inCoinPrice)}
              </TableCell>
              <TableCell align="right">
                {outputCurrencySymbol(currency, row.outCoinPrice)}
                {formatPrice(row.outCoinPrice)}
              </TableCell>
              <TableCell align="right">
                {outputCurrencySymbol(currency, row.xactnFeeCoinPrice)}
                {formatPrice(row.xactnFeeCoinPrice)}
              </TableCell>

              <TableCell>
                <Tx
                  inAmount={row.inAmount}
                  inSymbol={row.inSymbol}
                  outAmount={row.outAmount}
                  outSymbol={row.outSymbol}
                  sender={row.sender}
                  recipient={row.recipient}
                />
              </TableCell>

              <TableCell sx={{ transform: 'translate(0px, -30px)  rotate(90deg)' }} align="right">
                {linkRows(row.rowId)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <CSVLink
          data={csvArray}
          filename={`transactions-${name}.csv`}
          className="hidden"
          ref={csvLink}
          target="_blank"
        />
      </div>
    </React.Fragment>
  );
}
