"use client"

import {AppBar, Toolbar, IconButton, Typography, Box, Tooltip, Menu, MenuItem, Avatar, CircularProgress, Stack} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Spacer from './spacer';

export default function MyAppbar({title, openDrawer, setOpenDrawer}) {

  const router = useRouter();
  const { data: session, status } = useSession()
  const [signoutLoading, setSignoutLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  function handleClickAvatar(event){
    setOpenUserMenu(!openUserMenu);
    setAnchorEl(event.currentTarget);
  }


  async function handleSignout(){
    setSignoutLoading(true);
    await signOut(
      {redirect: false}
    )
    setSignoutLoading(false);
    router.replace('/login');
  }

    return (
        <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" >
            {title ? title : "Dashboard"}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          
          <Typography align='right'>Welcome, {status == "authenticated" ? session.user.name : "..."}</Typography>
          
          <Spacer sx={1} sy={0}/>
          
          <Stack sx={{ flexGrow: 0 }} direction="row" alignItems="center" spacing={3}>
            <Tooltip title="Open User Menu">
              <IconButton onClick={handleClickAvatar} sx={{ p: 0 }} id='menu-appbar'>
                <Avatar alt="C"/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              open={openUserMenu}
              onClose={() => {setOpenUserMenu(false)}}
            >
              <MenuItem onClick={() => setOpenUserMenu(false)}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
            </Menu>
            <LoadingButton variant='contained' color="error" sx={{ backgroundColor: signoutLoading ? "red !important" : "" }} loading={signoutLoading} onClick={handleSignout}>Logout</LoadingButton>
          </Stack>
        </Toolbar>
      </AppBar>
    );
}
