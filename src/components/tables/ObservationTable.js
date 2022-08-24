import { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import TableHead from './TableHead'
import { SensorContext } from '../ContentManager'
import { getComparator } from './TableUtil'
import { useSelector, useDispatch } from 'react-redux'
import { selectObservation } from '../reducer'

const cells = [
    {
        label: 'Result Time',
        type: 'date',
        align: 'left',
        id: "resultTime"
    },
    {
        label: 'Collect Time',
        type: 'date',
        align: 'left',
        id: "collectTime"
    },
    {
        label: 'Sensor',
        type: 'string',
        align: 'left',
        id: "sensor"
    },
    {
        label: 'Description',
        type: 'string',
        align: 'left',
        id: "description"
    }
]

export default function ObservationTable() {
    const { filters } = useContext(SensorContext)
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const rows = useSelector((state) => state.data.observationData)
    const sensors = useSelector((state) => state.data.sensorSelected)
    const observations = useSelector((state) => state.data.observationSelected)
    const dispatch = useDispatch()
    console.log(observations)
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
            const newSelected = rows.map((n) => n.id);
            dispatch(selectObservation(newSelected))
            return;
        }
        dispatch(selectObservation([]))
    };

    const handleClick = (event, id) => {
        dispatch(selectObservation(id))
    };

    const isSelected = (id) => observations.indexOf(id) !== -1;

    const sensorFilter = (row) => {
        if (sensors.length > 0) {
            return sensors.indexOf(row.sensor) !== -1
        }
        return true
    }

    const globalFilter = (row) => {
        return filters.every(filter => {
            if (!filter.value) {
                return true
            }
            switch (filter.id) {
                case 'sensor':
                    return filter.value === row.sensor
                case 'start':
                    return new Date(filter.value) < new Date(row.resultTime) && new Date(filter.value) < new Date(row.collectTime)
                case 'end':
                    return new Date(filter.value) > new Date(row.resultTime) && new Date(filter.value) > new Date(row.collectTime)
                default:
                    return true
            }
        })
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%' }}>
                <Table
                    sx={{ minWidth: 750 }}
                    stickyHeader
                >
                    <TableHead
                        headCells={cells}
                        numSelected={observations.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {rows.slice().sort(getComparator(order, orderBy, cells)).filter(sensorFilter).filter(globalFilter)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        key={row.id}
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                onClick={(event) => handleClick(event, row.id)}
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>{row.resultTime}</TableCell>
                                        <TableCell>{row.collectTime}</TableCell>
                                        <TableCell>{row.sensor}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    );
}