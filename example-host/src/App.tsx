import * as React from 'react';
import './App.css';
import '@expantra/pipeline-widget-proto/styles/css/main.css';

import { PipelineGraph, TrafficState } from '@expantra/pipeline-widget-proto';

const resEnglish = require('@expantra/pipeline-widget-proto/i18n/PipelineGraph.en.json');
const resGerman = require('@expantra/pipeline-widget-proto/i18n/PipelineGraph.de.json');
const resJapanese = require('@expantra/pipeline-widget-proto/i18n/PipelineGraph.jp.json');

import "example-widget-plugin";

import * as TestData from './TestData';
import { EventSource } from './HostEvents';

const langs = {
    'English': resEnglish,
    'German': resGerman,
    'Japanese': resJapanese
}

class App extends React.Component {

    trafficStateChanged = new EventSource<TrafficState>('trafficStateChanged');

    trafficOff = () => this.trafficStateChanged.dispatch(TrafficState.off);
    trafficRed = () => this.trafficStateChanged.dispatch(TrafficState.red);
    trafficYellow = () => this.trafficStateChanged.dispatch(TrafficState.yellow);
    trafficGreen = () => this.trafficStateChanged.dispatch(TrafficState.green);

    state = {
        lang: resEnglish
    }

    changeLang = (event: any) => {

        const langLabel = event.target.value;
        const newLang = langs[langLabel];

        console.log('changeLang', langLabel, JSON.stringify(newLang));

        if (newLang) {
            this.setState({ lang: newLang });
        }
    }

    public render() {

        console.log('app rendering, lang = ', this.state.lang)

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
                    <span style={{padding:'0 0.5em 0 1em'}}>Locale:</span>
                    <select onChange={this.changeLang}>{Object.keys(langs).map(lang => (
                        <option key={lang}>{lang}</option>
                    ))}
                    </select>
                </div>

                <div id="graphs">
                    <PipelineGraph assetURLBase='/widget-assets/' trafficStateChanged={this.trafficStateChanged} stages={TestData.multiStageSpacing()} resourceBundle={this.state.lang} />
                    <PipelineGraph assetURLBase='/widget-assets/' trafficStateChanged={this.trafficStateChanged} stages={TestData.flatPipeline()} resourceBundle={this.state.lang} />
                </div>
            </div>
        );
    }
}

export default App;
