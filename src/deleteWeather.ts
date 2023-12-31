import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk'

const tableName = process.env.TABLE_NAME as string;
const region = process.env.Region;
const client = new AWS.DynamoDB.DocumentClient();

module.exports.lambdaHandler = async (event: any): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    const weatherId = event.pathParameters.id as string
    // const weatherId = JSON.parse(event.pathParameters)
    // console.log(weatherId)
    try {
        const res = await client.delete({
            TableName: tableName,
            Key:{
                id:{"S":weatherId}
            }
        }).promise()
        response = {
            statusCode: 200,
            body: JSON.stringify(
                {
                    message: 'Weather Item deleted successfully'
                }
            ),
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