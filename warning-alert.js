/**
 * Based on react/src/vendor/core/warning.js, from Facebook under Apache 2.
 */

var warning = function() {};

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
      var argIndex = 0;
      var message = format.replace(/%s/g, function() {
        return args[argIndex++];
      });
      console.warn('Warning: ' + message);

      // Browsers tend to not like web pages that alert more than once per
      // second or so, so we'll only show one every two seconds to be safe...
      // hopefully people will notice the second alert if they fix the first
      // one and reload.
      if (lastAlertTime + 2000 < Date.now()) {
        alert('Dev-only warning: ' + message);
        lastAlertTime = Date.now();
      }
    }
  };
}

module.exports = warning;
