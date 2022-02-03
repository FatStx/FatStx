import ReactGA from "react-ga4";
import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import { Chip, Grid, Stack, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import Title from '../components/Title';
import WenblokCycles from '../components/WenBlokCycles'
import { getTrackedBlocks } from '../bl/WenBlokMethods'



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
    const [ tagList, setTagList ] = useState([]);
    const [ includedTags, setIncludedTags] = useState([]);
    const [ excludedTags, setExcludedTags] = useState([]);


    useEffect(() => {
      (async () => {

        const trackedBlocks = await getTrackedBlocks()        
        setFutureBlocks(trackedBlocks.futureBlocks)
        setPastBlocks(trackedBlocks.pastBlocks)
        setTagList([...new Set([
          ...trackedBlocks.futureBlocks.flatMap(a => a.tags),
          ...trackedBlocks.pastBlocks.flatMap(a => a.tags),
        ])])

 
      })()
    }, [])

    useEffect(() => {
      setIncludedTags(tagList)
    }, [tagList])

    return(
      <Container sx={{ mt: 4, mb: 4}}>
        <Grid container spacing={5}>
          <Grid item sm={12}>
            <WenblokCycles />
          </Grid>

          <Grid item xs={12}>
              <Paper sx={{px:2, py:3}}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={tagList}
                      getOptionLabel={(option) => option}
                      filterSelectedOptions
                      value={includedTags}
                      onChange={(event, newValue) => {
                        setIncludedTags(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Include Labels"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={tagList}
                      getOptionLabel={(option) => option}
                      filterSelectedOptions
                      value={excludedTags}
                      onChange={(event, newValue) => {
                        setExcludedTags(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Exclude Labels"
                        />
                      )}
                    />
                  </Grid>
              </Grid>
            </Paper>
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
                <col style={{width:'35%'}}/>
                <col style={{width:'15%'}}/>
              </colgroup>

              <TableHead>
                <TableRow>
                  <TableCell>Block#</TableCell>
                  <TableCell>Event</TableCell>
                  <TableCell>When</TableCell>
                  <TableCell>Info</TableCell>
                  <TableCell>Labels</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {futureBlocks
                  .filter(
                    row => row.tags.filter(tag => includedTags.includes(tag)).length > 0
                  )
                  .filter(
                    row => row.tags.filter(tag => excludedTags.includes(tag)).length === 0
                  )
                  .map((row, key) => (
                  <TableRow key={key}>
                    <TableCell>{row.blockheight}</TableCell>
                    <TableCell>{row.event}</TableCell>
                    <TableCell>
                      <Typography color="common.grey"  sx={{ fontWeight: 500}} >{row.when.delta}</Typography>
                      <Typography color="common.grey"  sx={{ fontWeight: 300, fontSize: "0.75rem"}}  >{row.when.at}</Typography>
                    </TableCell>
                    <TableCell><a href={row.link} target="_blank" rel="noopener noreferrer"> { shorten(row.link) } </a></TableCell>
                    <TableCell>
                      <Stack spacing={2} direction="row">
                        {row.tags.map((tag, key) => (
                          <Chip key={key} label={tag} size="small" />
                        ))}
                      </Stack>
                    </TableCell>
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
                <col style={{width:'35%'}}/>
                <col style={{width:'15%'}}/>
              </colgroup>

              <TableHead>
                <TableRow>
                  <TableCell>Block#</TableCell>
                  <TableCell>Event</TableCell>
                  <TableCell>When</TableCell>
                  <TableCell>Info</TableCell>
                  <TableCell>Labels</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pastBlocks
                  .filter(
                    row => row.tags.filter(tag => includedTags.includes(tag)).length > 0
                  )
                  .filter(
                    row => row.tags.filter(tag => excludedTags.includes(tag)).length === 0
                  )
                  .map((row, key) => (
                  <TableRow key={key}>
                    <TableCell>{row.blockheight}</TableCell>
                    <TableCell>{row.event}</TableCell>
                    <TableCell>
                      <Typography color="common.grey"  sx={{ fontWeight: 500}} >{row.when.delta}</Typography>
                      <Typography color="common.grey"  sx={{ fontWeight: 300, fontSize: "0.75rem"}}  >{row.when.at}</Typography>
                    </TableCell>
                    <TableCell><a href={row.link}target="_blank" rel="noopener noreferrer"> { shorten(row.link) } </a></TableCell>
                    <TableCell>
                      <Stack spacing={2} direction="row">
                        {row.tags.map((tag, key) => (
                          <Chip key={key} label={tag} size="small" />
                        ))}
                      </Stack>
                    </TableCell>
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