#!/bin/sh

export NODE_OPTIONS=--openssl-legacy-provider

# if [ ! -x "$(command -v pnpm)" ]; then
#   echo "Please install pnpm via npm"
#   echo "npm install -g pnpm"
#   exit 2
# fi

# touch apikey
npm install
npm start

exit 0
