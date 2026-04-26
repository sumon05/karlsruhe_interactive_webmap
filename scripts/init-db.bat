@echo off
echo Importing GeoPackage into PostGIS...

docker run --rm --network karlsruhe-webmap_default -v "%cd%\data:/data" ghcr.io/osgeo/gdal:latest ogr2ogr -f PostgreSQL PG:"host=postgis dbname=gis user=postgres password=postgres" /data/karlsruhe.gpkg -nlt PROMOTE_TO_MULTI -overwrite

echo Import complete!
pause