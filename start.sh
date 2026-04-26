#!/bin/bash
set -e

echo "Starting Karlsruhe WebGIS..."
echo

# Check Docker
if ! docker info >/dev/null 2>&1; then
  echo "ERROR: Docker Desktop is not running."
  echo "Please start Docker Desktop and try again."
  exit 1
fi

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