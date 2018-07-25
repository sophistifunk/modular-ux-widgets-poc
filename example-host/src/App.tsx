import * as React from 'react';
import './App.css';
import '@expantra/pipeline-widget-proto/styles/GraphWidget.css';

import {PipelineGraph, TrafficState} from '@expantra/pipeline-widget-proto';

import "example-widget-plugin";

import * as TestData from './TestData';
import { EventSource } from './HostEvents';


class App extends React.Component {

    trafficStateChanged = new EventSource<TrafficState>('trafficStateChanged');

    trafficOff = () => this.trafficStateChanged.dispatch(TrafficState.off);
    trafficRed = () => this.trafficStateChanged.dispatch(TrafficState.red);
    trafficYellow = () => this.trafficStateChanged.dispatch(TrafficState.yellow);
    trafficGreen = () => this.trafficStateChanged.dispatch(TrafficState.green);

    
    public render(){
 
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to Widgets</h1>
                </header>

                <div id="traffic-controls">
                    <span>Traffic state:</span>
                    <button onClick={this.trafficOff}>Off</button>
                    <button onClick={this.trafficRed}>Red</button>
                    <button onClick={this.trafficYellow}>Yellow</button>
                    <button onClick={this.trafficGreen}>Green</button>
                </div>

                <div id="graphs">
                <PipelineGraph assetURLBase='/widget-assets/' trafficStateChanged={this.trafficStateChanged} stages={TestData.multiStageSpacing()}/>
                {/* <PipelineGraph assetURLBase='/widget-assets/' trafficStateChanged={this.trafficStateChanged} stages={TestData.flatPipeline()}/> */}
                </div>
            </div>
        );
    }
}

export default App;
