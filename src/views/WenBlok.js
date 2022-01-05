import ReactGA from "react-ga4";
import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import { Grid } from "@mui/material";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import WenblokCycles from '../components/WenblokCycles'
import { getTrackedBlocks } from '../api/wenblok'


export default function WenBlok() {

    ReactGA.send({ hitType: "pageview", page: "/wenblok" });

    const [ futureBlocks , setFutureBlocks ] = useState([]);
    const [ pastBlocks, setPastBlocks ] = useState([]);

    useEffect(() => {
      (async () => {

        const trackedBlocks = await getTrackedBlocks()
        console.log('Future')
        console.log(trackedBlocks.futureBlocks)
        console.log('Past')
        console.log(trackedBlocks.pastBlocks)
        
        setFutureBlocks(trackedBlocks.futureBlocks)
        setPastBlocks(trackedBlocks.pastBlocks)
 
      })()
    }, [])

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

              {futureBlocks.map((row) => (
                <TableRow key={row.blockheight}>
                  <TableCell>{row.blockheight}</TableCell>
                  <TableCell>{row.event}</TableCell>
                  <TableCell>{row.when}</TableCell>
                  <TableCell>{row.link}</TableCell>
                </TableRow>
              ))}

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
              {pastBlocks.map((row) => (
                <TableRow key={row.blockheight}>
                  <TableCell>{row.blockheight}</TableCell>
                  <TableCell>{row.event}</TableCell>
                  <TableCell>{row.when}</TableCell>
                  <TableCell>{row.link}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </Paper>
        </Grid>

      </Grid>


      </Container>
    )
}