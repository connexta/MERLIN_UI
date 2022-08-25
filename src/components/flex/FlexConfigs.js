import Observations from '../tables/ObservationTable'
import Sensors from '../tables/sensor-table/SensorTable'
import Map from '../Map'
import ObservationDetails from '../ObservationDetails'

const components = [
  {
    id: 'sensor-capabilities',
    component: Sensors,
    label: 'Sensors Capabilities',
  },
  {
    id: 'observations',
    component: Observations,
    label: 'Observations',
  },
  {
    id: 'map',
    component: Map,
    label: 'Map',
  },
  {
    id: 'observation-details',
    component: ObservationDetails,
    label: 'Observation Details',
  },
]

const flexStartConfig = {
  global: {},
  borders: [],
  layout: {
    type: 'row',
    weight: 100,
    children: [
      {
        type: 'tabset',
        weight: 50,
        children: [
          {
            type: 'tab',
            name: 'Sensors Capabilities',
            component: 'sensor-capabilities',
          },
        ],
      },
      {
        type: 'tabset',
        weight: 50,
        children: [
          {
            type: 'tab',
            name: 'Observations',
            component: 'observations',
          },
        ],
      },
    ],
  },
}

export function getFlexComponents() {
  return components
}

export function getFlexConfig() {
  return flexStartConfig
}
