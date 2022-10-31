const Responses = require('../../../internal/responses/api.responses');
const middy = require("@middy/core");
const Dynamo = require('../../../internal/connection/Dynamo');
const httpErrorHandler = require('@middy/http-error-handler');

const lambaAddSpecie = async (data) => {
    try {
        const {
            id,
            name,
            language,
            hair_colors,
            skin_colors,
            eye_colors,
            designation,
            classification,
            average_lifespan,
            average_height
        } = data;

        const created = new Date();

        const newSpecie = {
            identificador: id,
            nombre: name,
            altura_media: average_height,
            promedio_vida: average_lifespan,
            clasificación: classification,
            designacion: designation,
            color_ojos: eye_colors,
            color_cabello: hair_colors,
            idioma: language,
            colores_de_piel: skin_colors,
            creado: created,
            plataforma: 'Own'
        }

        await Dynamo.write('SpeciesPlanet', newSpecie)
        return Responses._200(newSpecie);

    } catch (error) {
        return Responses._500({ message: 'Internal Error' });
    }
};

module.exports = {
    add: middy()
        .use(httpErrorHandler())
        .handler(lambaAddSpecie)
};