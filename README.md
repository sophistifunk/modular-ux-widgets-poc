# Modular UX Widgets (WIP)
## [#UX-754](https://cloudbees.atlassian.net/browse/UX-754) - Developing a POC and Design Document

## Overview

This document is intended to be a guide to requirements and focal point for discussions to steer creation of a more detailed design document and accompanying proof-of-concept for a system of protocols, interfaces, and tooling to allow CloudBees engineers to create a suite of widgets that can be easily embedded in web applications on a variety of platforms.

### Goals

 * A system and/or set of protocols for creating, maintaining and embedding a library of reusable self-contained visual components across CloudBees and Jenkins applications
 * Widgets are to be added to host applications as standard build dependencies
 * Widgets render data provided in props and/or via service interfaces provided by the host app

### Non-goals

 * Building lower-level "building block" components like Button / List / Table. These belong in the JDL, individual applications or other component libraries
 * Specifying or requiring any particular plugin / extensibility system with which end users can add arbitrary components to any particular application at runtime - this is being tackled separately
 * Specifying or requiring any method whereby the executable code for embedded widgets or shared dependencies is to be retrieved at runtime by a host application's server-side or client-side runtime

---

## Concepts / Glossary

<dl>
    <dt>Widget</dt>
    <dd>A self-contained visual component that can be embedded within a host application and perform autonomously once correctly configured.</dd>
    <dt>Host Application</dt>
    <dd>An application in which the widget is to be embedded.</dd>
    <dt>Dependencies</dt>
    <dd>
        Everything a host application must provide in order for the widget to do its work. Examples include: Service implementations, control properties, host event signals, etc          
    </dd>
    <dt>Control Properties</dt>
    <dd>Properties used to configure the widget that may be unique to a specific use-site, rather than describing the host application environment itself, eg: layout control options</dd>
    <dt>Service Implementations</dt>
    <dd>JavaScript objects implementing the required service interface(s) described by the widget, and passed in as props</dd>
    <dt>Child Elements</dt>
    <dd>For widgets that wrap content that is specific to the embedded use-case, these would be declared at the use-site. Examples include: Platform or Client branding, logos, Icons</dd>
    <dt>Widget Artefact</dt>
    <dd>The collective executable code, documentation, and metadata that describes a widget, delivered as an npm module. Not all of the contents will be required at runtime, and the host application is responsible for only including the required data during compilation / bundling</dd>
    <dt>Host Events</dt>
    <dd>Events coming from Jenkins / Codeship / JX to which widgets may subscribe. Examples include: Pipeline creation, Run starts / stops, Run status updates, Stage / Step notifications</dd>
    <dt>Widget Events</dt>
    <dd>Events generated from the widget in response to user actions that the host application can subscribe to</dd>
</dl>

---

## Widget Artefact Obligations

 * Metadata identifying the "widget protocol version" for future-proofing
 * Typedefs and documentation for properties
 * Typedefs and documentation for services
 * Typedefs and documentation for widget events
 * See [work-in-progress sample documentation](example-widget/README.md)
 * Metadata, signal Typedefs, and documentation identifying the host events that the widget wants to subscribe to
 * Stylesheets, and embedded assets such as images in a standardised layout within the artefact
 * i18n resource bundles in a standardised layout and format within the artefact
 * Widget executable code in the form of ES6 (`import` style) modules and TypeScript `.d.ts` definition files

## Host Application Obligations

 * Bundle the required code needed by the widget at runtime. Use of ES6 modules in the artefacts should allow host application tree-shaking (dead code elimination) via Rollup, Webpack 4, Fusebox, etc
 * Provide the correct i18n resources from the artefact to the widget based on locale
 * Provide service instances that confirm to the required interfaces
 * Host widget stylesheet and static assets
 * Provide a base URL for the widget’s static assets being served by the host application
 * Provide concrete Signal instances for any Host Events the widget needs to subscribe to
 * Provide an error boundary to isolate host application from exceptions thrown in widget code invoked via the React lifecycle

## Host Developer (Embedder) Needs

 * Embedders can add a host app dependency on a specific widget as an npm module, like any other third party library
 * Embedders can provide child elements as React components when required by the widget
 * Embedders can override the styles during the host application build process if neccessary

## Widget Developer Needs

### Standard Tooling

 * We should strive to use existing tooling whenever possible, such as Webpack, Storybook, TSC, Gulp, Rollup, SystemJS, etc
 * Any custom work we need to do in order to aid packaging, documentation generation, or module resolution should be developed as standard plugins for those systems - *give Widget authors tools to cut down on the boilerplate required to generate the expected artefact, without ceding control of their build to the framework*

### Rapid Iteration

 * Widget developers need to be able to iterate quickly within a storybook-like container without requiring a separate codebase in which to embed the widget under development
 * Widget developers need to be able to get widget changes into host applications quickly when they’re being developed in tandem. This means supporting filesystem-local dependencies in the host application during development that mimic the same file structure as if the widget was being fetched via the npm repository

### Framework Documentation

We need great documentation on the required metadata and processes, and tooling available for widget developers:

 * Detailed explanations of the required and/or recommended project structure such as directory layout and using the `/dist` directory as the root of the publishable artefact
 * A guide to the layout of the `/dist` directory's contents and what artefacts are expected to be where
 * A guide to using tooling to create good documentation for the widget itself for use by host application developers
 * Example build scripts and configuration files (for `tsconfig.json` etc)
 * Possibly bootstrap / scaffolding available for Yeoman or similar tool?

### Widget Documentation

 * The tooling should generate a "single source of truth" listing all the documentation and human-relevant metadata as static HTML
 * The tooling should make it as easy as possible for developers to create good documentation. If it’s too much work, it will get neglected when time pressure arises
 * A subset of storybook-like cases might be marked as "documentation" rather than just development-time aides, which would then be included in the static documentation in the artefact. *Keith has been looking into some tooling which may be appropriate for this*

### Styling

 * Widgets need to have their own stylesheet for development and documentation examples, and for when the embedder doesn’t want to make any changes
 * CSS Class names should be namespaced so they won’t cause conflicts with host applications
 * CSS Class namespacing should ideally be transparent and handled by build-time tooling, but until we have a good solution we can proceed with manual prefixes and code review

### Building and Publishing

 * Build process needs to generate / extract all the documentation and typedefs automatically before publishing
 * Widget build processes should treat `/dist` as the root of the published artefact, including creating a cut-down `/dist/package.json` - the "root" `package.json` used for widget development should have publishing blocked so we don't publish the wrong thing
 * When developing locally, the host application should use `/path/to/MyWidget/dist` as the dependency "version" so that widget dev-dependencies don't pollute the host application's module resolution

### Widget Metadata

 * Metadata should be generated by tooling (preferable) or declared in and extracted from source code (annotations?)
 * Metadata should be verified as present (where required) and correct by the widget's build process

---

## Specifications 

### Static Assets

 * Widget must:
   * Place all static assets such as images (not styles) within `/dist/assets/` during build
 * Host Application must:
   * Host (or publish to a known host during build) all the assets within `/node_modules/my-widget-name/assets/` under a common base URL
   * Provive the common base URL to the widget instance via the react property `assetURLBase`

### CSS
 * Widget must:
   * Place a single CSS file containing all required styles in `/dist/styles/css/main.css`
 * Widget can:
   * Place source .scss files in `/dist/styles/scss/` for apps to use with overridden defs if they need to
 * Host Application must:
   * Ensure the widget's CSS is loaded by the time the widget is displayed

### Internationalisation Resources
 * Widget must:
   * Place resource data in json format in `/dist/i18n/{WidgetName}.{locale}.json`
   * Take appropriate action when the `resourceBundle` prop is changed
 * Host must:
   * Read the resource bundle JSON files (probably during build)
   * Based on locale, pass the correct object to the widget's `resourceBundle` prop


---

## TODOs

### Sooner

- [X] Standardise CSS preformatter and identify a fixed location / format within the widget artefact, update the examples
- [X] Create and document a standard for specifying i18n resouce bundles for a widget ~~with strong types~~, and how host applications can easily locate the correct data based on locale
- [X] Identify and document location of static assets within the widget artefact
- [ ] Show a case in the `example-host` demonstrating switchable i18n bundles 
- [X] Show a case in the `example-host` demonstrating static asset hosting
- [ ] Move the framework code out of `/example-widget/src/framework` and into `/framework` as a dependency
- [X] Proof out the host events Signal system with some examples
- [ ] Create an example to show the kind of documentation we want to generate for each widget
- [ ] Create a build-system plugin for generating the widget documentation from metadata and `.d.ts` definitions created by TSC; we want quality output, and we only want to include typedefs and documentation for public / exported properties
- [ ] Expand the "Specifications" section of this document with basic descriptions of the required processes and fixed structure of widget artefacts

### Later 

- [ ] Come up with a good-enough "default" widget-side recommendation/class for actually getting strings from resources, instead of having it completely DIY as it is now. No need for this to actually live in the widget framework though.
- [ ] Figure out a nice way to automatically namespace CSS class names, and have them available to widget source code in a strongly-typed manner
- [ ] Extract the `framework` codebase into its own repo with documentation and get documentation hosted somewhere 
- [ ] Identify (with other teams) the best candidates to flesh out into initial production widgets
- [ ] Change to support specifying individual asset URLs, so that host app bundlers can send in `data:` instead of making them all hardcoded from a variable base url. *Also maintain the ability to do it the current way*.


--- 

## Repository Contents:

This is totally WIP, expect these to be changed, moved, deleted, added, renamed, etc

* [/framework](framework) - (Will eventually be) Types, runtime support, and build infrastructure for Widgets. Currently, widget support and build code is located within `example-widget` repository for the purposes of quicker exploration
* [/client](client) - (Will eventually be) Types and runtime support for react host application to embed widgets. Currently, host support code is located within `example-host` for the purposes of quicker exploration
* [/example-widget](example-widget) - Example Widget for PoC
* [/example-host](example-host) - Example host application to embed widget for PoC
