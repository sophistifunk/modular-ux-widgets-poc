# Modular UX Widgets Proof of Concept (WIP)

This repository contains the proof-of-concept code for building and embedding Modular UX Widgets: Compound React components that are more task-specific and self-contained than the simpler, building-block kind of components found in a common UI Component library package (such as Button, Table, DropDown, etc).

Example use cases:

 * Pipeline run graph
 * Pipeline creation wizard
 * Pipeline activity table 

## Building the PoC

### Requirements

 * Reasonably modern node.js
 * Global install of gulp-cli

### Step 1 - Framework

````
cd framework
npm i
gulp dist
cd ..
````

### Step 2 - Example Widget

````
cd example-widget
npm i
gulp dist
cd ..
````

### Step 3 - Example Extension
````
cd example-widget-plugin
npm i
gulp dist
cd ..
````

### Step 4 - Example Host App
````
cd example-host
npm i
npm run start
````

## Repository contents

| File / Folder | Description |
| ---- | ---- |
| [/design-docs.md](design-docs.md) | Original "design doc" and exploration of the PoC |
| [/framework/](framework/) | Types, Library code, and build-time support for Widget and Host Application authors |
| [/example-widget/](example-widget/) | Widget code for this Proof-of-concept |
| [/example-widget-plugin/](example-widget-plugin/) | Demonstrates building an extension for the example Widget |
| [/example-host/](example-host/) | A sample create-react-app application showing how to embed the example Widget |


