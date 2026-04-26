@echo off
echo Starting Karlsruhe WebGIS...
echo.

docker-compose up -d

echo Waiting for database...
timeout /t 10 >nul

echo Importing GIS data...
call scripts\init-db.bat

echo.
echo ---------------------------------------
echo Map:       http://localhost:8000
echo GeoServer: http://localhost:8081/geoserver
echo ---------------------------------------
echo.

pause