// src/theme.ts
'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({

  breakpoints: {
    values: {
      xs: 0,
      ssm: 300,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
