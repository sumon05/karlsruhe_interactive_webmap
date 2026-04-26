# Karlsruhe WebGIS

Interactive web map of Karlsruhe built with:

- PostGIS
- GeoServer
- Leaflet
- Docker

## Features

- Roads layer
- Buildings layer
- Water layer
- Layer toggle
- Feature popup
- Styled layers
- One-click startup

## Clone the Project

```bash
git clone https://github.com/sumon05/karlsruhe_interactive_webmap.git
cd karlsruhe_interactive_webmap
```

## Prerequisites

Install Docker Desktop:

- Windows / Mac: Docker Desktop
- Linux: Docker Engine + Docker Compose

## Run

### Windows

```bash
.\start.bat
```

### Mac / Linux

```bash
chmod +x start.sh
chmod +x scripts/init-db.sh
chmod -R 777 docker/geoserver/data_dir
./start.sh
```

## Access

Map:
http://localhost:8000

GeoServer:
http://localhost:8081/geoserver
