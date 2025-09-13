@echo off

echo Changing directory client...
cd "AngelAPI"

echo Building Docker image client...
docker build -t AngelAPIClient .

echo Docker login...
docker login

echo Tagging Docker image client...
docker tag makeup-client:latest novakvova/makeup-client:latest

echo Pushing Docker image client to repository...
docker push novakvova/makeup-client:latest

echo Done ---client---!

echo Changing directory api...
cd ".."
cd "WebApi"

echo Building Docker image api...
docker build -t makeup-asp-api . 

echo Tagging Docker image api...
docker tag makeup-asp-api:latest novakvova/makeup-asp-api:latest

echo Pushing Docker image api to repository...
docker push novakvova/makeup-asp-api:latest

echo Done ---api---!
pause
