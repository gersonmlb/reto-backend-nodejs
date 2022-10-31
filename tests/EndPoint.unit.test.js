const getSpecieSwapi = require('../api/species/v1/getSpecieSwapi')

const idSpecie = 1

test('Test EndPoint is an object', () => {
    expect(typeof getSpecieSwapi).toBe('object')
});

test('Test data EndPoint ', async () => {
    let event = {
        pathParameters: {
            id: idSpecie
        }
    }

    const res = await getSpecieSwapi.getSpecieSwapi(event)
    expect(res.statusCode).toBe(200);
});

test('Test Error data EndPoint ', async () => {
    let event = {
        pathParameters: {
            ids: idSpecie
        }
    }

    const res = await getSpecieSwapi.getSpecieSwapi(event)
    expect(res.statusCode).toBe(404);
});
