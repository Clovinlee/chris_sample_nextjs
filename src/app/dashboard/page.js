"use client"

import { AppBar, IconButton, Toolbar, Typography, Box, Drawer, Button, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Avatar } from '@mui/material';

import { useState } from 'react';

import MyDrawer from '@/components/drawer';
import MyAppbar from '@/components/appbar';

export default function page() {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <MyAppbar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}/>
      
      <Box sx={{ display:'flex' }}>
        <MyDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      </Box>
    </>
  );
}
