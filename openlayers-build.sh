#!/bin/bash

# Copy build configuration to openlayers build folder
cp openlayers-app.cfg www/lib/openlayers/build/openlayers-app.cfg

# go to openlayers build folder
cd www/lib/openlayers/build

# run the build script
./build.py openlayers-app OpenLayers-app.js

# move the lib
mv OpenLayers-app.js ../../../js/OpenLayers-app.js

# go back
cd ../../../
