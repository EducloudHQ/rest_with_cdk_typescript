import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";
export const client = new DynamoDBClient({});

const ddbDocClient = DynamoDBDocumentClient.from(client);
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
    const command = new DeleteCommand({
      TableName: tableName,
      Key: {
        id: weatherId,
      },
    });
    await ddbDocClient.send(command);

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
