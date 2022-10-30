# Serverless Framework Node HTTP API on AWS

This repository is purely for the BACKEND NODEJS TECH CHALLENGE

## Documentation

The documentation is in the following link.

> [Documentation API with Open API/Swagger](http:swager.com).

## Usage

### Deployment

```
$ serverless deploy
```

After deploying, you should see output similar to:

```bash
Deploying aws-node-http-api-project to stage dev (us-east-1)

✔ Service deployed to stack aws-node-http-api-project-dev (152s)

endpoint: GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  hello: aws-node-http-api-project-dev-hello (1.9 kB)
```

### Tests with Jest

> Install pre requisites

> First, make sure you have Java JDK & JRE (Java Runtime Engine) version 6.x or newer is installed on your machine since it is required by the Local DynamoDB.


Install dependencies Dev
```
$ npm install
```

Install dynamo local Dev
```
$ npm install serverless-dynamodb-local --save-dev
```

Install serverless offline local Dev
```
$ npm i -g serverless-offline
```

#### Running the Project Locally

`sls offline start --location .`


Run tests
```
$ npm test
```
