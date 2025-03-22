#!/usr/bin/env bash

TAG=$1
PREFIX=$2
NAME=$3

if [[ -z "$TAG" ]]; then
    TAG=$(bash -c "node -e \"console.log(require('./package.json').version)\"")
fi

if [[ -z "$PREFIX" ]]; then
  PREFIX=$(bash -c "node -e \"console.log(require('./package.json').author)\"")
fi
if [[ -z "$NAME" ]]; then
  NAME=$(bash -c "node -e \"console.log(require('./package.json').name.split('/').pop())\"")
fi

echo "$TAG"
echo "$PREFIX"
echo "$NAME"

docker build -t "$PREFIX/$NAME:$TAG" docs/docker/.
