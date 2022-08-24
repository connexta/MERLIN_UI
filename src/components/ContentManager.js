import { useRef, useState, useEffect, createContext } from 'react';
import Header from './Header'
import FlexLayout from './flex/FlexLayout';
import { Model } from "flexlayout-react";
import { getFlexConfig } from './flex/FlexConfigs';
import { getHeaderFilterConfig } from './filter/FilterConfigs';
import { styled } from '@mui/system';
import debounce from 'lodash.debounce';
import WebSocketManager from './WebSocketManager'
import { useDispatch } from 'react-redux'
import { addSensorData, addObservationData } from './reducer'

const Wrapper = styled('div')({
    height: "100vh",
    display: "flex",
    flexDirection: "column",
});

const FlexLayoutWrapper = styled('div')({
    flexGrow: 1,
    position: "relative",
    height: "100%"
});

export const SensorContext = createContext({})

const layoutStorage = "layoutName"
const filterStorage = "filterName"

export default function Container() {
    const [model, setModel] = useState(Model.fromJson(getFlexConfig()));
    const [filters, setFilters] = useState(getHeaderFilterConfig());
    const dispatch = useDispatch()

    useEffect(() => {
        const storedLayout = localStorage.getItem(layoutStorage)
        if (storedLayout !== null) {
            setModel(Model.fromJson(JSON.parse(storedLayout)))
        }
        const storedFilters = localStorage.getItem(filterStorage)
        if (storedFilters !== null) {
            setFilters(JSON.parse(storedFilters))
        }
        // let webSocketManager = WebSocketManager.getInstance()
        // webSocketManager.setSensorListener("sensor", (message) => {
        //     console.log("sensor topic message recieved", message)
        //     dispatch(addSensorData(message))
        // })
        // webSocketManager.setObservationListener("observations", (message) => {
        //     console.log("observation topic message recieved", message)
        //     dispatch(addObservationData(message))
        // })
        // return () => {
        //     webSocketManager.unsubscribe("sensor")
        //     webSocketManager.unsubscribe("observations")
        // }
    }, [])
    const flexRef = useRef(0);
    const setRef = (ref) => {
        flexRef.current = ref;
    }

    const save = () => {
        const jsonStr = JSON.stringify(model.toJson(), null, "\t");
        localStorage.setItem(layoutStorage, jsonStr);
    }
    const debouncedSave = debounce(save, 1000)
    model.visitNodes((node, level) => {
        node.setEventListener("resize", debouncedSave)
    })

    const handleAddComponent = (id, label) => {
        flexRef.current.addTabWithDragAndDropIndirect(`Drag and Drop ${label} to desired location`, { type: "tab", component: id, name: label }, (node) => {
            node.setEventListener("resize", debouncedSave)
        })
    }

    const handleFilterChange = (filters) => {
        const jsonStr = JSON.stringify(filters, null, "\t");
        localStorage.setItem(filterStorage, jsonStr);
        setFilters(filters)
    }

    return (
        <Wrapper>
            <Header onAddComponent={handleAddComponent} onFilterChange={handleFilterChange} filters={filters} />
            <FlexLayoutWrapper>
                <SensorContext.Provider value={{ filters }}>
                    <FlexLayout model={model} setRef={setRef} />
                </SensorContext.Provider>
            </FlexLayoutWrapper>
        </Wrapper>)
}
