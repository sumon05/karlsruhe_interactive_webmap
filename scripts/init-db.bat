@echo off
echo Checking GIS tables...

docker exec postgis psql -U postgres -d gis -t -c "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name='roads');" > check.txt

findstr /C:"t" check.txt >nul
if %errorlevel%==0 (
    echo GIS data already exists. Skipping import.
    del check.txt
    exit /b
)

del check.txt

echo Importing GeoPackage into PostGIS...

docker run --rm --network karlsruhe-webmap_default -v "%cd%\data:/data" ghcr.io/osgeo/gdal:latest ogr2ogr -overwrite -f PostgreSQL "PG:host=postgis dbname=gis user=postgres password=postgres" /data/karlsruhe.gpkg

echo Import complete!