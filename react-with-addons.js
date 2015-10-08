window.React = require('react/addons');
window.React.__internalReactMount = require('react/lib/ReactMount');
window.React.__internalReactDOM = require('react-dom');
window.React.__internalAddons = window.React.addons;

if ("production" !== process.env.NODE_ENV) {
    var warning =
            require('./node_modules/react/node_modules/fbjs/lib/warning');

    window.React.addons = {};

    Object.keys(window.React.__internalAddons).forEach(function(addonName) {
        Object.defineProperty(
            window.React.addons,
            addonName,
            {
                get: function() {
                    warning(
                        false,
                        "Using React.addons.%s is deprecated. " +
                            "Use require('react-addons-{addon}') instead.",
                        addonName);
                    return window.React.__internalAddons[addonName];
                }
            }
        );
    });
}
