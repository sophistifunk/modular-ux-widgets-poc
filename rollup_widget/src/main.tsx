import * as React from 'react';
import './main.css';

interface Props {
    name: string
}
export class HelloWidget extends React.Component<Props> {
    render() {
        return <div className="hello-container">
            <h1>Hello {this.props.name}</h1>
        </div>
    }   
}