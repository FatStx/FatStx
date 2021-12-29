import React, { useState, useRef } from "react";
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

import { CSVLink } from "react-csv";

import Title from './Title';
import Tx from './Tx';

export default function Transactions({txnData}) {

  console.log(txnData)

  const [textCopiedAlertVisible, setTextCopiedAlertVisible] = useState(false);
  const csvLink = useRef()

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
    if (txnData.length !== 0 ) {
      csvLink.current.link.click()
    }
  };

  const wordifyTransaction = (row) => {

    var transactionInWords = ''

    if ( row.outAmount > 0 ) {
      transactionInWords += row.outAmount + ' ' + row.outSymbol + ' OUT'
    }

    if ( row.inAmount > 0 ) {
      transactionInWords += transactionInWords.length !== 0? ', ' : ''
      transactionInWords += row.inAmount + ' ' + row.inSymbol + ' IN'
    }

    return transactionInWords
  };

  const toDateString = (dateString) => {
    var d = new Date (dateString)
    return d.toISOString().slice(0,10).replaceAll('-','/')
      + '  ' 
      + d.toISOString().slice(11,16) 
      + ' UTC';
  }

  const toUTCString = (dateString) => {
    var d = new Date (dateString)
    return d.toUTCString();
  }

  return (
    <React.Fragment>
      <Snackbar
        open={textCopiedAlertVisible}
        autoHideDuration={1000}
        onClose={handleCopyClose}
        message="Transaction Id copied to clipboard"
      />

      <Grid container >
        <Grid item xs={9}>
          <Title>Transactions</Title>
        </Grid>
        <Grid item xs={3}>
          <Button 
            variant="contained" 
            sx={{ float: "right", minWidth: 100}}
            onClick={handleExport}
          > Export </Button>
        </Grid>
      </Grid>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>
              <Grid container direction="row" alignItems="center">
                <Grid item xs align='right'> IN</Grid>
                <Divider orientation="vertical" flexItem> </Divider>
                <Grid item xs> OUT </Grid>
              </Grid>
            </TableCell>
            <TableCell>TxID</TableCell>
            <TableCell align="right">Fee</TableCell>
            <TableCell align="right">In Price</TableCell>
            <TableCell align="right">Out Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {txnData.map((row) => (
            <TableRow key={row.rowId}>
              
              <Tooltip title={toUTCString(row.burnDate)} arrow>
                <TableCell>
                  {toDateString(row.burnDate)}
                </TableCell>
              </Tooltip>

              <TableCell>
                  <Tx 
                    inAmount={parseFloat(row.inAmount).toFixed(2)} 
                    inSymbol={row.inSymbol} 
                    outAmount={parseFloat(row.outAmount).toFixed(2)} 
                    outSymbol={row.outSymbol}
                  />
                </TableCell>

              <TableCell sx={{ fontFamily: 'Monospace' }}>
                <a 
                  href = {"https://explorer.stacks.co/txid/" + row.xactnId + "?chain=mainnet"}
                >
                  {row.xactnId.substring(0, 4) + '…' + row.xactnId.slice(-3) }
                </a>
                <ContentCopyIcon 
                  sx={{ 
                    ml:1, 
                    fontSize: '16px', 
                    color: '#AAA' 
                  }}
                  onClick={() => {
                    
                    handleCopyClick()
                    // Copy Txid to clipbpoard
                    navigator.clipboard.writeText(
                      txnData.filter(obj => {
                        return obj.rowId === row.rowId
                      })[0].xactnId
                    )}

                  }
                />
              </TableCell>

              <TableCell align="right">STX 0.00</TableCell>
              <TableCell align="right">{`$ 0.00${row.inCoinPrice}`}</TableCell>
              <TableCell align="right">{`$ 0.00${row.outCoinPrice}`}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div>
        <CSVLink
            data={txnData}
            filename="transactions.csv"
            className="hidden"
            ref={csvLink}
            target="_blank"/>
      </div>
    </React.Fragment>
  );
}
