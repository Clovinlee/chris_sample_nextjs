"use client"
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

import {useState, useEffect} from 'react';
import { CircularProgress } from '@mui/material';

function createData(id, name, calories, fat, carbs, protein) {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
  createData(2, 'Donut', 452, 25.0, 51, 4.9),
  createData(3, 'Eclair', 262, 16.0, 24, 6.0),
  createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
  createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
  createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
  createData(9, 'KitKat', 518, 26.0, 65, 7.0),
  createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
  createData(11, 'Marshmallow', 318, 0, 81, 2.0),
  createData(12, 'Nougat', 360, 19.0, 9, 37.0),
  createData(13, 'Oreo', 437, 18.0, 63, 4.0),
];

export default function page() {

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
  
    useEffect(() => {
      async function fetchProducts(){
        setLoading(true);
        try{
          const response = await fetch(process.env.NEXT_PUBLIC_PRODUCT_API_URL+"/all");
          const responseJson = await response.json();

          setData(responseJson);
        }catch(e){
          console.log(e);
        }finally{
          setLoading(false);
        }
      }

      fetchProducts();

    }, [])

    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size='small'>
            <TableHead>
              <TableRow>
                <TableCell align="left">No</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Stock</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
             {data != null ? data.map((row, index) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                  {index+1}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.stock}</TableCell>
              </TableRow> 
            )) :  <TableRow><TableCell colSpan={4} align='center'><CircularProgress/></TableCell></TableRow>
            }
            </TableBody>
          </Table>
        </TableContainer>
    );
}