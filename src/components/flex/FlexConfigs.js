import Observations from '../Observations'
import Sensors from '../sensor-table/SensorTable'
import dynamic from 'next/dynamic'
const DynamicMap = dynamic(() => import('../Map'), {
    loading: () => <div >Loading</div>,
    ssr: false,
})

const components = [{
    id: "sensor-capabilities",
    component: Sensors,
    label: "Sensors Capabilities"
}, {
    id: "observations",
    component: Observations,
    label: "Observations"
}, {
    id: "map",
    component: DynamicMap,
    label: "Map"
}]

const flexStartConfig = {
    global: {},
    borders: [],
    layout: {
        type: "row",
        weight: 100,
        children: [
            {
                type: "tabset",
                weight: 50,
                children: [
                    {
                        type: "tab",
                        name: "Sensors Capabilities",
                        component: "sensor-capabilities",
                    }
                ]
            },
            {
                type: "tabset",
                weight: 50,
                children: [
                    {
                        type: "tab",
                        name: "Observations",
                        component: "observations",
                    }
                ]
            }
        ]
    }
};

export function getFlexComponents() {
    return components
}

export function getFlexConfig() {
    return flexStartConfig
}