#!/bin/bash

if [[ ! $RUN_FROM_MAKE ]]; then
    echo >&2 "Don't run this script directly; use 'make' instead."
    exit 1
fi

set -o verbose
set -o errexit

safe_tput()
{
    if [[ $TERM ]]; then
        2>/dev/null tput "$@"
    fi
}
header()
{
    echo
    safe_tput bold
    printf '=== %s ===' "$*"
    safe_tput sgr0
    echo
}

REACT_VERSION=15.3.2  # React NPM version
REACT_ART_SHA=96c8d5d2410  # (v0.15.1) Git SHA/tag for facebook/react-art

if [[ -e "react-art" ]]; then
    echo >&2 "Old react-art already exists. Run 'make clean' and try again."
    exit 1
fi

header "Cloning repository"
git clone git@github.com:facebook/react-art

header "Setting up production build"
npm install "react@${REACT_VERSION}"
npm install "react-dom@${REACT_VERSION}"

cd react-art
git reset --hard "$REACT_ART_SHA"
npm install
cd ..

npm link ./react-art
# Delete react-art's dependency on react to prevent double-bundling.
rm -rf ./react-art/node_modules/react

header "Building for production"
npm install
NODE_ENV=production node_modules/.bin/webpack

header "Setting up development build"
cd react-art
git apply ../react-art.patch
cd ..

header "Building for development"
NODE_ENV=development node_modules/.bin/webpack

header "Done! Consider running 'make install'."
