const Responses = require('../../../internal/responses/api.responses');
const getSpecieSwapi = require('./getSpecieSwapi');
const Dynamo = require('../../../internal/connection/Dynamo');

const lambaGetSpecie = async (event) => {

    try {
        const { id } = event.pathParameters;

        if (!id) {
            return Responses._404({ message: 'Id Not Found in Path' });
        }
        
        const result = await Dynamo.getOne(id, "SpeciesPlanet")

        if (!result.Item) {
            console.log('getSpecieSwapi.getSpecieSwapi(event)', event)
            await getSpecieSwapi.getSpecieSwapi(event)
        }

        return Responses._200(result);

    } catch (error) {
        console.log(error)
        return Responses._500({ message: 'Internal Error' });
    }

};

module.exports = {
    getSpecie: lambaGetSpecie
};
