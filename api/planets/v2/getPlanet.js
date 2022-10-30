const AWS = require('aws-sdk');
const Responses = require('../../../internal/responses/api.responses');

const lambaGetPlanet = async (event) => {

  try {
    const connection = new AWS.DynamoDB.DocumentClient();

    const { id } = event.pathParameters

    const result = await connection.get({
      TableName: "PlanetsTable",
      Key: {
        id
      }
    }).promise()

    if (!result.Item) {
      return Responses._404({ message: 'Planets Not Found :(' });
    }

    return Responses._200(result.Item);

  } catch (error) {
    console.log(error)
    return Responses._500({ message: 'Internal Error' });
  }

};

module.exports = {
  getPlanet: lambaGetPlanet
};
