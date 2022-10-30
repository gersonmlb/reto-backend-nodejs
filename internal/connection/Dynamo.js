const AWS = require('aws-sdk');
const Responses = require('../responses/api.responses');

let options = {};
if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    };
}

if (process.env.JEST_WORKER_ID) {
    options = {
        region: 'local-env',
        endpoint: 'http://localhost:8000',
        sslEnabled: false
    };
}

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async scan(TableName) {
        try {

            const params = {
                TableName
            }

            const data = await documentClient.scan(params).promise();

            if (!data) {
                return Responses._500({ message: `There was an error fetching the data from ${TableName}` });
            }
            return data
        } catch (error) {
            return Responses._500({ message: `Internal Error - Get` });
        }
    },

    async getOne(key, TableName) {
        try {

            const params = {
                TableName,
                Key: {
                    key
                }
            }

            const data = await documentClient.get(params).promise();

            if (!data) {
                return Responses._500({ message: `There was an error fetching the data from ${TableName}` });
            }
            return data
        } catch (error) {
            return Responses._500({ message: `Internal Error - Get One` });
        }
    },

    async write(TableName, dataInsert) {
        try {

            const params = {
                TableName,
                Item: dataInsert
            }

            const data = await documentClient.put(params).promise();

            return data
        } catch (error) {
            console.log(error)
            return Responses._500({ message: `Internal Error - Insert` });
        }
    },
};

module.exports = Dynamo


