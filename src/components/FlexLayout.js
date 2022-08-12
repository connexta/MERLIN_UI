import React from 'react';
import { Layout } from "flexlayout-react";
import 'flexlayout-react/style/light.css';
import { getFlexComponents } from './FlexUtil';


export default function FlexLayoutManager(props) {
    const { model, setRef, sensor, setSensor } = props
    const factory = (node) => {
        var componentName = node.getComponent();
        const flexComponents = getFlexComponents()
        const newComponent = flexComponents.find(component => component.id === componentName)
        if (newComponent !== undefined) {
            return <newComponent.component sensor={sensor} setSensor={setSensor} />
        }
    }
    return (
        <Layout model={model} factory={factory} ref={setRef} />
    )

}