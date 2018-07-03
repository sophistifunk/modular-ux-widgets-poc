import { ResourceBundle } from "./ResourceBundle";

export namespace UXWidget {

    export interface WidgetProps {
        res: ResourceBundle
    }

    export interface UXWidget<T extends WidgetProps> {
        props: T;
        widgetInit?: () => void;
        widgetDispose?: () => void;
    }

    export type Constructor<T> = { new(...args: any[]): T };

    export class WidgetDescription<P extends WidgetProps, W extends UXWidget<P>> {

        widgetClass: Constructor<W>;

        constructor(widgetClass: Constructor<W>) {
            this.widgetClass = widgetClass;
        }

        events(...propNames: (keyof P)[]): this {
            // TODO: collect this info and use it when generating docs
            return this;
        }

        models(...propNames: (keyof P)[]): this {
            // TODO: collect this info and use it when generating docs
            return this;
        }

        services(...propNames: (keyof P)[]): this {
            // TODO: collect this info and use it when generating docs
            return this;
        }
    }

}