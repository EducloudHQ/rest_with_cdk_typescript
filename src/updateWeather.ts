import {
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
  Handler,
} from "aws-lambda";

import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});
const tableName = process.env.TABLE_NAME as string;
export const lambdaHandler: Handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log(event);
  if (event.body == null) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Empty Input parameters",
      }),
    };
  }
  if (event.pathParameters == null) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Empty path parameters",
      }),
    };
  }

  console.log(event);

  console.log(event.pathParameters.id);
  const weather_id = event.pathParameters.id;
  const weather_event = JSON.parse(event["body"]);

  var params = {
    Key: {
      id: {
        S: weather_id as string,
      },
    },
    UpdateExpression: "set weather = :weather, town = :town",
    ExpressionAttributeValues: {
      ":weather": {
        S: weather_event.weather,
      },
      ":town": {
        S: weather_event.town,
      },
    },
    returnValues: "UPDATED_NEW",
    TableName: tableName,
  };
  try {
    const command = new UpdateItemCommand(params);
    await client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Weather Successfully updated",
      }),
    };
  } catch (err: unknown) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err instanceof Error ? err.message : "some error happened",
      }),
    };
  }
};

// lambda function to upate weather item in dynamodb
