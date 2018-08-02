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

    typeNames: Array<string> = [];
    shapes: { [k: string]: number } = {};
    keys: { [k: string]: number } = {};
    ids: { [k: string]: number } = {};
    kinds: Array<string> = [];

    total = 0;

    readJSON(obj: any) {
        this.explore(obj);
        this.typeNames.sort();
    }

    explore(obj: any) {

        this.total++;

        // Build names index
        if (obj.name) {
            this.typeNames.push(obj.name);
        } else {
            console.log('Object with no name, but', Object.keys(obj));
        }

        if (obj.id) {
            this.ids[obj.id] = obj.id;
        }

        // Kinds
        if (obj.kind) {
            let kind = `${obj.kind} : ${obj.kindString || 'unknown'}`;
            if (this.kinds.indexOf(kind) === -1) {
                this.kinds.push(kind);
            }
        }

        // Build types index
        let keys = Object.keys(obj);
        keys.sort();
        let shape = keys.join(', ');

        let count = this.shapes[shape] || 0;
        count++;
        this.shapes[shape] = count;

        for (const key of keys) {
            count = this.keys[key] || 0;
            count++;
            this.keys[key] = count;
        }


        // Recurse

        if (obj.children && Array.isArray(obj.children)) {
            for (const child of obj.children) {
                this.explore(child);
            }
        }
    }

    debug(): string {
        let result = '';

        result += 'Names:\n';
        for (const name of this.typeNames) {
            result += `  * ${name}\n`;
        }
        result += '\n';

        result += 'Shapes:\n';
        let shapeLines = [];
        for (const shape in this.shapes) {
            let count = ('000000' + this.shapes[shape]).substr(-3);
            shapeLines.push(`  * ${count} ${shape}\n`);
        }
        shapeLines.sort();
        result += shapeLines.join('');
        result += '\n';

        result += 'Keys:\n';
        let keyLines = [];
        for (const key in this.keys) {
            let count = ('000000' + this.keys[key]).substr(-3);
            keyLines.push(`  * ${count} ${key}\n`);
        }
        keyLines.sort();
        result += keyLines.join('');
        result += '\n';

        result += 'Kinds:\n';
        for (const kind of this.kinds) {
            result += `  * ${kind}\n`;
        }
        result += '\n';


        let ids = Object.keys(this.ids).sort();
        result += `${ids.length} unique ids.\n`;



        result += `${this.total} total defs.\n`;

        return result;
    }
}