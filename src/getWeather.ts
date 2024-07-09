import {
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
  Handler,
} from "aws-lambda";

import { unmarshall } from "@aws-sdk/util-dynamodb";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const ddbDocClient = DynamoDBDocumentClient.from(client);
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
      id: weather_id,
    },
    TableName: tableName,
  };
  try {
    const data = await ddbDocClient.send(new GetCommand(params));
    console.log(`get response is `, JSON.stringify(data.Item));

    return {
      statusCode: 200,
      body: JSON.stringify(data.Item),
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
