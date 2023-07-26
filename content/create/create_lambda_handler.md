## Get Single Weather Item from DynamoDB

Inside the `src` folder, create a file called `createWeather.ts`.

Open up the `createWeather.ts` file and type in the following code.

```ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME as string;
// const region = process.env.Region;

module.exports.lambdaHandler = async (event: any): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    var blog_id = Math.floor(Math.random() * 1000).toString();
    const weatherItem = {
            id: blog_id,
            weather:   JSON.parse(event.body).weather as string,
            town:   JSON.parse(event.body).town
    };
    try {
        const test = await docClient.put({TableName: tableName,
            ReturnConsumedCapacity: "TOTAL", Item:weatherItem}).promise()
            if(test == null){
                response = {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Weather item created Successfully',
                })
            }}else{
                response = {
                    statusCode: 500,
                    body: JSON.stringify({
                        message: 'Error',
                    }),
                }
        
        };
    } catch (err: unknown) {
        console.log(err);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: err instanceof Error ? err.message : 'An error occured while creating weather.',
            }),
        };
    }
    return response;
};
```
The weather item data is gotten from the request body and inserted into dynamodb table.

`response = table.get_item(Key={'id': weather_id})`

We then wrap the method in a `try-catch` block and return a status and a message, based on the result.