import { useState } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import TableHead from './TableHead'
import { getComparator } from './TableUtil'
import { useSelector, useDispatch } from 'react-redux'
import { selectObservation } from '../reducer'

const cells = [
  {
    label: 'Result Time',
    type: 'date',
    align: 'left',
    id: 'observation.resultTime.timePosition',
  },
  {
    label: 'Collect Time',
    type: 'date',
    align: 'left',
    id: 'observation.phenomenonTime.beginPosition',
  },
  {
    label: 'Sensor',
    type: 'string',
    align: 'left',
    id: 'offering',
  },
  {
    label: 'Type',
    type: 'string',
    align: 'left',
    id: 'observation.type',
  },
]

export default function ObservationTable() {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('')
  const rows = useSelector((state) => state.data.observationData)
  const sensorData = useSelector((state) => state.data.sensorData)
  const sensors = useSelector((state) => state.data.sensorSelected)
  const observation = useSelector((state) => state.data.observationSelected)
  const filters = useSelector((state) => state.data.filters)
  const dispatch = useDispatch()

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleClick = (event, id) => {
    dispatch(selectObservation(id))
  }

  const isSelected = (id) => observation === id

  const sensorFilter = (row) => {
    if (sensors.length > 0) {
      const sensorOfferings = sensorData
        .map((sensor) => {
          if (sensors.indexOf(sensor.id) !== -1) {
            return sensor.assignedOffering
          }
        })
        .filter((offering) => offering !== null)
      return sensorOfferings.indexOf(row.offering) !== -1
    }
    return true
  }

  const globalFilter = (row) => {
    return filters.every((filter) => {
      if (!filter.value) {
        return true
      }
      switch (filter.id) {
        case 'start':
          return (
            new Date(filter.value) <
              new Date(row.observation.resultTime.timePosition) ||
            new Date(filter.value) <
              new Date(row.observation.phenomenonTime.beginPosition)
          )
        case 'end':
          return (
            new Date(filter.value) >
              new Date(row.observation.resultTime.timePosition) ||
            new Date(filter.value) >
              new Date(row.observation.phenomenonTime.beginPosition)
          )
        default:
          return true
      }
    })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <Table sx={{ minWidth: 750 }} stickyHeader>
          <TableHead
            headCells={cells}
            disableCheckbox
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {rows
              .slice()
              .sort(getComparator(order, orderBy, cells))
              .filter(sensorFilter)
              .filter(globalFilter)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id)
                const labelId = `enhanced-table-checkbox-${index}`
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
                    <TableCell>
                      {row.observation.resultTime.timePosition}
                    </TableCell>
                    <TableCell>
                      {row.observation.phenomenonTime.beginPosition}
                    </TableCell>
                    <TableCell>{row.offering}</TableCell>
                    <TableCell>{row.observation.type}</TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  )
}
