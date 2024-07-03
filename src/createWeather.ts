import {
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
  Handler,
} from "aws-lambda";

import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
export const client = new DynamoDBClient({});
const tableName = process.env.TABLE_NAME as string;
//const region = process.env.Region;

export const lambdaHandler: Handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (event.body == null) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Event Body Can't be null",
      }),
    };
  }
  var blog_id = Math.floor(Math.random() * 1000).toString();

  try {
    const command = new PutItemCommand({
      TableName: tableName,
      ReturnValues: "NONE",
      Item: {
        id: {
          S: blog_id,
        },
        weather: {
          S: JSON.parse(event.body).weather as string,
        },
        town: {
          S: JSON.parse(event.body).town,
        },
      },
    });
    await client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Weather item created Successfully",
      }),
    };
  } catch (err: unknown) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message:
          err instanceof Error
            ? err.message
            : "An error occured while creating weather.",
      }),
    };
  }
};
