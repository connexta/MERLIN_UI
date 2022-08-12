import Observations from './Observations'
import Sensors from './Sensors'

const components = [{
    id: "sensor-capabilities",
    component: Sensors,
    label: "Sensors Capabilities"
}, {
    id: "observations",
    component: Observations,
    label: "Observations"
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
    return flexStartConfig //or saved config
}