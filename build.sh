#!/bin/bash

# enable error reporting to the console, just in case
set -e

# only proceed script when started not by pull request (PR)
if [ $TRAVIS_PULL_REQUEST == "true" ]; then
    echo "this is PR, exiting"
    exit 0
fi

# ignore tags
if [ ! -z $TRAVIS_TAG ]; then
    echo "this is a tag, exiting"
    exit 0
fi

# push to live repo if master branch
if [ $TRAVIS_BRANCH == "master" ]; then
    targetBranch="master"
    targetRepo="https://${GH_TOKEN}@github.com/RAMP-PCAR/RAMP-PCAR.github.io"
    commitMessage="chore(release): RAMP Docs live Travis build #$TRAVIS_BUILD_NUMBER"
elif [ $TRAVIS_BRANCH == "develop" ]; then
    targetBranch="gh-pages"
    targetRepo="https://${GH_TOKEN}@github.com/RAMP-PCAR/ramp-pcar-docs"
    commitMessage="chore(update): RAMP Docs edge Travis build #$TRAVIS_BUILD_NUMBER"

    ruby -v

    # update BASE_PATH and ASSET_PATH
    ruby -pi.bak -e "gsub(/BASE_PATH : false/, 'BASE_PATH : \"/ramp-pcar-docs\"')" _config.yml
    ruby -pi.bak -e "gsub(/ASSET_PATH : false/, 'ASSET_PATH : \"/ramp-pcar-docs/assets/themes/gc\"')" _config.yml

    cat _config.yml
else
    echo "I don't know you, exiting"
    exit 0
fi

echo $TRAVIS_BRANCH $targetBranch $commitMessage

# build site with jekyll, by default to `_site' folder_
jekyll build

# make a folder
# mkdir -p ../ramp-docs-dist

#clone `gh-pages` branch of the repository using encrypted GH_TOKEN for authentication
# need to change to our main docs repo
git clone -b $targetBranch $targetRepo ../ramp-docs-dist

cwd=$(pwd)
cd ../ramp-docs-dist
# remove files and suppress output
git rm -r -q . 
git checkout $targetBranch ./demos
git checkout $targetBranch ./api

cd $cwd

# copy generated HTML site to `gh-pages` branch
cp -R _site/* ../ramp-docs-dist

# commit and push generated content to `gh-pages' branch
# since repository was cloned in write mode with token auth - we can push there
cd ../ramp-docs-dist

# create a no jekyll file
echo "" > .nojekyll

git add -A .
git commit -a -m "$commitMessage"

git push --quiet $targetRepo $targetBranch > /dev/null 2>&1 
