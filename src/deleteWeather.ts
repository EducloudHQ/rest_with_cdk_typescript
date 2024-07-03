import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
const client = new DynamoDBClient({});
const tableName = process.env.TABLE_NAME as string;

export const lambdaHandler: Handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult;
  if (event.pathParameters == null) {
    return {
      statusCode: 500,

      body: JSON.stringify({
        message: "Id missing from path parameters",
      }),
    };
  }
  const weatherId = event.pathParameters.id as string;

  try {
    const command = new DeleteItemCommand({
      TableName: tableName,
      Key: {
        id: { S: weatherId },
      },
    });
    await client.send(command);

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Weather Item deleted successfully",
      }),
    };
  } catch (err: unknown) {
    console.log(err);
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: err instanceof Error ? err.message : "some error happened",
      }),
    };
  }
  return response;
};
