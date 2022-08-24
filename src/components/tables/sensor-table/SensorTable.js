import { useContext, useState, Fragment, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
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
import CustomTableHead from '../TableHead'
import { SensorContext } from '../../ContentManager'
import { getComparator } from '../TableUtil'
import { getSensorTableFilterConfig } from '../../filter/FilterConfigs';
import { useSelector, useDispatch } from 'react-redux'
import { selectSensor } from '../../reducer'

const cells = [
    {
        label: 'Name',
        type: 'string',
        align: 'left',
        id: "shortName"
    },
    {
        label: 'Type',
        type: 'string',
        align: 'right',
        id: "sensorType"
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
        id: "missionName"
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
        id: "validTimeStart"
    },
    {
        label: 'End',
        type: 'date',
        align: 'right',
        id: "validTimeEnd"
    },
];

const filterData = (filters) => (row) => {
    return filters.every(filter => {
        if (!filter.value) {
            return true
        }
        switch (filter.id) {
            case 'sensor':
                return filter.value === row.shortName
            case 'start':
                return new Date(filter.value) < new Date(row.validTimeStart)
            case 'end':
                return new Date(filter.value) > new Date(row.validTimeEnd)
            default:
                return true
        }
    })
}

export default function SensorTable() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState([]);
    const [tableFilters, setTableFilters] = useState(getSensorTableFilterConfig());
    const rows = useSelector((state) => state.data.sensorData)
    const sensors = useSelector((state) => state.data.sensorSelected)
    const filters = useSelector((state) => state.data.filters)
    const dispatch = useDispatch()

    const handleRequestSort = (
        event,
        property,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.shortName);
            dispatch(selectSensor(newSelected))
            return;
        }
        dispatch(selectSensor([]))
    };

    const handleClick = (event, shortName) => {
        dispatch(selectSensor(shortName))
    };

    const handleOpen = (shortName) => {
        open.includes(shortName) ? setOpen([]) : setOpen([shortName])
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0)
    };

    const handleTableFilterChange = (filters) => {
        setTableFilters(filters)
    }

    const isSelected = (shortName) => sensors.indexOf(shortName) !== -1;
    const isOpen = (shortName) => open.indexOf(shortName) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Paper sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <TableToolbar numSensors={rows.length} filters={tableFilters} onFilterChange={handleTableFilterChange} />
                <Paper sx={{ overflow: 'auto', flexGrow: 1 }}>
                    <Table
                        sx={{ minWidth: 750 }}
                        stickyHeader
                    >
                        <CustomTableHead
                            headCells={cells}
                            numSelected={sensors.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rows.slice().sort(getComparator(order, orderBy, cells)).filter(filterData(filters)).filter(filterData(tableFilters))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.shortName);
                                    const isItemOpen = isOpen(row.shortName);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    const capabilities = row.capabilities
                                    return (
                                        <Fragment
                                            key={row.shortName}>
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        onClick={(event) => handleClick(event, row.shortName)}
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                {cells.map((cell) =>
                                                (<TableCell
                                                    key={cell.id}
                                                    align={cell.align}
                                                >
                                                    {row[cell.id]}
                                                </TableCell>)
                                                )}
                                                <TableCell align="right">
                                                    <IconButton
                                                        aria-label="expand row"
                                                        size="small"
                                                        onClick={() => handleOpen(row.shortName)}
                                                    >
                                                        {isItemOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                                                    <Collapse in={isItemOpen} timeout="auto" unmountOnExit>
                                                        <Box sx={{ margin: 1 }}>
                                                            <Typography variant="p" sx={{ fontWeight: 'bold' }} gutterBottom component="div">
                                                                Capabilities:
                                                            </Typography>
                                                            {capabilities && Object.keys(capabilities).map((key) => (
                                                                <Fragment key={key}>
                                                                    <Typography variant="p" gutterBottom component="div">
                                                                        {key}
                                                                    </Typography>
                                                                    <Table size="small" sx={{ marginBottom: '12px' }}>
                                                                        <TableHead>
                                                                            <TableRow>
                                                                                <TableCell>Name</TableCell>
                                                                                <TableCell>Type</TableCell>
                                                                                <TableCell>Value</TableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {Object.keys(capabilities[key]).map((typeKey) => (
                                                                                <TableRow key={typeKey}>
                                                                                    <TableCell component="th" scope="row">
                                                                                        {typeKey}
                                                                                    </TableCell>
                                                                                    <TableCell>{capabilities[key][typeKey].type}</TableCell>
                                                                                    <TableCell>{capabilities[key][typeKey].value}</TableCell>
                                                                                </TableRow>
                                                                            ))}
                                                                        </TableBody>
                                                                    </Table>
                                                                </Fragment>
                                                            ))}
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
            </Paper >
        </Box >
    );
}