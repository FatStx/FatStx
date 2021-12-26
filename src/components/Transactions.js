import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';


export default function Transactions({txnData}) {

  return (
    <React.Fragment>
      <Title>Transactions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Tx Type</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Tx ID</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {txnData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.burnDate}</TableCell>
              <TableCell>{row.direction}</TableCell>
              <TableCell>{row.inSymbol}</TableCell>
              <TableCell>{row.xactnId}</TableCell>
              <TableCell>{row.inAmount}</TableCell>
              <TableCell align="right">{`$${row.inCoinPrice}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" sx={{ mt: 3 }}>
        Export to CSV
      </Link>
    </React.Fragment>
  );
}
