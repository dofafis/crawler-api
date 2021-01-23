# Crawler API

Crawler API is a rest api for crawling rooms informations from https://myreservations.omnibees.com given a checkin and checkout date in the format dd/mm/yyyy.

## Docker
You can run the application using docker if you want
```bash
docker build . -t crawler-api
docker run -p3000:3000 -d crawler-api
```
## Installation

```bash
npm install
```

## Run

```bash
npm run swagger
npm start
```
Access: localhost:3000/api-docs for swagger documentation
## Run with file watching
```bash
npm run watch
```
## Tests
```bash
npm test
```
or
```bash
docker build -f Dockerfile.test . -t crawler-api-tests
```
## Swagger API Documentation
You can find swagger api documentation in localhost:3000/api-docs

##### Keywords: nodejs, express, typescript, typescript-rest, swagger-ui-express, jest, puppeteer 
