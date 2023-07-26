## Create a Lambda Handler to Insert Items into DynamoDB

Inside the `src` folder, create a file called `deleteWeather.ts`.

Open up the `deleteWeather.ts` file and type in the following code.

```ts
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
```
In the above code, we import dynamodb resource from boto3 then use that to access our dynamodb table.

The weather item id is gotten from pathParameters event object and used as a value in identify the item to be deleted from dynamodb.

`response = client.delete(Key={'id': weather_id})`

We then wrap the method in a `try-catch` block and return a status and a message, based on the result.
