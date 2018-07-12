import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ExtensionStore } from '@imeredith/es-extensions-api';
import { Extensions } from 'example-widget';

export namespace Welcome {
    export interface WelcomeProps {
        name: string
    } 
}
export const Welcome: React.SFC<Welcome.WelcomeProps> = (props) => {
    return <h1>Hello, {props.name}</h1>;
}

// See https://github.com/imeredith/es-extensions-api
ExtensionStore.getInstance().register<Extensions.Welcome.Context>(Extensions.Welcome.extensionPointId, (props) => {
    ReactDOM.render(<Welcome name={props.name} />, props.container)
})