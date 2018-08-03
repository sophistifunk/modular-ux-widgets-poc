
export interface WidgetProps {
    // TODO: Add any props that all Widgets will need
    assetURLBase?: string;
    resourceBundle?: any;
}

export interface UXWidget<T extends WidgetProps> {
    props: T;
}

export interface WidgetDescription {
    widgetClass: string;
    widgetEvents: Array<string>;
    hostEvents: Array<string>;
    models: Array<string>;
    services: Array<string>;
}


