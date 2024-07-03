import {
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
  Handler,
} from "aws-lambda";

import { unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

const tableName = process.env.TABLE_NAME as string;
export const lambdaHandler: Handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (event.pathParameters == null) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Id missing from path parameters",
      }),
    };
  }

  console.log(event);
  console.log(event.pathParameters.id);
  const weather_id = event.pathParameters.id;
  var params = {
    Key: {
      id: {
        S: weather_id as string,
      },
    },
    TableName: tableName,
  };
  try {
    const command = new GetItemCommand(params);

    const getResponse = await client.send(command);

    const item = unmarshall(getResponse.Item!);

    console.log("item is ", item);

    return {
      statusCode: 200,
      body: JSON.stringify({
        item,
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
