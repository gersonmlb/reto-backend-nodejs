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

### Tests offline with Jest

> Install pre requisites

> First, make sure you have Java JDK & JRE (Java Runtime Engine) version 6.x or newer is installed on your machine since it is required by the Local DynamoDB.

CREATE file webpack

```
/ webpack.config.js
const slsw = require('serverless-webpack');

module.exports = {
    target: 'node',
    mode: 'none',
    entry: slsw.lib.entries,
};

```

Add in serverless.yml

```
plugins:
    - serverless-webpack
    - serverless-offline
    - serverless-dynamodb-local

package:
    individually: true

custom:
    tableName: TablaPlanetas
    bucketName: myserverlessretobackend-123123
    dynamodb:
        stages:
            - dev
        start:
            port: 8000
            inMemory: true
            migrate: true
        migration:
            dir: offline

```

Install dependencies Dev

```
$ npm install serverless serverless-dynamodb-local serverless-offline serverless-webpack webpack --save-dev
```

Install dynamo local Dev

```
$ npm install serverless-dynamodb-local --save-dev

OR

$ yarn add serverless-dynamodb-local@0.2.40
$ sls dynamodb install
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
