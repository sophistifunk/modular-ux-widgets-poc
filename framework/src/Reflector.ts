import * as fs from './fsPromises';

export interface Reflector {

    debug(): string;
};

export function typedocReflector(filePath: string): Promise<Reflector> {
    return fs.readFile(filePath, 'UTF8').then((fileString: string) => {
        const reflector = new TypedocJSONReflector();
        reflector.readJSON(JSON.parse(fileString));
        return reflector as Reflector;
    });
}

class TypedocJSONReflector implements Reflector {

    readJSON(obj: any) {

    }

    debug(): string {
        return 'TypedocJSONReflector';
    }
}