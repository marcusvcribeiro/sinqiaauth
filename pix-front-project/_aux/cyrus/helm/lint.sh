#!/bin/bash
helm init --client-only
helm lint --values "values-dev.yaml" "bancos-pix-front"
