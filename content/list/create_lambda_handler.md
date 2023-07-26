## Create a Lambda Handler to list all Items in DynamoDB

Inside the `src` folder, create a file called `listWeather.ts`.

Open up the `listWeather.ts` file and type in the following code.

```ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from "aws-sdk";


const region = process.env.Region;

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME as string;

module.exports.lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        const res = await docClient.scan({TableName: tableName}).promise()
        response = {
            statusCode: 200,
            body: JSON.stringify(res.Items),
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

This code creates a new instance of the DynamoDB SDK with the desired region, and then constructs a params object that defines the scan operation. The scan method is then called on the table object to retrieve all items in the table.