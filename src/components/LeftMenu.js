import * as React from 'react';
import { Link } from "react-router-dom";

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TableRowsIcon from '@mui/icons-material/TableRows';
import InfoIcon from '@mui/icons-material/Info';
import Divider from '@mui/material/Divider';


export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <MonetizationOnIcon />
      </ListItemIcon>
      <ListItemText primary="Transactions" />
    </ListItem>
    <ListItem button component={Link} to="stacking">
      <ListItemIcon>
        <TableRowsIcon />
      </ListItemIcon>
      <ListItemText primary="Stacking" />
    </ListItem>
    <ListItem button component={Link} to="wenblok">
      <ListItemIcon>
        <AccessTimeIcon />
      </ListItemIcon>
      <ListItemText primary="Wenblok" />
    </ListItem>

    <Divider />

    <ListItem button component={Link} to="disclaimer">
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary="Disclaimers" />
    </ListItem>
    <ListItem button component={Link} to="about">
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary="About" />
    </ListItem>
  </div>
);

