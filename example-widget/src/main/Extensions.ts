import { RenderContext } from '@imeredith/es-extensions-api';

export namespace Extensions {
    export namespace Welcome {
        export interface Context extends RenderContext {
            name: string
        }

        export const extensionPointId = "example.widget.greeter";
    }
}