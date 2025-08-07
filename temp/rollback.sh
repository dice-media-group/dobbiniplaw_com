#!/bin/bash

# Script to rollback to commit 82c94bb
cd /Users/carltanner/dev/vue/dobbiniplaw_com

echo "Current branch:"
git branch --show-current

echo "Current commit:"
git rev-parse HEAD

echo "Performing hard reset to 82c94bb..."
git reset --hard 82c94bb

echo "New commit after reset:"
git rev-parse HEAD

echo "Git status:"
git status
