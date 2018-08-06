import { Reflector, ClassMirror, TypeMirror, InterfaceMirror } from "./Reflector";
import { WidgetDescription, CommonWidgetPropNames } from "./WidgetComponent";

/**
 * Interface for widget documentation generation
 */
export interface DocGenerator {
    readonly warnings: Array<string>;

    debug():string;
}

export function basicDocGenerator(reflector: Reflector, widgetDescription: WidgetDescription): DocGenerator {
    return new BasicDocGenerator(reflector, widgetDescription);
}

/**
 * Shoddy implementation for PoC purposes. Spits out some basic documentation as MarkDown
 */
class BasicDocGenerator implements DocGenerator {
    reflector: Reflector;
    widgetDescription: WidgetDescription;
    warnings: Array<string> = [];

    widgetClass?: ClassMirror;
    widgetPropNames: string[] = [];
    
    constructor(reflector: Reflector, widgetDescription: WidgetDescription) {
        this.reflector = reflector;
        this.widgetDescription = widgetDescription;
    }

    process() {
        const {reflector, widgetDescription} = this;

        const warnings:Array<string> = [];
        
        // Get some initial reflection data

        const widgetClassName = widgetDescription.widgetClass;
        const widgetClass = reflector.describeClass(widgetClassName);
        this.widgetClass = widgetClass;

        const props = widgetClass.describeProperty('props');
        
        const propsType = reflector.describeTypeById(props.getTypeId());
        
        if (!propsType.isComplex()) {
            throw new Error(`Widget.props is not a complex (interface) type`);
        }

        const widgetPropNames = (propsType as InterfaceMirror).propertyNames();
        this.widgetPropNames = widgetPropNames;

        // Compare actual widget props to declared props in JSON
        const unIdentifiedPropNames = new Set(widgetPropNames);
        const allDescriptionProps = [
            ...widgetDescription.hostEvents,
            ...widgetDescription.widgetEvents,
            ...widgetDescription.models,
            ...widgetDescription.services
        ];

        const badDescriptionProps:Array<string> = [];
        for (const name of allDescriptionProps) {
            if (unIdentifiedPropNames.has(name)) {
                unIdentifiedPropNames.delete(name);
            } else {
                badDescriptionProps.push(
                    `Property "${name}" listed in WidgetDescription but not found in ${widgetClassName}.props`
                );
            }
        }

        if (badDescriptionProps.length) {
            throw new Error('Cannot process WidgetDescription:\n * ' + badDescriptionProps.join('\n * '));
        }

        for (const name of CommonWidgetPropNames) {
            // Common widget props defined in WidgetComponent do not need to be specified in WidgetDescription
            unIdentifiedPropNames.delete(name);
        }

        for (const name of unIdentifiedPropNames) {
            warnings.push(`Widget property "${name}" not included in WidgetDescription`);
        }

        this.warnings = warnings;
    }

    debug():string {
        this.process();

        let result = '# BasicDocGenerator\n\n';

        result += 'Widget Properties:\n';
        for (const propName of this.widgetPropNames) {
            result += ` * ${propName}\n`;
        }
        result += '\n';

        // if (this.warnings.length === 0) {
        //     result += 'No warnings.';
        // } else {
        //     result += `${this.warnings.length} warnings:\n * `
        //     result += this.warnings.join('\n * ');
        // }
        // result += '\n';

        return result;
    }
}