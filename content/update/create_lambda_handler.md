Create a Lambda Handler to Insert Items into DynamoDB

Here, we'll create our lambda handler implementation. We want to be able to save weather 
item details to dynamodb.

Create `src` folder in the root directory of your project. 

Inside the `src` folder, create a file called `updateWeather.py`.

Open up the `updateWeather.py` file and type in the following code.


```ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk'

const tableName = process.env.TABLE_NAME as string;
const region = process.env.Region;
const client = new AWS.DynamoDB.DocumentClient();

export const lambdaHandler = async (event: any): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    const weather_id = event.pathParameters.id
    const weather = JSON.parse(event['body']).weather
    const town = JSON.parse(event['body']).town as string
    var params = {
            Key:{
                id: weather_id as string,
            },
            UpdateExpression: "set weather = :weather, town = :town",
            ExpressionAttributeValues: {
                ':weather': {
                    "S": weather as string
                },
                ':town':{
                    "S": town as string
                }
        },
        returnValues: "UPDATED_NEW",
        TableName: tableName
    };
    try {
        
        const res = await client.update(
            params
        ).promise()
        // console.log("Hello world",test)
        response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Weather Successfully updated',
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

### Code Explanation

**Libraries**
The first line imports the APIGatewayProxyEvent and APIGatewayProxyResult classes from the aws-lambda library. These classes are used to represent the event and response objects that are passed to and from the Lambda function.

The next few lines import the AWS library and create a DynamoDB client. The DynamoDB client is used to interact with the DynamoDB database.

**function**
The code is a Lambda function that updates a weather record in DynamoDB. The function takes a parameter:

*event*: This is the event that triggered the Lambda function. It contains the ID of the weather record that needs to be updated, as well as the new weather and town values.

**params**
This variable specifies the weather ID, the update expression, and the expression attribute values. The update expression specifies the fields that need to be updated in the weather record. The expression attribute values specify the new values for the fields.

*Key*
The Key object specifies the weather ID. 
*UpdateExpression*
The UpdateExpression object specifies the update expression. The update expression is a string that contains the names of the fields that need to be updated, as well as the new values for the fields. In this case, the update expression sets the weather and town fields to the new values that were parsed from the event body.

*ExpressionAttributeValues*
The ExpressionAttributeValues object specifies the expression attribute values. The expression attribute values are the values that are used to replace the placeholder symbols in the update expression. In this case, the expression attribute values specify the new values for the weather and town fields.

*returnValues*
The returnValues object specifies the return values for the update operation. The returnValues object can be set to ALL_OLD, UPDATED_OLD, or UPDATED_NEW. In this case, the returnValues object is set to UPDATED_NEW, which means that the Lambda function will return the updated weather record.

*TableName*
The TableName object specifies the name of the DynamoDB table that contains the weather record.


The function then calls the update method on the DynamoDB client to update the weather record. The update method returns a promise. 

The function then waits for the promise to resolve and assigns the result to the response variable.

If the update is successful, the response variable will contain a status code of 200. The body of the response will contain a JSON object with a message that indicates that the weather record was updated successfully.

If the update is not successful, the response variable will contain a status code of 500. The body of the response will contain a JSON object with a message that indicates the reason for the error.

The function finally returns the response variable.