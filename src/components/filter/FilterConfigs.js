const headerFilters = [
    {
        id: "keywords",
        label: "Keywords",
        value: ''
    },
    {
        id: "sensor",
        label: "Sensor",
        value: ''
    },
    {
        id: "start",
        label: "Start Date",
        value: ''
    },
    {
        id: "end",
        label: "End Date",
        value: ''
    }
]

const snesorTableFilters = [
    {
        id: "keywords",
        label: "Keywords",
        value: ''
    },
    {
        id: "sensor",
        label: "Sensor",
        value: ''
    },
    {
        id: "unit",
        label: "Unit",
        value: ''
    },
    {
        id: "mission",
        label: "Mission",
        value: ''
    },
    {
        id: "aoi",
        label: "AOI",
        value: ''
    },
    {
        id: "start",
        label: "Start Date",
        value: ''
    },
    {
        id: "end",
        label: "End Date",
        value: ''
    }
]

export function getHeaderFilterConfig() {
    return headerFilters
}

export function getSensorTableFilterConfig() {
    return snesorTableFilters
}