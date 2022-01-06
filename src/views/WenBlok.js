import ReactGA from "react-ga4";
import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import { Grid, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Title from '../components/Title';
import WenblokCycles from '../components/WenblokCycles'
import { getTrackedBlocks } from '../api/wenblok'


export default function WenBlok() {

    const shorten = function( inString ) {
      var lengthCap = 40
      if (inString.length > lengthCap) {
        return inString.slice(0, lengthCap) + "...";
      } else {
        return inString;
      }
    }

    ReactGA.send({ hitType: "pageview", page: "/wenblok" });

    const [ futureBlocks , setFutureBlocks ] = useState([]);
    const [ pastBlocks, setPastBlocks ] = useState([]);

    useEffect(() => {
      (async () => {

        const trackedBlocks = await getTrackedBlocks()        
        setFutureBlocks(trackedBlocks.futureBlocks)
        setPastBlocks(trackedBlocks.pastBlocks)
 
      })()
    }, [])

    return(
      <Container sx={{ mt: 4, mb: 4}}>
        <Grid container spacing={5}>
          <Grid item sm={12}>
            <WenblokCycles />
          </Grid>

        {/* Future Blocks */}
        <Grid item sm={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Title>Upcoming Events</Title>
            <Table size="small">

              <colgroup>
                <col style={{width:'10%'}}/>
                <col style={{width:'20%'}}/>
                <col style={{width:'20%'}}/>
                <col style={{width:'50%'}}/>
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
                    <TableCell>
                      <Typography color="common.grey"  sx={{ fontWeight: 500}} >{row.when.delta}</Typography>
                      <Typography color="common.grey"  sx={{ fontWeight: 300, fontSize: "0.75rem"}}  >{row.when.at}</Typography>
                    </TableCell>
                    <TableCell><a href={row.link}target="_blank" rel="noopener noreferrer"> { shorten(row.link) } </a></TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </Paper>
        </Grid>

        {/* Past Blocks */}
        <Grid item sm={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Title>Past Events</Title>
            <Table size="small">

              <colgroup>
                <col style={{width:'10%'}}/>
                <col style={{width:'20%'}}/>
                <col style={{width:'20%'}}/>
                <col style={{width:'50%'}}/>
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
                    <TableCell>
                      <Typography color="common.grey"  sx={{ fontWeight: 500}} >{row.when.delta}</Typography>
                      <Typography color="common.grey"  sx={{ fontWeight: 300, fontSize: "0.75rem"}}  >{row.when.at}</Typography>
                    </TableCell>
                    <TableCell><a href={row.link}target="_blank" rel="noopener noreferrer"> { shorten(row.link) } </a></TableCell>
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