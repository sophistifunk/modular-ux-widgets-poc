import * as React from 'react';
import { UXWidget, WidgetDescription } from './WidgetComponent';
import { ResourceBundle, BasicResourceBundle } from './ResourceBundle';

/////////////////////////////////////////////////////////////////////////////////////////
// 
//  Not meant to be used for anything, just need something to feel out types against
//
/////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////
//
// Models
//
////////////////////////////////////////////

interface PipelineDetails {
    name: string;
    status: string;
    runIds: string[];
}

interface Run {
    id: number;
    name: string;
    status: string;
    duration: number;
}

////////////////////////////////////////////
//
// Services
//
////////////////////////////////////////////

interface FooService {
    getPipeline(name: string): Promise<PipelineDetails>;
    getRun(id: number): Promise<Run>;
}

////////////////////////////////////////////
//
// Actual Widget
//
////////////////////////////////////////////

export interface Props {
    res: ResourceBundle;
    onUserSelect?: (source: GuineaPig) => void;
    onEventMandatory: (source: GuineaPig) => void;
    pipeline: PipelineDetails;
    fooService: FooService;
}

export class GuineaPig extends React.Component<Props> implements UXWidget<Props> {
    render() {
        return <p> Hello, world </p>;
    }
}

export const widgetDescription = new WidgetDescription<Props, GuineaPig>(GuineaPig)
    .events('onUserSelect', 'onEventMandatory')
    .models('pipeline')
    .services('fooService');

////////////////////////////////////////////
//
// Use case
//
////////////////////////////////////////////

// Again, this is just here to test out types + trigger compiler errors etc

class UseCase extends React.Component {

    handleEvent = (target: GuineaPig) => { }

    render() {

        let res = new BasicResourceBundle('XX', {});
        let pipeline:any = {};
        let fooService:any = {};

        return <GuineaPig onEventMandatory={this.handleEvent} res={res} pipeline={pipeline} fooService={fooService}/>;
    }
}