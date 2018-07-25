import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ExtensionStore } from '@imeredith/es-extensions-api';
import { Extensions } from '@expantra/pipeline-widget-proto';

export namespace Welcome {
    export interface WelcomeProps {
        name: string
    } 
}
export const Welcome: React.SFC<Welcome.WelcomeProps> = (props) => {
    return <h1>Hello, {props.name}</h1>;
}

ExtensionStore.getInstance().register<Extensions.Welcome.Context>(Extensions.Welcome.extensionPointId, (props) => {
    ReactDOM.render(<Welcome name={props.name} />, props.container)
})