# react-build

This repo contains tools for making a custom build of React and ReactART, made using webpack's bundle-splitting so that React can be loaded without ReactART. (The reverse isn't true; ReactART depends on React.)

To re-build, run `make`, then `make install WEBAPP=/path/to/webapp`.
This may assume some global NPM dependencies, like Grunt and gulp.js.
