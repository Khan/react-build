// HACK(emily): Officially, the `react-with-addons` require went away with
// React 15, this require is just a hack so we can continue bundling them all
// together. In the future we should probably explicitly be requiring the
// addons from the separate npm packages.
window.React = require('react');
// TODO(michaelpolyak): `react-select` requires upgrading before these can be
// removed.
window.React.PropTypes = require('prop-types');
window.React.createClass = require('create-react-class');

window.React.__internalReactDOM = require('react-dom');
window.React.__internalReactDOMServer = require('react-dom/server');
window.React.__internalReactTestUtils = require('react-dom/test-utils');
window.React.__internalTransitionGroup = require('react-transition-group');
window.React.__internalAddonsUpdate = require('react-addons-update');
window.React.__internalAddonsCreateFragment = require('react-addons-create-fragment');
window.React.__internalAddonsPureRenderMixin = require('react-addons-pure-render-mixin');
window.React.__internalAddonsCSSTransitionGroup = require('react-addons-css-transition-group');
