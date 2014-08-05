# react-build

This repo contains tools for making a custom build of React and ReactART, made using webpack's bundle-splitting so that React can be loaded without ReactART. (The reverse isn't true; ReactART depends on React.)

To re-build, first install or link react and react-art into this directory. (To install npm react from source, it's necessary to run `grunt build:npm-react` then link/install from build/npm-react/.)

Then run:

    WEBAPP_PATH=/path/to/webapp
    npm install webpack

    NODE_ENV=production webpack --optimize-occurence-order
    ( cat build/commons.js; echo ';'; cat build/react-with-addons.js ) >"$WEBAPP_PATH"/third_party/javascript-khansrc/react-compiled/react.prod.js
    cp build/react-art.js "$WEBAPP_PATH"/third_party/javascript-khansrc/react-compiled/react-art.prod.js

For the dev build, replace the `require('art/modes/fast');` line with:

    var mode = "fast"; // Flip this to DOM mode for debugging
    if (mode === "fast") {
      require('art/modes/fast');
    } else {
      require('art/modes/dom');
    }

so that the resulting bundle can be easily changed to use SVG instead of Canvas, then run:

    NODE_ENV=development webpack --optimize-occurence-order
    ( cat build/commons.js; echo ';'; cat build/react-with-addons.js ) >"$WEBAPP_PATH"/third_party/javascript-khansrc/react-compiled/react.dev.js
    cp build/react-art.js "$WEBAPP_PATH"/third_party/javascript-khansrc/react-compiled/react-art.dev.js

(ReactART doesn't rely on `__DEV__` conditionals, but webpack assigns different modules different IDs in the two cases, so we need both react-art.dev.js and react-art.prod.js here.)

TODO(alpert): This is ridiculous. Make simpler.
