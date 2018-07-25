/*
    These are just a few cases copied from Blue Ocean's storybooks
 */


import { Result, StageInfo } from '@expantra/pipeline-widget-proto';

type StageType = string; // TODO: export from PipelineGraphModel


export function multiStageSpacing() {

    const stages = [
        makeNode('Alpha', [
            makeNode('Homer'),
            makeNode('Marge'),
        ]),
        makeNode('Blue'),
        makeNode('Bravo', [
            makeNode('Single 1'),
            makeSequence(
                makeNode('xxxxxxxxxxxxxxxxxxxxxxxxxx'),
                makeNode('xxxxxxxxxxxxxxxxxxxxxxxxxx'),
                makeNode('xxxxxxxxxxxxxxxxxxxxxxxxxx'),
            ),
            makeSequence(
                makeNode('Multi 1 of 4'),
                makeNode('Multi 2 of 4'),
                makeNode('Multi 3 of 4'),
                makeNode('Multi 4 of 4'),
            ),
        ]),
    ];

    return stages;
}

export function flatPipeline() {

    const stages = [
        makeNode('Success', [], Result.success),
        makeNode('Failure', [], Result.failure),
        makeNode('Running', [], Result.running),
        makeNode('Slow', [], Result.running, 150),
        makeNode('Queued', [], Result.queued),
        makeNode('Unstable', [], Result.unstable),
        makeNode('Aborted', [], Result.aborted),
        makeNode('Not Built', [], Result.not_built),
        makeNode('Bad data', [], 'this is not my office' as any),
    ];

    return stages;
}

let __id = 1;

/// Simple helper for data generation
function makeNode(name: string, children: StageInfo[] = [], state = Result.not_built, completePercent = 0): StageInfo {
    completePercent = completePercent || ((state == Result.running) ? Math.floor(Math.random() * 60 + 20) : 50);
    const id = __id++;
    const type: StageType = 'STAGE';

    // Change type on nested contents
    children.forEach(stage => {
        stage.type = 'PARALLEL'
        let nextSibling = stage.nextSibling;
        while (nextSibling) {
            nextSibling.type = 'PARALLEL'
            nextSibling = nextSibling.nextSibling;
        }
    });

    return { name, children, state, completePercent, id, title: name, type };
}

function makeSequence(...stages: StageInfo[]): StageInfo {
    for (let i = 0; i < stages.length - 1; i++) {
        stages[i].nextSibling = stages[i + 1];
    }

    return stages[0]; // The model only needs the first in a sequence
}

