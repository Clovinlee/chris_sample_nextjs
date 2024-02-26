"use client"

import { AppBar, IconButton, Toolbar, Typography, Box, Drawer, Button, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Avatar } from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';

import Link from "next/link";


export default function MyDrawer({openDrawer, setOpenDrawer}) {
    
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpenDrawer(false)}>
          <List>
            {['Dashboard', 'Inventory'].map((text, index) => (
              <Link key={"link_"+text} href={"/"+text.toLowerCase()} tabIndex={-1}>
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index == 0 ? <DashboardIcon /> : <InventoryIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      );
    
    return (
        <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
          {DrawerList}
        </Drawer>
    );
}
