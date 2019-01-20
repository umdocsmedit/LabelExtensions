#!/bin/sh

#  transpile.sh
#  UMDocsMedIT
#
#  Created by Kevin Davis on 1/19/19.
#  Copyright © 2019 Kevin Davis. All rights reserved.

pushd "$(dirname "$0")"

pushd ../JS

# Transpile
tsc

# Browserify if needed ...

popd

popd
