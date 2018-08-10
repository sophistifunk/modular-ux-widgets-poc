# Modular UX Widgets (WIP)
## [#UX-754](https://cloudbees.atlassian.net/browse/UX-754) - Developing a POC and Design Document

## Building the PoC

### Requirements

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