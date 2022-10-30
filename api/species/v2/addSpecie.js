const AWS = require('aws-sdk');
const Responses = require('../../../internal/responses/api.responses');
const middy = require("@middy/core");

const lambaAddSpecie = async (event) => {
    try {
        const connection = new AWS.DynamoDB.DocumentClient();

        const {
            id,
            name,
            language,
            homeworld,
            hair_colors,
            skin_colors,
            eye_colors,
            designation,
            classification,
            average_lifespan
        } = event.body;

        const created = new Date();

        const newSpecie = {
            id,
            name,
            language,
            homeworld,
            hair_colors,
            skin_colors,
            eye_colors,
            designation,
            classification,
            average_lifespan,
            created,
            plattform: 'Own'
        }

        await connection.put({
            TableName: 'SpeciesPlanet',
            Item: newSpecie
        }).promise();

        return Responses._200(newSpecie);

    } catch (error) {
        console.log(error)
        return Responses._500({ message: 'Internal Error' });
    }
};

module.exports = {
    add: middy()
        .use(httpErrorHandler())
        .handler(lambaAddSpecie)
};