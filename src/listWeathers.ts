import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";

import { unmarshall } from "@aws-sdk/util-dynamodb";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
export const client = new DynamoDBClient({});

const ddbDocClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.TABLE_NAME as string;

export const lambdaHandler: Handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const command = new ScanCommand({
      TableName: tableName,
    });

    const data = await ddbDocClient.send(command);
    console.log(`scan response ${JSON.stringify(data.Items)}`);

    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
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
