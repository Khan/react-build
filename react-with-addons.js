// HACK(emily): Officially, the `react-with-addons` require went away with
// React 15, this require is just a hack so we can continue bundling them all
// together. In the future we should probably explicitly be requiring the
// addons from the separate npm packages.
window.React = require('react/lib/ReactWithAddons');
window.React.__internalReactMount = require('react/lib/ReactMount');
window.React.__internalReactDOM = require('react-dom');
window.React.__internalAddons = window.React.addons;
delete window.React.addons;
