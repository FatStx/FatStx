import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";
import Backdrop from '@mui/material/Backdrop';
import DotLoader from "react-spinners/DotLoader";
import Title from './Title';

export default function Stacking({stackDataV3,spinnerVisible}) {

  if (typeof stackDataV3 === "undefined" || stackDataV3.length === 0) {
    return ("");
  } else if (typeof stackDataV3[0].round === "undefined") {
    return (

      <div className="no-data-message">{stackDataV3[0].message}</div>
    );
  }
              
return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Backdrop open={spinnerVisible}>
            <DotLoader  color="#ffffff" loading={true}  size={120} />
          </Backdrop>
          <Title>Stacking Report (v3)</Title>

          <Table size="small">
            <colgroup>
              <col style={{width:'5%'}}/>
              <col style={{width:'10%'}}/>
              <col style={{width:'10%'}}/>
              <col style={{width:'15%'}}/>
              <col style={{width:'15%'}}/>
              <col style={{width:'15%'}}/>
              <col style={{width:'20%'}}/>
            </colgroup>

            <TableHead>
              <TableRow>
                <TableCell>Cycle</TableCell>
                <TableCell>Start Block</TableCell>
                <TableCell>End Block</TableCell>
                <TableCell>End Block Dt</TableCell>
                <TableCell>Stacked Amt</TableCell>
                <TableCell>STX Claimed</TableCell>
                <TableCell>Claim Date/Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stackDataV3.map((row) => (
                <TableRow key={row.round}>
                  <TableCell>{row.round}</TableCell>
                  <TableCell>{row.startBlock}</TableCell>
                  <TableCell>{row.endBlock}</TableCell>
                  <TableCell>{row.endBlockDate}</TableCell>
                  <TableCell>{row.stackedCoins}</TableCell>
                  <TableCell>{row.claimedRewards>0?row.claimedRewards:row.canClaimCoin}</TableCell>
                  <TableCell>{row.claimDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}
