const { v4 } = require('uuid')
const AWS = require('aws-sdk');

const middy = require("@middy/core");
const httpJSONBodyParser = require("@middy/http-json-body-parser");
const validator = require('@middy/validator');
const httpErrorHandler = require('@middy/http-error-handler');
const Responses = require('../../../internal/responses/api.responses');
const Dynamo = require('../../../internal/connection/Dynamo');

const lambaAddPlanet =( async (event) => {
    try {
        const connection = new AWS.DynamoDB.DocumentClient();
        const id = v4();
        const created = new Date();

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
        } = event.body;

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

        await Dynamo.write('PlanetsTable', newPlanet);

        return Responses._200(newPlanet);
    } catch (error) {
        throw new createError(500, { message: { error: "Internal Error" } });
    }
})

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
    add: middy(lambaAddPlanet)
        .use(httpJSONBodyParser())
        .use(validator({ eventSchema }))
        .use(httpErrorHandler())
};