#!/bin/bash

export GIT_DIR=$CLIENT_REPO

export GIT_WORK_TREE=$CLIENT_WORK_TREE

git pull origin master

yarn --cwd $GIT_WORK_TREE build

export -n GIT_DIR

export -n GIT_WORK_TREE


