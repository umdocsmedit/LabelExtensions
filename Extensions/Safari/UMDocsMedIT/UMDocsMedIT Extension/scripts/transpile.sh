#!/bin/sh

#  transpile.sh
#  UMDocsMedIT
#
#  Created by Kevin Davis on 1/19/19.
#  Copyright © 2019 Kevin Davis. All rights reserved.

pushd "$(dirname "$0")"

pushd ../JS

# Download dependencies
cp ../../../../Chrome/src/PatientRecord.ts ../JS/src/
cp ../../../../Chrome/src/PrintLabel.ts ../JS/src/
cp ../../../../Chrome/src/templates.ts ../JS/src/
cp ../../../../Chrome/src/types/dymo.d.ts ../JS/src/types/
cp ../../../../Chrome/dist/js/DYMO.Label_.Framework.2.0.2.js ../JS/dist/

# Transpile
tsc

# Browserify if needed ...
browserify ../JS/dist/PrintLabel.js ../JS/dist/PatientRecord.js ../JS/dist/script.js -o ../JS/dist/script.js

popd

popd
