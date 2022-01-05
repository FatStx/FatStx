import ReactGA from "react-ga4";
import React from "react";
import Container from '@mui/material/Container';
import { Grid } from "@mui/material";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import WenblokCycles from '../components/WenblokCycles'


export default function WenBlok() {

    ReactGA.send({ hitType: "pageview", page: "/wenblok" });

    return(
      <Container maxWidth={false} sx={{ mt: 4, mb: 4}}>
        <Grid container spacing={5}>
          <Grid item sm={12}>
            <WenblokCycles />
          </Grid>

        {/* Future Blocks */}
        <Grid item sm={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Table size="small">

            <colgroup>
              <col style={{width:'15%'}}/>
              <col style={{width:'20%'}}/>
              <col style={{width:'20%'}}/>
              <col style={{width:'45%'}}/>
            </colgroup>

            <TableHead>
              <TableRow>
                <TableCell>Block#</TableCell>
                <TableCell>Event</TableCell>
                <TableCell>When</TableCell>
                <TableCell>Info</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

            </TableBody>
            </Table>
          </Paper>
        </Grid>

        {/* Past Blocks */}
        <Grid item sm={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Table size="small">

            <colgroup>
              <col style={{width:'15%'}}/>
              <col style={{width:'20%'}}/>
              <col style={{width:'20%'}}/>
              <col style={{width:'45%'}}/>
            </colgroup>

            <TableHead>
              <TableRow>
                <TableCell>Block#</TableCell>
                <TableCell>Event</TableCell>
                <TableCell>When</TableCell>
                <TableCell>Info</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

            </TableBody>
            </Table>
          </Paper>
        </Grid>

      </Grid>


      </Container>
    )
}