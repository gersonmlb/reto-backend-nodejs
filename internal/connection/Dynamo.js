const AWS = require('aws-sdk');
const Responses = require('../responses/api.responses');
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
            let datakey = key.toString()

            const params = {
                TableName,
                Key: {
                    datakey
                }
            }

            const data = await documentClient.get(params).promise();

            if (!data) {
                return Responses._500({ message: `There was an error fetching the data from ${TableName}` });
            }

            return data
        } catch (error) {
            console.log(error)
            return Responses._500({ message: `Internal Error - Get One`, err: error });
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


