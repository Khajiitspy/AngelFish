#!/bin/bash
set -e  # зупиняє скрипт при помилці

cd ../Angelfish
docker build -t angelfish-client .
docker login
docker tag angelfish-client:latest novakvova/angelfish-client:latest
docker push novakvova/angelfish-client:latest
echo "Done ---client---!"

cd ../AngelAPI
docker build -t angelfish-api .
docker tag angelfish-api:latest novakvova/angelfish-api:latest
docker push novakvova/angelfish-api:latest
echo "Done ---api---!"

read -p "Press any key to exit..."
