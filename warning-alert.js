/**
 * Based on react/src/vendor/core/warning.js, from Facebook under Apache 2.
 */

var warning = function() {};

// These warnings will only be logged to the console and will not cause an
// alert() to be triggered. Be cautious when adding to this list, as warnings
// almost always indicate future deprecations, so it's important to take
// advantage of the warnings and avoid adding new deprecated code, especially
// if the offending code can't easily be grepped for.
var QUIET_WARNINGS = [
];

// These warnings won't even be logged to the console, so you should take extra
// care when adding to this list that these warnings aren't and won't be
// problematic if developers don't clean them up.
var REALLY_QUIET_WARNINGS = [
  "require('react/addons') is deprecated. Access using require('react-addons-{addon}') instead."
];

if ("production" !== process.env.NODE_ENV) {
  var lastAlertTime = 0;
  warning = function(condition, format) {
    var args = Array.prototype.slice.call(arguments, 2);
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (!condition) {
      if (REALLY_QUIET_WARNINGS.indexOf(format) !== -1) {
        return;
      }

      var argIndex = 0;
      var message = format.replace(/%s/g, function() {
        return args[argIndex++];
      });
      console.error('Warning: ' + message);

      if (QUIET_WARNINGS.indexOf(format) !== -1) {
        return;
      }

      // Browsers tend to not like web pages that alert more than once per
      // second or so, so we'll only show one every two seconds to be safe...
      // hopefully people will notice the second alert if they fix the first
      // one and reload.
      if (lastAlertTime + 2000 < Date.now()) {
        typeof alert !== "undefined" && alert('Dev-only warning: ' + message);
        lastAlertTime = Date.now();
      }
    }
  };
}

module.exports = warning;
