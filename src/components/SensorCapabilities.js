import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(
    name,
    type,
    unit,
    mission,
    aoi,
    start,
    end,
    capabilities
) {
    return {
        name,
        type,
        unit,
        mission,
        aoi,
        start,
        end,
        capabilities
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                <TableCell align="right">{row.mission}</TableCell>
                <TableCell align="right">{row.aoi}</TableCell>
                <TableCell align="right">{row.start}</TableCell>
                <TableCell align="right">{row.end}</TableCell>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Capabilities
                            </Typography>
                            {/* <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table> */}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const rows = [
    createData('Temperature Sensor', 'Temperature Sensor', '', '', '', '01-Jan-2012', '31-Dec-2012', [{
        type: '2020-01-05',
        customerId: '11091700',
        amount: 3,
    }]),
    createData('Temperature Sensor', 'Temperature Sensor', '', '', '', '01-Jan-2012', '31-Dec-2012', [{
        type: '2020-01-05',
        customerId: '11091700',
        amount: 3,
    }]),
    createData('Temperature Sensor', 'Temperature Sensor', '', '', '', '01-Jan-2012', '31-Dec-2012', [{
        type: '2020-01-05',
        customerId: '11091700',
        amount: 3,
    }]),
    createData('Temperature Sensor', 'Temperature Sensor', '', '', '', '01-Jan-2012', '31-Dec-2012', [{
        type: '2020-01-05',
        customerId: '11091700',
        amount: 3,
    }]),
];

export default function CollapsibleTable() {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Unit</TableCell>
                        <TableCell align="right">Mission</TableCell>
                        <TableCell align="right">AOI</TableCell>
                        <TableCell align="right">Start</TableCell>
                        <TableCell align="right">End</TableCell>
                        <TableCell>Capabilities</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}