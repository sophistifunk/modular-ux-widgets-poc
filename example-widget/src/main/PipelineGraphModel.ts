
export enum Result {
    success = 'success',
    failure = 'failure',
    running = 'running',
    queued = 'queued',
    paused = 'paused',
    unstable = 'unstable',
    aborted = 'aborted',
    not_built = 'not_built', // May be pending, or job was ended before this point
    skipped = 'skipped',     // excluded via pipeline "when" clause
    unknown = 'unknown',     // bad data or client code needs updating for new values
};

// function isResult(maybeResult: string): maybeResult is Result {
//     return Result.hasOwnProperty(maybeResult) && Result[maybeResult as any] === maybeResult
// }

// // Clean up result value, or return "invalid" value
// export function decodeResultValue(resultMaybe: any): Result {
//     // FIXME: If you're copying this code into prod somewhere, add Unit tests to make sure this works for all values of Result
//     if (resultMaybe) {
//         const lcResultMaybe = String(resultMaybe).toLowerCase();
//         if (isResult(lcResultMaybe)) {
//             return lcResultMaybe;
//         }
//     }
//     return Result.unknown;
// }

export function decodeResultValue(resultMaybe: any): Result {
    const lcase = String(resultMaybe).toLowerCase();
    for (const enumKey of Object.keys(Result)) {
        const enumValue = Result[enumKey as any];
        if (enumKey.toLowerCase() === lcase || enumValue.toLowerCase() === lcase) {
            return enumValue as Result;
        }
    }

    return Result.unknown;
}


export const MATRIOSKA_PATHS = false;

// Dimensions used for layout, px
export const defaultLayout = {
    nodeSpacingH: 120,
    parallelSpacingH: 120,
    nodeSpacingV: 70,
    nodeRadius: 12,
    terminalRadius: 7,
    curveRadius: 12,
    connectorStrokeWidth: 3.5,
    labelOffsetV: 20,
    smallLabelOffsetV: 15,
    ypStart: 55,
};

// Typedefs

// TODO: Change "export type Foo = {}" to "export interface Foo {}"

type StageType = string; // TODO: Lookup actual values, make an enum

/**
 * StageInfo is the input, in the form of an Array<StageInfo> of the top-level stages of a pipeline
 */
export type StageInfo = {
    name: string,
    title: string,
    state: Result,
    completePercent: number,
    id: number,
    type: StageType,
    children: Array<StageInfo>, // Used by the top-most stages with parallel branches
    nextSibling?: StageInfo, // Used within a parallel branch to denote sequential stages
};

// TODO: Refactor these into a common base, and some discerning "typeof" funcs
export type StageNodeInfo = {
    // -- Shared with PlaceholderNodeInfo
    key: string,
    x: number,
    y: number,
    id: number,
    name: string,

    // -- Marker
    isPlaceholder: false,

    // -- Unique
    stage: StageInfo,
};

export type PlaceholderNodeInfo = {
    // -- Shared with StageNodeInfo
    key: string,
    x: number,
    y: number,
    id: number,
    name: string,

    // -- Marker
    isPlaceholder: true,

    // -- Unique
    type: 'start' | 'end',
};

// TODO: Attempt to extract a "common" node type with intersection operator to remove duplication

export type NodeInfo = StageNodeInfo | PlaceholderNodeInfo;

export type NodeColumn = {
    topStage?: StageInfo, // Top-most stage for this column, which will have no rendered nodes if it's parallel
    rows: Array<Array<NodeInfo>>,
    x: number, // Center X position, for positioning top bigLabel
};

export type CompositeConnection = {
    sourceNodes: Array<NodeInfo>,
    destinationNodes: Array<NodeInfo>,
    skippedNodes: Array<NodeInfo>,
};

export type LabelInfo = {
    x: number,
    y: number,
    text: string,
    key: string,
    stage?: StageInfo,
    node: NodeInfo,
};

export type LayoutInfo = typeof defaultLayout;
