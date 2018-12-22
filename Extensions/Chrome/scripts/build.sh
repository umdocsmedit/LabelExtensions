#! /bin/bash

# Relative directory
cd "$(dirname "$0")"

cd ../

# Transpile
tsc

# Browserify
browserify ./dist/js/PrintLabel.js ./dist/js/inject.js -o ./dist/js/inject.js
browserify ./dist/js/PrintLabel.js -o ./dist/js/PrintLabel.js
