const AWS = require('aws-sdk');
const Responses = require('../../../internal/responses/api.responses');
const swapi = require('swapi-node');

const lambaGetSpecie = async (event) => {

    try {
        const connection = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters;

        const result = await connection.get({
            TableName: "SpeciesPlanet",
            Key: {
                id
            }
        }).promise()

        if (!result.Item) {
            console.log('============= sin item ==================')
            IntegrationSwapi(id)
        }

        return Responses._200(result);

    } catch (error) {
        console.log(error)
        return Responses._500({ message: 'Internal Error' });
    }

};

const IntegrationSwapi = async (id) => {

    try {
        const SWSpecie = await swapi.species({ id: id }).then(result => {
            result.plattform = 'API SWAPI'
            console.log('============= SWSpecie item ==================', result)
            return result;
        }).catch((err) => {
            console.log(error)
            return Responses._500({ message: 'API Error', error: err });
        });
        
        console.log('============ SWSpecie result ================', SWSpecie)
        if (!SWSpecie) {
            return Responses._404({ message: 'Specie Not Found :(' });
        }

        return Responses._200(SWSpecie);

    } catch (error) {
        console.log(error)
        return Responses._500({ message: 'Internal Error' });
    }
}

module.exports = {
    getSpecie: lambaGetSpecie
};
