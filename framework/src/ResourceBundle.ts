export type MessageParam = string | number;

export interface ResourceBundle {
    get(key: string, ...messageParams: MessageParam[]): string;
    locale: string;
    prefix(keyPrefix: string): this;
}

// Just a basic impl for testing / whatevs
export class BasicResourceBundle implements ResourceBundle {

    locale:string;
    
    private contents:{[key:string]:string};

    constructor(locale: string, contents: {[key:string]:string}) {
        this.locale = locale;
        this.contents = contents;
    }

    get(key: string, ...messageParams: MessageParam[]): string {
        // TODO: impl
        return "TODO"
    }

    prefix(keyPrefix: string): this {
        // TODO: impl
        return this;
    }
}