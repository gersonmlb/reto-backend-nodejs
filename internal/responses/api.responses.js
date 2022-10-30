
const Responses = {
    _defineResponse(statusCode = 502, data = {}, message = ''){
        return {
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': 'GET, POST',
                'Access-Control-Allow-Origin': '*'
            },
            statusCode,
            body: JSON.stringify(data)
        }
    },

    _200(data = {}){
        return this._defineResponse(200, data)
    },
    _404(data = {}){
        return this._defineResponse(404, data)
    },
    _500(data = {}){
        return this._defineResponse(500, data)
    }
}

module.exports = Responses;