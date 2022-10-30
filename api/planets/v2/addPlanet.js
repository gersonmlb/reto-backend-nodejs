const { v4 } = require('uuid')
const AWS = require('aws-sdk')

const middy = require("@middy/core");
const httpJSONBodyParser = require("@middy/http-json-body-parser");
const validator = require('@middy/validator');

const lambaAddPlanet = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const {
            name,
            rotation_period,
            orbital_period,
            diameter,
            climate,
            gravity,
            terrain,
            surface_water,
            population
        } = JSON.parse(event.body);

        const created = new Date();
        const id = v4();

        const newPlanet = {
            id,
            name,
            rotation_period,
            orbital_period,
            diameter,
            climate,
            gravity,
            terrain,
            surface_water,
            population,
            created
        }

        await dynamodb.put({
            TableName: 'PlanetsTable',
            Item: newPlanet
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(newPlanet)
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        };
    }
};

const eventSchema = {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                rotation_period: { type: 'number' },
                orbital_period: { type: 'number' },
                diameter: { type: 'number' },
                climate: { type: 'string' },
                gravity: { type: 'string' },
                terrain: { type: 'string' },
                surface_water: { type: 'integer' },
                population: { type: 'integer' },
            },
            required: ['name']
        }
    }
}

module.exports = {
    add: middy().use(httpJSONBodyParser()).use(validator({ eventSchema })).use(httpErrorHandler()).handler(lambaAddPlanet)
};