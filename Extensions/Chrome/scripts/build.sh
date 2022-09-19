#! /bin/bash

# Relative directory
cd "$(dirname "$0")"

cd ../

# Transpile
tsc

# Browserify
browserify ./dist/js/PrintLabel.js ./dist/js/popupModule.js ./dist/js/popup.js -o ./dist/js/popup.js
browserify ./dist/js/PatientRecord.js ./dist/js/gatherData.js ./dist/js/contentScript.js -o ./dist/js/contentScript.js
browserify ./dist/js/init.js ./dist/js/background.js -o ./dist/js/background.js
browserify ./dist/js/sandbox.js -o ./dist/js/sandbox.js

# Create version93
NEWDIR=dist93
cp -r dist ${NEWDIR}
mv ${NEWDIR}/js/background.js ${NEWDIR}/backgound.js
sed -e "s/js\/background.js/background.js/gi" -i "bak" ${NEWDIR}/manifest.json

zip -r UMDOCSMEDITRCP.zip ./dist
zip -r UMDOCSMEDITRCP93.zip ./dist93
