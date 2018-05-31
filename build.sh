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

header "Setting up production build"
npm install

header "Building for production"
NODE_ENV=production node_modules/.bin/webpack

header "Building for development"
NODE_ENV=development node_modules/.bin/webpack

header "Done! Consider running 'make install'."
