#!/bin/bash

echo "Starting Karlsruhe WebGIS..."
echo

docker compose up -d

echo "Waiting for database..."
sleep 10

echo "Importing GIS data..."
bash scripts/init-db.sh

echo
echo "---------------------------------------"
echo "Map:       http://localhost:8000"
echo "GeoServer: http://localhost:8081/geoserver"
echo "---------------------------------------"
echo