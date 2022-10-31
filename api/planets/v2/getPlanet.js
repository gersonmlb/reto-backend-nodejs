const Responses = require('../../../internal/responses/api.responses');
const middy = require("@middy/core");
const httpErrorHandler = require('@middy/http-error-handler');
const swapi = require('swapi-node');

const lambaGetPlanet = async (event) => {

  try {
    const { id } = event.pathParameters

    const SWPlanet = await swapi.planets({ id: id }).then(result => result)

    if (!SWPlanet) {
      throw new createError(404, { message: { error: "Planet Not Found :(" } });
    }

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
    } = SWPlanet;

    const dataPlanet = {
      nombre: name,
      periodo_rotacion: rotation_period,
      periodo_orbital: orbital_period,
      diametro: diameter,
      clima: climate,
      gravedad: gravity,
      terreno: terrain,
      superficie_agua: surface_water,
      poblacion: population,
      plataforma: 'API Swapi'
    }

    return Responses._200(dataPlanet);

  } catch (error) {
    throw new createError(500, { message: { error: "Internal Error" } });
  }

};

module.exports = {
  getPlanet: middy()
    .use(httpErrorHandler())
    .handler(lambaGetPlanet)
};
