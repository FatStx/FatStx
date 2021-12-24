import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, direction, name, shipTo, paymentMethod, amount) {
  return { id, date, direction, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'In',
    'NYC',
    '0x9736a6d28481ff303a3dbaf75ad1b82d4ae0afca20c9e79d81cf8064d3b311e3',
    200000,
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'In',
    'MIA',
    '0x9736a6d28481ff303a3dbaf75ad1b82d4ae0afca20c9e79d81cf8064d3b311e3',
    40000,
    866.99,
  ),
  createData(
    2, 
    '16 Mar, 2019',
    'Out',
    'DIKO', 
    '0x9736a6d28481ff303a3dbaf75ad1b82d4ae0afca20c9e79d81cf8064d3b311e3', 
    300000, 
    100.81
  ),
  createData(
    3,
    '16 Mar, 2019',
    'Out',
    'STX',
    '0x9736a6d28481ff303a3dbaf75ad1b82d4ae0afca20c9e79d81cf8064d3b311e3',
    4000,
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Out',
    'BTC',
    '0x9736a6d28481ff303a3dbaf75ad1b82d4ae0afca20c9e79d81cf8064d3b311e3',
    3,
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
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
            <TableCell align="right">in USD</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.direction}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Export to CSV
      </Link>
    </React.Fragment>
  );
}
