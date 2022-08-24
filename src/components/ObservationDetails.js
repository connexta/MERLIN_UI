import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography';

export default function Observation(props) {
    const allData = useSelector((state) => state.data.observationData)
    const observation = useSelector((state) => state.data.observationSelected)

    console.log(observation)
    let data
    if (observation !== null) {
        data = allData.find((d) =>
            d.id === observation
        )
        console.log(data, observation)
    }

    return data ? (<div><pre>{JSON.stringify(data, null, 2)}</pre></div>) : (<Typography variant="p" component="div">Choose an observation to show details</Typography>)
}