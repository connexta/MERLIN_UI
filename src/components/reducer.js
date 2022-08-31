import { createSlice } from '@reduxjs/toolkit'
import { getHeaderFilterConfig } from './filter/FilterConfigs'
import { v4 as uuidv4 } from 'uuid'

const handleSelection = (id, selections) => {
  const selectedIndex = selections.indexOf(id)
  let newSelected = []

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selections, id)
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selections.slice(1))
  } else if (selectedIndex === selections.length - 1) {
    newSelected = newSelected.concat(selections.slice(0, -1))
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selections.slice(0, selectedIndex),
      selections.slice(selectedIndex + 1)
    )
  }
  return newSelected
}

export const dataManager = createSlice({
  name: 'data',
  initialState: {
    sensorData: [],
    observationData: [],
    sensorSelected: [],
    observationSelected: null,
    filters: getHeaderFilterConfig(),
  },
  reducers: {
    addSensorData: (state, action) => {
      state.sensorData.push({ ...action.payload, id: uuidv4() })
    },
    addObservationData: (state, action) => {
      state.observationData.push({ ...action.payload, id: uuidv4() })
    },
    selectSensor: (state, action) => {
      Array.isArray(action.payload)
        ? (state.sensorSelected = action.payload)
        : (state.sensorSelected = handleSelection(
            action.payload,
            state.sensorSelected
          ))
    },
    selectObservation: (state, action) => {
      state.observationSelected === action.payload
        ? (state.observationSelected = null)
        : (state.observationSelected = action.payload)
    },
    setFilters: (state, action) => {
      if (action.payload === 'clear') {
        state.filters = state.filters.map((filter) => {
          return filter.type === 'date'
            ? { ...filter, value: null }
            : { ...filter, value: '' }
        })
      } else {
        state.filters = action.payload
      }
      const jsonStr = JSON.stringify(state.filters, null, '\t')
      localStorage.setItem('filterName', jsonStr)
    },
  },
})

export const {
  addSensorData,
  addObservationData,
  selectSensor,
  selectObservation,
  setFilters,
} = dataManager.actions

export default dataManager.reducer
