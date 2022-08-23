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
import WebSocketManager from '../WebSocketManager'

const rows = [
    { id: 0, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor1', description: "description" },
    { id: 1, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor1', description: "description" },
    { id: 2, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor1', description: "description" },
    { id: 3, resultTime: "2013-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor1', description: "description" },
    { id: 4, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor1', description: "description" },
    { id: 5, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor1', description: "description" },
    { id: 6, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor2', description: "description" },
    { id: 7, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor2', description: "description" },
    { id: 8, resultTime: "2012-03-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor2', description: "description" },
    { id: 9, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor2', description: "description" },
    { id: 10, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor2', description: "description" },
    { id: 11, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor2', description: "description" },
    { id: 12, resultTime: "2012-01-04T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor2', description: "description" },
    { id: 13, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor2', description: "description" },
    { id: 14, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor2', description: "description" },
    { id: 15, resultTime: "2012-01-01T00:04:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor3', description: "description" },
    { id: 16, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor3', description: "thisis a very long description it is very very long" }
];

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
    const { sensors, filters } = useContext(SensorContext)
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        let webSocketManager = WebSocketManager.getInstance()
        webSocketManager.setObservationListener("observation", (message) => {
            console.log("observation topic message recieved", message)
        })
        return () => webSocketManager.unsubscribe("observation")
    }, [])

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
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        setSelected(handleSelection(id, selected));
    };

    const handleSelection = (id, selections) => {
        const selectedIndex = selections.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selections, id);
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

    const isSelected = (id) => selected.indexOf(id) !== -1;

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
                        numSelected={selected.length}
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