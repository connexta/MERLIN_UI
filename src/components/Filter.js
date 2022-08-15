import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function Filter(props) {
    const { onFilterChange, filters } = props
    const [keywords, setKeywords] = useState("")
    const [sensor, setSensor] = useState("")
    const [unit, setUnit] = useState("")
    const [mission, setMission] = useState("")
    const [aoi, setAOI] = useState("")
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const filterMap = [
        {
            id: "keywords",
            label: "Keywords",
            setter: setKeywords,
            value: keywords
        },
        {
            id: "sensor",
            label: "Sensor",
            setter: setSensor,
            value: sensor
        },
        {
            id: "unit",
            label: "Unit",
            setter: setUnit,
            value: unit
        },
        {
            id: "mission",
            label: "Mission",
            setter: setMission,
            value: mission
        },
        {
            id: "aoi",
            label: "AOI",
            setter: setAOI,
            value: aoi
        },
        {
            id: "start",
            label: "Start Date",
            setter: setStart,
            value: start
        },
        {
            id: "end",
            label: "End Date",
            setter: setEnd,
            value: end
        }
    ]
    useEffect(() => {
        filters.map(filter => {
            const filterSetter = filterMap.find(filterItem => filterItem.id === filter.id)
            filterSetter.setter(filter.value)
        })
    }, [])

    const handleChange = (setter) => (e) => {
        const value = e.target.value
        setter(value)
    }

    const handleApplyFilters = () => {
        const filterChange = filterMap.map(filter => {
            if (filter.value !== "") {
                return {
                    id: filter.id,
                    value: filter.value,
                    label: filter.label
                }
            }
        }).filter(filter => filter !== undefined)
        onFilterChange(filterChange)
    }

    const handleClearFilters = () => {
        onFilterChange([])
        filterMap.map(filter => {
            filter.setter("")
        })
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                justifyContent: "center"
            }}>
            <Typography sx={{ p: 2 }}>Sensor Filter</Typography>
            <Stack
                spacing={2}
                alignItems="center">
                {filterMap.map(filter =>
                    <TextField
                        key={filter.id}
                        id="outlined-basic"
                        label={filter.label}
                        variant="outlined"
                        value={filter.value}
                        onChange={handleChange(filter.setter)} />)}
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button onClick={handleApplyFilters}>Apply</Button>
                    <Button onClick={handleClearFilters}>Clear</Button>
                </ButtonGroup>
            </Stack>
        </Box>
    );
};