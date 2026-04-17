#!/bin/sh
cd "/Users/tisealatise/Documents/Github projects/phia-hack-apr26" || exit 1
git status > .git-push-status.txt 2>&1
git log origin/main..HEAD --oneline >> .git-push-status.txt 2>&1 || true
