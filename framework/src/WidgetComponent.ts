
export interface WidgetProps {
    // TODO: Add any props that all Widgets will need
    assetURLBase?: string;
    resourceBundle?: any;
}

export interface UXWidget<T extends WidgetProps> {
    props: T;
}

export type Constructor<T> = { new(...args: any[]): T };

export class WidgetDescription<P, W extends UXWidget<P>> {

    widgetClass: Constructor<W>;

    /**
     * Holds the various prop names in categories for retrieval by docgen
     */
    _propCategories = {
        widgetEvents: [] as Array<string>,
        hostEvents: [] as Array<string>,
        models: [] as Array<string>,
        services: [] as Array<string>,
    }

    constructor(widgetClass: Constructor<W>) {
        this.widgetClass = widgetClass;
    }

    /**
     * A list of Widget props that are handlers for Widget Events
     */
    widgetEvents(...propNames: (keyof P)[]): this {
        this._propCategories.widgetEvents.push(...propNames as any);
        return this;
    }

    /**
     * A list of Widget props that are signals for Host Events
     */
    hostEvents(...propNames: (keyof P)[]): this {
        this._propCategories.hostEvents.push(...propNames as any);
        return this;
    }

    /**
     * A list of Widget props that make up the data model
     */
    models(...propNames: (keyof P)[]): this {
        this._propCategories.models.push(...propNames as any);
        return this;
    }

    /**
     * A list of Widget props that are service implementations to be provided by the host
     */
    services(...propNames: (keyof P)[]): this {
        this._propCategories.services.push(...propNames as any);
        return this;
    }
}
