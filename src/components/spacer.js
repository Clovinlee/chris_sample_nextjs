import { Box } from '@mui/material';

export default function Spacer (props) {
    const sy = props.sy ?? 2;
    const sx = props.sx ?? 0;
    return (
        <Box sx={{ my:sy, mx:sx }}></Box>
    )
}