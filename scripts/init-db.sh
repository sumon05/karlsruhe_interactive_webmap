#!/bin/bash
set -e

echo "Checking GIS tables..."

EXISTS=$(docker compose exec -T postgis psql -U postgres -d gis -t -c "
SELECT EXISTS (
  SELECT FROM information_schema.tables
  WHERE table_name='roads'
);" | xargs)

if [ "$EXISTS" = "t" ]; then
  echo "GIS data already exists. Skipping import."
  exit 0
fi

echo "Importing GeoPackage into PostGIS..."

docker compose exec -T importer ogr2ogr \
  -overwrite \
  -f PostgreSQL \
  "PG:host=postgis dbname=gis user=postgres password=postgres" \
  /data/karlsruhe.gpkg

echo "Import complete!"