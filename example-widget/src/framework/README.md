This folder is for code that should be moved into the widget framework. It's here for now just to make building easier.

* [HostEvents](HostEvents.ts) - A simple typed Signal implementation to use for Host Events so widgets can subscribe
* [WidgetComponent](WidgetComponent.ts) - Types and metadata utils for describing your widgets
* [distPackage](distPackage.js) - Utility code that copies the widget's `package.json` to `/dist` so it can be linked to / published