#!/bin/sh
# yarn build
# git subtree push --prefix build origin gh-pages
# git push origin --delete gh-pages

# cd build
# git init
# git add .
# git commit -m "deploy"
# git remote add origin git://github.com/beltranrengifo/memory-game.git
# git push --force origin gh-pages
# rm -rf .git
# cd ..


cd build && git init && git add . && git commit -m "deploy" && git remote add origin https://github.com/beltranrengifo/memory-game.git && git push --force origin gh-pages && rm -rf .git && cd ..