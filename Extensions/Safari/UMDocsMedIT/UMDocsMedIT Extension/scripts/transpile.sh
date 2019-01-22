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

# Transpile
tsc

# Browserify if needed ...
browserify ../JS/dist/PatientRecord.js ../JS/dist/script.js -o ../JS/dist/script.js

popd

popd
