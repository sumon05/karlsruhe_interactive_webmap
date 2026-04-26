@echo off
echo Starting Karlsruhe WebGIS...
echo.

docker compose up -d
if errorlevel 1 exit /b 1

echo Waiting for database...
timeout /t 10 >nul

echo Importing GIS data...
call scripts\init-db.bat
if errorlevel 1 exit /b 1

echo.
echo ---------------------------------------
echo Map:       http://localhost:8000
echo GeoServer: http://localhost:8081/geoserver
echo ---------------------------------------
echo.

pause