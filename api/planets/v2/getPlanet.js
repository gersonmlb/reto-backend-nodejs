const Responses = require('../../../internal/responses/api.responses');
const middy = require("@middy/core");
const Dynamo = require('../../../internal/connection/Dynamo');

const lambaGetPlanet = async (event) => {

  try {
    const { id } = event.pathParameters

    const result = await Dynamo.getOne( id, "PlanetsTable")

    if (!result.Item) {
      throw new createError(404, { message: { error: "Planet Not Found :(" } });
    }

    return Responses._200(result.Item);

  } catch (error) {
    throw new createError(500, { message: { error: "Internal Error" } });
  }

};

module.exports = {
  getPlanet: middy()
    .use(httpErrorHandler())
    .handler(lambaGetPlanet)
};
