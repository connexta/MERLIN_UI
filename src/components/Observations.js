import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

//declare type GridNativeColTypes = 'string' | 'number' | 'date' | 'dateTime' | 'boolean' | 'singleSelect';

// valueGetter: (params) =>
//     `${params.row.firstName || ''} ${params.row.lastName || ''}`,

const columns = [
    { field: 'resultTime', headerName: 'Result Time', type: 'date' },
    { field: 'collectTime', headerName: 'Collect Time', type: 'dateTime' },
    { field: 'sensor', headerName: 'Sensor', type: 'string' },
    {
        field: 'description',
        headerName: 'Description',
        type: 'string'
    },
];

const rows = [
    { id: 0, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor', description: "description" },
    { id: 1, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor', description: "description" },
    { id: 2, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor', description: "description" },
    { id: 3, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor', description: "description" },
    { id: 4, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor', description: "description" },
    { id: 5, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor', description: "description" },
    { id: 6, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor', description: "description" },
    { id: 7, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor', description: "description" },
    { id: 8, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor', description: "description" },
    { id: 9, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor', description: "description" },
    { id: 10, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor', description: "description" },
    { id: 11, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor', description: "description" },
    { id: 12, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor', description: "description" },
    { id: 13, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor', description: "description" },
    { id: 14, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor', description: "description" },
    { id: 15, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor', description: "description" },
    { id: 16, resultTime: "2012-01-01T00:00:00.000Z", collectTime: '2013-05-22T09:47:20.000Z', sensor: 'Temperature Sensor', description: "description" }
];

export default function DataTable() {
    return (
        <div style={{ height: '100%', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                rowsPerPageOptions={[5]}
                checkboxSelection
                autoPageSize
            />
        </div>
    );
}