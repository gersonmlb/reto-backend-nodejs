const AWS = require('aws-sdk');
const Responses = require('../../../internal/responses/api.responses')

const lambaGetPlanets = async (event) => {

  try {
    const connection = new AWS.DynamoDB.DocumentClient();

    const result = await connection.scan({
      TableName: "PlanetsTable"
    }).promise()

    
    if (!result.Items) {
      return Responses._404({message: 'Planets Not Found :('});
    }
    
    return Responses._200(result.Items);
    
  } catch (error) {
    console.log(error)
    return Responses._500({message: 'Internal Error'});  
  }

};

module.exports = {
  getPlanets: lambaGetPlanets
};

