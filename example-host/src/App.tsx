import * as React from 'react';
import './App.css';
import 'example-widget/styles/GraphWidget.css';

import logo from './logo.svg';

import {PipelineGraph} from 'example-widget';

import "example-widget-plugin";

import * as TestData from './TestData';


class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Widgets</h1>
                </header>
                <div id="graphs">
                <div className="PipelineGraph-container"><PipelineGraph stages={TestData.multiStageSpacing()}/></div>
                <div className="PipelineGraph-container"><PipelineGraph stages={TestData.flatPipeline()}/></div>
                </div>
                TODO: Move PipelineGraph-container into widget itself
            </div>
        );
    }
}

export default App;
