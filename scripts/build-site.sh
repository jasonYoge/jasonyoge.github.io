#!/usr/bin/env bash
set -euo pipefail

mkdir -p dist
cp booksmarky/index.html booksmarky/terms.html dist/
cp -r assets dist/

echo "Built site:"
find dist -type f | sort
