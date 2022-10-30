const Responses = require('../internal/responses/api.responses')

test('Test Response is an object', () => {
    expect(typeof Responses).toBe('object')
});

test('Test Response 200 works', () => {
    const res = Responses._200({ name: 'Test of response' })
    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Content-Type']).toBe('application/json')
    expect(res.headers['Access-Control-Allow-Methods']).toBe('GET, POST')
})

test('Test Response 404 works', () => {
    const res = Responses._404({ message: 'Test of response Not Found' })
    expect(res.statusCode).toBe(404);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Content-Type']).toBe('application/json')
})

test('Test Response 500 works', () => {
    const res = Responses._500({ message: 'Test of response: Internal error' })
    expect(res.statusCode).toBe(500);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Content-Type']).toBe('application/json')
})

test('test define response', () => {
    const res = Responses._defineResponse(382, { test: 'Testing define response' })
    expect(res.statusCode).toBe(382)
    expect(res.body).toBe(JSON.stringify({ test: 'Testing define response' }))
})