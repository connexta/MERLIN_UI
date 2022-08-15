import { useRef, useState, useEffect, createContext } from 'react';
import Header from '../Header'
import FlexLayout from './FlexLayout';
import { Model } from "flexlayout-react";
import { getFlexConfig } from './FlexUtil';
import { styled } from '@mui/system';
import debounce from 'lodash.debounce';

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

export default function Container() {
    const [model, setModel] = useState(Model.fromJson(getFlexConfig()));
    const [sensor, setSensor] = useState(null);
    const [filters, setFilters] = useState([]);
    useEffect(() => {
        const storedLayout = localStorage.getItem(layoutStorage)
        if (storedLayout !== null) {
            setModel(Model.fromJson(JSON.parse(storedLayout)))
        }
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
        setFilters(filters)
    }

    return (
        <Wrapper>
            <Header onAddComponent={handleAddComponent} onFilterChange={handleFilterChange} filters={filters} />
            <FlexLayoutWrapper>
                <SensorContext.Provider value={{ sensor, setSensor, filters }}>
                    <FlexLayout model={model} setRef={setRef} />
                </SensorContext.Provider>
            </FlexLayoutWrapper>
        </Wrapper>)
}
