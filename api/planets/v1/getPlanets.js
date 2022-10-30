const AWS = require('aws-sdk');

const lambaGetPlanets = async (event) => {

  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const result = await dynamodb.scan({
      TableName: "PlanetsTable"
    }).promise()

    return {
      status: 200,
      body: result.Items,
    };
  } catch (error) {

    return {
      status: 500,
      body: JSON.stringify(error),
    };
  }

};

module.exports = {
  getPlanets: lambaGetPlanets
};

