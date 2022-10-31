const Responses = require('../../../internal/responses/api.responses');
const swapi = require('swapi-node');
const addSpecie = require('../v2/addSpecie');

const IntegrationSwapi = async (event, add = false) => {
    try {
        const { id } = event.pathParameters;

        if (!id) {
            return Responses._404({ message: 'Id Not Found in Path' });
        }

        const SWSpecie = await swapi.species({ id: id }).then(result => result)

        if (!SWSpecie) {
            return Responses._404({ message: 'Specie Not Found :(' });
        }

        SWSpecie.id = id
        SWSpecie.plattform = 'API SWAPI'

        if (add) {
            console.log('addSpecie.add(SWSpecie)', SWSpecie)
            await addSpecie.add(SWSpecie)
        }

        return Responses._200(SWSpecie);

    } catch (error) {
        return Responses._500({ message: 'API Error' });
    }
}

module.exports = {
    getSpecieSwapi: IntegrationSwapi
};
