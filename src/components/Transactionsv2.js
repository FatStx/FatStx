import React, { useState, useRef } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
// import Paper from "@mui/material/Paper";
// import LinkIcon from "@mui/icons-material/Link";
import { grey } from '@mui/material/colors';

import { DataGrid } from '@mui/x-data-grid';
import { CSVLink } from "react-csv";

import Title from './Title';
import Tx from './Tx';
import { IconButton, Typography } from "@mui/material";
import convertTxReportArrayToTxCSVArray from '../bl/TransactionCsvBL'

export default function Transactionsv2({txnData}) {

  const toDateString = (dateString) => {
    var d = new Date (dateString)
    return d.toISOString().slice(0,10).replaceAll('-','/')
  }
  
  const toTimeString = (dateString) => {
    var d = new Date (dateString)
    return d.toISOString().slice(11,16) + ' UTC';
  }
  
  const toUTCString = (dateString) => {
    var d = new Date (dateString)
    return d.toUTCString();
  }
  
  function renderTxnID(params) {
    return (
      <Stack direction="row">
        <Typography sx={{fontFamily: 'Monospace'}} >
          <a 
            href = {"https://explorer.stacks.co/txid/" + params.value + "?chain=mainnet"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {'…' + params.value.slice(-4) }
          </a>
        </Typography>
        <IconButton  variant="contained" sx={{p:0, color: '#000' }}>
          <ContentCopyIcon                   
            sx={{ 
              fontSize: '16px', 
              color: '#AAA' 
            }}/>
        </IconButton>
      </Stack>
    );
  }
  
  function renderDate(params) {
    return (
      
      <Tooltip title={toUTCString(params.value)} arrow>
        <Stack>
          <Typography sx={{fontSize:'0.8rem'}} >
            {toDateString(params.value)}
          </Typography>
          <Typography sx={{color: grey[600], fontWeight: 100 }}>
            {toTimeString(params.value)}
          </Typography>
        </Stack>
      </Tooltip>
    );
  }

  function renderTxType(params) {
    return (
      <Stack>
        <Typography sx={{fontSize:'0.8rem'}} >
          {params.row.xactnType}
        </Typography>
        <Typography sx={{color: grey[600], fontWeight: 100 }}>
          {params.row.xactnTypeDetail}
        </Typography>
      </Stack>
    );
  }

  function renderInOut(params) {
    return (
      <Tx 
        inAmount={params.row.inAmount} 
        inSymbol={params.row.inSymbol} 
        outAmount={params.row.outAmount} 
        outSymbol={params.row.outSymbol}
      />
    );
  }
  
  const columns = [
    { 
      field: 'burnDate', 
      headerName: 'Date', 
      width: 100,
      renderCell: renderDate,
    },
    {
      field: 'xactnId',
      headerName: 'TxID',
      width: 90,
      renderCell: renderTxnID,
    },
    {
      field: 'xactnType',
      headerName: 'TxType',
      width: 250,
      renderCell: renderTxType,
    },
    {
      field: 'xactnFee',
      headerName: 'Fee',
      type: 'number',
      width: 100,
    },
    {
      field: 'inCoinPrice',
      headerName: 'In Price',
      type: 'number',
      width: 100,
      editable: true,
    },
    {
      field: 'outFeeCoinPrice',
      headerName: 'Out Price',
      type: 'number',
      width: 100,
      editable: true,
    },
    {
      field: 'xactnFeeCoinPrice',
      headerName: 'Fee Price',
      type: 'number',
      width: 100,
      editable: true,
    },
    {
      field: 'inAmount',
      headerName: 'IN | OUT',
      width: 300,
      renderCell: renderInOut,
    },
  ];

  const [textCopiedAlertVisible, setTextCopiedAlertVisible] = useState(false);
  const csvLink = useRef();
  let csvArray = [];
  if (txnData.length) {
    csvArray=convertTxReportArrayToTxCSVArray(txnData);
  }

  // const linkRows = (rowId) => {

  //   let txId = txnData.filter(
  //     function(data){ return data.rowId === rowId }
  //   )[0].xactnId

  //   let prevTxId = txnData.filter(
  //     function(data){ return data.rowId === (rowId - 1) }
  //   )[0]?.xactnId

  //   if (txId === prevTxId) {
  //     return <Tooltip title="Same transaction Id" arrow>
  //       <Paper
  //         elevation={0}
  //         variant="outlined"
  //         sx={{
  //           background: "#fff8bd",
  //           px: 2,
  //           py: 1,
  //           display: "flex",
  //           flexDirection: "column"
  //         }}
  //       >
  //         <LinkIcon />
  //       </Paper>
  //     </Tooltip>
  //   } else {
  //     return ''
  //   }

  // }

  // const handleCopyClick = () => {
  //   setTextCopiedAlertVisible(true);
  // };

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

  return (
    <React.Fragment>
      <Snackbar
        open={textCopiedAlertVisible}
        autoHideDuration={1000}
        onClose={handleCopyClose}
        message="Transaction Id copied to clipboard"
      />

      <Grid container spacing={2}>
        <Grid item xs={11}>
          <Title>Transactions</Title>
        </Grid>
        <Grid item xs={1}>
          <Button 
            fullWidth
            variant="contained" 
            onClick={handleExport}
          > Export </Button>
        </Grid>
      </Grid>

      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={txnData}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[100]}
          disableSelectionOnClick
          autoHeight={true}
          rowHeight={80}
        />
      </div>

      <div>
        <CSVLink
            data={csvArray}
            filename="transactions.csv"
            className="hidden"
            ref={csvLink}
            target="_blank"/>
      </div>
    </React.Fragment>
  );
}
