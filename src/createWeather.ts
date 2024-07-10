import {
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
  Handler,
} from "aws-lambda";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const ddbDocClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.TABLE_NAME as string;

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

  const weather_event = JSON.parse(event.body);

  const weather_id = Math.floor(Math.random() * 1000).toString();

  try {
    const command = new PutCommand({
      TableName: tableName,
      ReturnValues: "NONE",
      Item: {
        id: weather_id,

        weather: weather_event.weather,

        town: weather_event.town,
      },
    });
    await ddbDocClient.send(command);

    return {
      statusCode: 201,
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
