const AWS = require('aws-sdk');

const lambaGetPlanet = async (event) => {

  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters

    const result = await dynamodb.get({
      TableName: "PlanetsTable",
      Key:{
        id
      }
    }).promise()

    return {
      status: 200,
      body: result.Item,
    };
  } catch (error) {

    return {
      status: 500,
      body: JSON.stringify(error),
    };
  }

};

module.exports = {
  getPlanet: lambaGetPlanet
};
