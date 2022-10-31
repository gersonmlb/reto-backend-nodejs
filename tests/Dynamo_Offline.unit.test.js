const Dynamo = require('../internal/connection/DynamoOffline')

test('Test Dynamo is an object', () => {
    expect(typeof Dynamo).toBe('object')
});

test('Test Dynamo get', () => {
    expect(typeof Dynamo.scan).toBe('function')
});

test('Test Dynamo getOne', () => {
    expect(typeof Dynamo.getOne).toBe('function')
});

test('Test Dynamo Insert', () => {
    expect(typeof Dynamo.write).toBe('function')
});

const validaTableName = "PlanetsTable";
const data = {
    id: '00000000-0000-0000-0000-000000000000',
    name: "Testing",
    rotation_period: 23,
    orbital_period: 304,
    diameter: 104658,
    climate: "solid",
    gravity: "1 standard",
    terrain: "desert",
    surface_water: 1,
    population: 200000
};

test('Test Dynamo typeof getone', async () => {
    try {
        const res_test = await Dynamo.getOne(data.id, validaTableName)
        expect(res_test).toBe('object')
    } catch (error) {
        console.log('error in test dynamo insert', error)
    }
});

test('Test Dynamo insert', async () => {
    expect.assertions(1);
    try {
        const res_test = await Dynamo.write(validaTableName, data)
        expect(res_test).toBe(data)
    } catch (error) {
        console.log('error in test dynamo insert', error)
    }
});

test('Test Dynamo getone data', async () => {
    try {
        const res_test = await Dynamo.getOne(data.id, validaTableName)
        expect(res_test).toBe(data)
    } catch (error) {
        console.log('error in test dynamo insert', error)
    }
});

test('Test Dynamo get', async () => {
    expect.assertions(1);

    try {
        const res_test = await Dynamo.scan(validaTableName)
        expect(res_test).toBe('object')
    } catch (error) {
        console.log('error in test dynamo insert', error)
    }
});