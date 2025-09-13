#!/bin/bash
set -e  # зупиняє скрипт при помилці

cd ../Angelfish
docker build -t angelfish-client .
docker login
docker tag angelfish-client:latest magicabyss/angelfish-client:latest
docker push magicabyss/angelfish-client:latest
echo "Done ---client---!"

cd ..

cd ../AngelAPI
docker build -t angelfish-api .
docker tag angelfish-api:latest magicabyss/angelfish-api:latest
docker push magicabyss/angelfish-api:latest
echo "Done ---api---!"

read -p "Press any key to exit..."
