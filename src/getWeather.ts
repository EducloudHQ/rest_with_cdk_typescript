import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from "aws-sdk";

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME as string;
const region = process.env.Region;
// const client = new DynamoDBClient({ region: region });

module.exports.lambdaHandler = async (event: any): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    console.log(event)
    console.log(event.pathParameters.id)
    const weather_id = event.pathParameters.id
    var params = {
            Key:{
                id: {
                    "S": weather_id as string
                },
            },
        TableName: process.env.TABLE_NAME
    };
    try {
        
        const res = await docClient.get(
            {
                Key:{
                    id: {
                        "S": weather_id as string
                    },
                },
            TableName: tableName
        }
        ).promise()
        response = {
            statusCode: 200,
            body: JSON.stringify({
                Body: res.Item,
            }),
        };
    } catch (err: unknown) {
        console.log(err);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: err instanceof Error ? err.message : 'some error happened',
            }),
        };
    }
    return response;
};

// lambda function to upate weather item in dynamodb
