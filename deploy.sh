#!/bin/sh
yarn build
git subtree push --prefix build origin gh-pages
# git push origin --delete gh-pages