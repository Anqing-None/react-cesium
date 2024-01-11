#!/bin/bash

# Specify the source and destination directories
SOURCE_DIR="node_modules/cesium/Build/Cesium"
DESTINATION_DIR="public/static/Cesium"

# Check if the destination directory exists
if [ ! -d "$DESTINATION_DIR" ]; then
  # If it doesn't exist, create it
  mkdir -p "$DESTINATION_DIR"
  # Copy the specified files/directories
  cp -r "$SOURCE_DIR/Workers" "$DESTINATION_DIR/"
  cp -r "$SOURCE_DIR/ThirdParty" "$DESTINATION_DIR/"
  cp -r "$SOURCE_DIR/Assets" "$DESTINATION_DIR/"
  cp -r "$SOURCE_DIR/Widgets" "$DESTINATION_DIR/"

  echo "Files copied successfully! \n window.CESIUM_BASE_URL = "/static/Cesium/";"
else
  # If it exists, print a message (you can modify this part as needed)
  echo "Destination directory already exists. Skipping creation. \n window.CESIUM_BASE_URL = "/static/Cesium/";"
fi


