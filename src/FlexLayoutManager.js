import React from 'react';
import * as FlexLayout from "flexlayout-react";
import 'flexlayout-react/style/light.css';
import Observations from './components/Observations'
import SensorCapabilities from './components/SensorCapabilities'
import Sensors from './components/Sensors'

var json = {
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
                        name: "Sensors",
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
            },
            {
                type: "tabset",
                weight: 50,
                children: [
                    {
                        type: "tab",
                        name: "Sensors2",
                        component: "sensors",
                    }
                ]
            }
        ]
    }
};


export default class FlexLayoutManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = { model: FlexLayout.Model.fromJson(json) };
    }

    factory = (node) => {
        var component = node.getComponent();
        if (component === "sensor-capabilities") {
            return <SensorCapabilities />
        }
        if (component === "observations") {
            return <Observations />;
        }
        if (component === "sensors") {
            return <Sensors />;
        }
    }

    render() {
        return (
            <FlexLayout.Layout model={this.state.model} factory={this.factory} />
        )
    }
}