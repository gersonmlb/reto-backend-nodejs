const Responses = require('../../../internal/responses/api.responses');
const httpErrorHandler = require('@middy/http-error-handler');
const middy = require("@middy/core");
const Dynamo = require('../../../internal/connection/Dynamo');

const lambaGetPlanets = async (event) => {

  try {

    const result = await Dynamo.scan("PlanetsTable")

    if (!result.Items) {
      return Responses._404({ message: { error: "Planets Not Found :(" } });
    }

    return Responses._200(result.Items);

  } catch (error) {
    throw new createError(500, { message: { error: "Internal Error" } });
  }

};

module.exports = {
  getPlanets: middy()
    .use(httpErrorHandler())
    .handler(lambaGetPlanets)
};

