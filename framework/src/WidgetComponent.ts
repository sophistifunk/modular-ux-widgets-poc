
export interface WidgetProps {
    // IMPORTANT: Everything here needs to be in CommonWidgetPropNames!
    assetURLBase?: string;
    resourceBundle?: any;
}

export const CommonWidgetPropNames:Array<keyof WidgetProps> = [
    // IMPORTANT: Everything in WidgetProps needs to be in here!
    // TODO: Cook up some unit tests or something to ensure this!
    'assetURLBase',
    'resourceBundle'
];

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

function ensureArray(input:any):Array<any> {
    if (Array.isArray(input)) {
        return input;
    }
    return [];
}

/**
 * Validate and coerce a JS object into a WidgetDescription, or throw
 */
export function parseWidgetDescription(input: any): WidgetDescription {
    // TODO: Change out that input: any for input: unknown once we go TS3

    if (typeof input.widgetClass !== 'string') {
        throw new Error('parseWidgetDescription: input missing widgetClass prop');
    }

    const widgetClass = input.widgetClass;
    const widgetEvents = ensureArray(input.widgetEvents);
    const hostEvents = ensureArray(input.hostEvents);
    const models = ensureArray(input.models);
    const services = ensureArray(input.services);

    return {
        widgetClass,
        widgetEvents,
        hostEvents,
        models,
        services
    };
}
