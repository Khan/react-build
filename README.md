# react-build

This repo contains tools for making a custom build of React and ReactART, made using webpack's bundle-splitting so that React can be loaded without ReactART. (The reverse isn't true; ReactART depends on React.)

To re-build, first install or link react and react-art into this directory. (To install npm react from source, it's necessary to run `grunt build:npm-react` then link/install from build/npm-react/.)

Then run:

    npm install

    WEBAPP_PATH=/path/to/webapp

    NODE_ENV=production node_modules/.bin/webpack
    cp build/react.prod.js "$WEBAPP_PATH"/third_party/javascript-khansrc/react-compiled/
    cp build/react-art.prod.js "$WEBAPP_PATH"/third_party/javascript-khansrc/react-compiled/

For the dev build, replace the `require('art/modes/fast');` line with:

    var mode = "fast"; // Flip this to DOM mode for debugging
    if (mode === "fast") {
      require('art/modes/fast');
    } else {
      require('art/modes/dom');
    }

so that the resulting bundle can be easily changed to use SVG instead of Canvas, then run:

    NODE_ENV=development node_modules/.bin/webpack
    cp build/react.dev.js "$WEBAPP_PATH"/third_party/javascript-khansrc/react-compiled/
    cp build/react-art.dev.js "$WEBAPP_PATH"/third_party/javascript-khansrc/react-compiled/

(ReactART doesn't rely on `__DEV__` conditionals, but webpack assigns different modules different IDs in the two cases, so we need both react-art.dev.js and react-art.prod.js here.)

TODO(alpert): This is ridiculous. Make simpler.
