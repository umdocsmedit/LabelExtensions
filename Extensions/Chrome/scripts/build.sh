#! /bin/bash

# Relative directory
cd "$(dirname "$0")"

cd ../

# Transpile
tsc

# Browserify
browserify ./dist/js/PrintLabel.js ./dist/js/popup.js -o ./dist/js/popup.js
#browserify ./dist/js/PrintLabel.js -o ./dist/js/PrintLabel.js
