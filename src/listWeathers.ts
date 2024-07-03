import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";

import { unmarshall } from "@aws-sdk/util-dynamodb";

import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

const tableName: string = process.env.TABLE_NAME!;

export const lambdaHandler: Handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const command = new ScanCommand({ TableName: tableName });

    const scanResponse = await client.send(command);

    const items = scanResponse.Items?.map((item) => {
      return unmarshall(item);
    });
    return {
      statusCode: 200,
      body: JSON.stringify(items),
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
