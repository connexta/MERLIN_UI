import { useContext, useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import TableToolbar from './SensorTableToolBar'
import TableHead from '../TableHead'
import { SensorContext } from '../flex/FlexLayoutManager'

const headCells = [
    {
        label: 'Name',
        type: 'string',
        align: 'left',
        id: "name"
    },
    {
        label: 'Type',
        type: 'string',
        align: 'right',
        id: "type"
    },
    {
        label: 'Unit',
        type: 'string',
        align: 'right',
        id: "unit"
    },
    {
        label: 'Mission',
        type: 'string',
        align: 'right',
        id: "mission"
    },
    {
        label: 'AOI',
        type: 'string',
        align: 'right',
        id: "aoi"
    },
    {
        label: 'Start',
        type: 'date',
        align: 'right',
        id: "start"
    },
    {
        label: 'End',
        type: 'date',
        align: 'right',
        id: "end"
    },
    {
        label: '',
        type: 'none',
        align: 'right',
        id: "capabilities"
    },
];

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

const rows = [
    createData('Temperature Sensor1', 'Temperature Sensor', '', '', '', '01-Jan-2012', '31-Dec-2012', [{
        type: '2020-01-05',
        customerId: '11091700',
        amount: 3,
    }]),
    createData('Temperature Sensor2', 'Temperature Sensor', '', '', '', '01-Jan-2012', '31-Dec-2012', [{
        type: '2020-01-05',
        customerId: '11091700',
        amount: 3,
    }]),
    createData('Temperature Sensor3', 'Temperature Sensor', '', '', '', '01-Jan-2012', '31-Dec-2012', [{
        type: '2020-01-05',
        customerId: '11091700',
        amount: 3,
    }]),
    createData('Temperature Sensor4', 'Temperature Sensor', '', '', '', '01-Jan-2012', '31-Dec-2012', [{
        type: '2020-01-05',
        customerId: '11091700',
        amount: 3,
    }]),
    createData('Temperature Sensor5', 'Temperature Sensor', '', '', '', '01-Jan-2012', '31-Dec-2012', [{
        type: '2020-01-05',
        customerId: '11091700',
        amount: 3,
    }]),
    createData('Temperature Sensor6', 'Temperature Sensor', '', '', '', '01-Jan-2012', '31-Dec-2012', [{
        type: '2020-01-05',
        customerId: '11091700',
        amount: 3,
    }]),
    createData('Temperature Sensor7', 'Temperature Sensor', '', '', '', '01-Jan-2012', '31-Dec-2012', [{
        type: '2020-01-05',
        customerId: '11091700',
        amount: 3,
    }]),
    createData('Temperature Sensor8', 'Temperature Sensor', '', '', '', '01-Jan-2012', '31-Dec-2012', [{
        type: '2020-01-05',
        customerId: '11091700',
        amount: 3,
    }]),
    createData('Temperature Sensor9', 'Temperature Sensor', '', '', '', '01-Jan-2012', '31-Dec-2012', [{
        type: '2020-01-05',
        customerId: '11091700',
        amount: 3,
    }]),
    createData('Temperature Sensor11', 'Temperature Sensor', '', '', '', '01-Jan-2012', '31-Dec-2012', [{
        type: '2020-01-05',
        customerId: '11091700',
        amount: 3,
    }]),
    createData('Temperature Sensor12', 'Temperature Sensor', '', '', '', '01-Jan-2012', '31-Dec-2012', [{
        type: '2020-01-05',
        customerId: '11091700',
        amount: 3,
    }]),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (
    order,
    orderBy,
) => (
    a,
    b,
    ) => {
        return order === 'desc'
            ? descendingComparator(a, b, orderBy)
            : -descendingComparator(a, b, orderBy);
    }

export default function EnhancedTable() {
    const { sensor, setSensor } = useContext(SensorContext)
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState([]);

    const handleRequestSort = (
        event,
        property,
    ) => {
        console.log(property)
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        setSelected(handleSelection(name, selected));
    };

    const handleOpen = (name) => {
        setOpen(handleSelection(name, open));
    };

    const handleSelection = (name, selections) => {
        const selectedIndex = selections.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selections, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selections.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selections.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selections.slice(0, selectedIndex),
                selections.slice(selectedIndex + 1),
            );
        }
        return newSelected
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;
    const isOpen = (name) => open.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Paper sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <TableToolbar numSensors={rows.length} />
                <Paper sx={{ overflow: 'auto' }}>
                    <Table
                        sx={{ minWidth: 750 }}
                        stickyHeader
                    >
                        <TableHead
                            headCells={headCells}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rows.slice().sort(getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const isItemOpen = isOpen(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <Fragment
                                            key={row.name}>
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        onClick={(event) => handleClick(event, row.name)}
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.type}</TableCell>
                                                <TableCell align="right">{row.unit}</TableCell>
                                                <TableCell align="right">{row.mission}</TableCell>
                                                <TableCell align="right">{row.aoi}</TableCell>
                                                <TableCell align="right">{row.start}</TableCell>
                                                <TableCell align="right">{row.end}</TableCell>
                                                <TableCell align="right">
                                                    <IconButton
                                                        aria-label="expand row"
                                                        size="small"
                                                        onClick={() => handleOpen(row.name)}
                                                    >
                                                        {isItemOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={row.name + "-ca"}>
                                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                                                    <Collapse in={isItemOpen} timeout="auto" unmountOnExit>
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
                                        </Fragment>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                >
                                    <TableCell colSpan={9} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Paper>
                <TablePagination
                    sx={{ overflow: "unset" }}
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box >
    );
}