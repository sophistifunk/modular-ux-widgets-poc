
export interface WidgetProps {
    // TODO: Add any props that all Widgets will need
}

export interface UXWidget<T extends WidgetProps> {
    props: T;
}

export type Constructor<T> = { new(...args: any[]): T };

export class WidgetDescription<P, W extends UXWidget<P>> {

    widgetClass: Constructor<W>;

    constructor(widgetClass: Constructor<W>) {
        this.widgetClass = widgetClass;
    }

    /**
     * A list of Widget props that are handlers for Widget Events
     */
    widgetEvents(...propNames: (keyof P)[]): this {
        // TODO: collect this info and use it when generating docs
        return this;
    }

    /**
     * A list of Widget props that are signals for Host Events
     */
    hostEvents(...propNames: (keyof P)[]): this {
        // TODO: collect this info and use it when generating docs
        return this;
    }

    /**
     * A list of Widget props that make up the data model
     */
    models(...propNames: (keyof P)[]): this {
        // TODO: collect this info and use it when generating docs
        return this;
    }

    /**
     * A list of Widget props that are service implementations to be provided by the host
     */
    services(...propNames: (keyof P)[]): this {
        // TODO: collect this info and use it when generating docs
        return this;
    }
}
