import { useReducer } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

function reducer(state, action) {
  if (action.id === 'clear') {
    return state.map((filter) => {
      return filter.type === 'date'
        ? { ...filter, value: null }
        : { ...filter, value: '' }
    })
  }
  const i = state.findIndex((filter) => {
    return filter.id === action.id
  })
  if (i === -1) {
    return state
  }
  let newState = []
  const newValue = { ...state[i], value: action.value }
  if (i === 0) {
    newState = newState.concat(newValue, state.slice(1))
  } else if (i === state.length - 1) {
    newState = newState.concat(state.slice(0, -1), newValue)
  } else if (i > 0) {
    newState = newState.concat(state.slice(0, i), newValue, state.slice(i + 1))
  }
  return newState
}

export default function Filter(props) {
  const { onFilterChange, filters, handleClose } = props
  const [state, dispatch] = useReducer(reducer, filters)

  const handleApplyFilters = () => {
    const filters = state.map((filter) => {
      if (filter.value === 'Invalid Date') {
        filter.value = ''
      }
      return filter
    })
    onFilterChange(filters)
    handleClose()
  }

  const handleClearFilters = () => {
    dispatch({ id: 'clear' })
  }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        justifyContent: 'center',
      }}
    >
      <Typography sx={{ p: 2 }}>Sensor Filter</Typography>
      <Stack spacing={2} alignItems="center">
        {state.map((filter) =>
          filter.type === 'date' ? (
            <LocalizationProvider dateAdapter={AdapterDateFns} key={filter.id}>
              <DesktopDatePicker
                label={filter.label}
                inputFormat="MM/dd/yyyy"
                value={filter.value}
                onChange={(value) => {
                  dispatch({ id: filter.id, value: value.toLocaleDateString() })
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          ) : (
            <TextField
              key={filter.id}
              sx={{ width: '100%' }}
              id="outlined-basic"
              label={filter.label}
              variant="outlined"
              value={filter.value}
              onChange={(e) =>
                dispatch({ id: filter.id, value: e.target.value })
              }
            />
          )
        )}
        <ButtonGroup variant="text" aria-label="text button group">
          <Button onClick={handleApplyFilters}>Apply</Button>
          <Button onClick={handleClearFilters}>Clear</Button>
        </ButtonGroup>
      </Stack>
    </Box>
  )
}
