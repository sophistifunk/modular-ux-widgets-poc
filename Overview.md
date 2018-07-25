# What is a Widget?

* A Widget is a React component installed from npm
* The host application provides the data, the widget renders it for the user 
* The host application sends host events to the widget using Host Event Signals
* The widget sends user events to the host application via standard react `onFoo()` handler props
* If the widget needs to connect to API services, these are provided by the Host Application as JavaScript objects

# How do you use a Widget from your Host Application?

## Installation

As a normal npm module:

```sh
> yarn add @cloudbees/pipeline-run-widget
```

## Build Time

The Host Application must do the following during build:

 * Copy any static assets from the widget into the host application
 * Include the widget's stylesheet into the host application's stylesheet
 * Include the widget's resource bundles into the host application's i18n system

## Run Time

The Host Application does the following at runtime:

 * Embed the Widget react component within a page
 * Provide a base URL for static assets as `assetURLBase` property
 * Provide the correct resource bundle for the current locale via the `resourceBundle` property
 * Provide implementations of an required Host Event Signals
 * Provide the data model the widget requires
 * Provide JavaScript implementations (or proxies) for required APIs
 * (Optional) if the Widget provides an `ExtensionPoint`, the Host Application may provide extensions that suit

# What's the Widget Framework?

The Widget Framework provides:

 * Common typedefs used by Widget authors and Host Applications
 * Default implementations of Host Event Signals that can be used by Host Applications
 * Build-time tooling for Widget authors to help them create documentation and generate the expected artefact structure
