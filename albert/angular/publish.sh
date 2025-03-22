#!/bin/bash
# SCRIPT=$(readlink -f "$0")
# SCRIPT_PATH=$(dirname "$SCRIPT")


if [ -d "dist" ]; then
    for d in ./dist/*/
    do
        cd $d
        npm publish *.tgz
        cd ../../
    done
fi
