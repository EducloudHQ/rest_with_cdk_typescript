## Create a Lambda Handler to Insert Items into DynamoDB

Inside the `src` folder, create a file called `getWeather.ts`.

Open up the `getWeather.ts` file and type in the following code.

```ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from "aws-sdk";

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME as string;
const region = process.env.Region;

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
```
In the above code, we imports all AWS services as `AWS` from `aws-sdk` then use that to access our dynamodb table.

The weather item id is gotten from pathParameters event object and used as a value in 
getting an item from dynamodb.

```ts
docClient.get(
            {
                Key:{
                    id: {
                        "S": weather_id as string
                    },
                },
            TableName: tableName
        }
        ).promise()
```

We then wrap the method in a `try-catch` block and return a status and a message, based on the result.
