module.exports = {
    tables: [
        {
            TableName: "PlanetsTable",
            KeySchema: [
                {
                    AttributeName: "id",
                    KeyType: "HASH"
                }
            ],
            AttributeDefinitions: [
                {
                    AttributeName: "id",
                    AttributeType: "S"
                }
            ],
            BillingMode: "PAY_PER_REQUEST"
        },
        {
            TableName: "SpeciesPlanet",
            KeySchema: [
                {
                    AttributeName: "id",
                    KeyType: "HASH"
                }
            ],
            AttributeDefinitions: [
                {
                    AttributeName: "id",
                    AttributeType: "S"
                }
            ],
            BillingMode: "PAY_PER_REQUEST"
        }
    ]
}