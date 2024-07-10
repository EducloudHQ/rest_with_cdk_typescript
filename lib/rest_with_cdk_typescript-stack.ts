import { Stack, StackProps } from "aws-cdk-lib";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";

import * as apigw from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

export class RestWithCdkTypescriptStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, "CdkTypescriptWeatherTable", {
      tableName: "weather_rest_api_db",
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // Lambda create resource

    const create_weather_lambda = new lambda.Function(
      this,
      "CreateWeatherLambdaFunction",
      {
        functionName: "CreateWeatherFunction",
        runtime: lambda.Runtime.NODEJS_20_X,
        handler: "createWeather.lambdaHandler",
        code: lambda.Code.fromAsset("src"),
        environment: {
          TABLE_NAME: table.tableName,
        },
      }
    );
    // Lambda permissions
    table.grantWriteData(create_weather_lambda);
    // Api gateway resource
    const weather_api = new apigw.RestApi(this, "weather_rest_api");

    //  Create item route
    weather_api.root
      .addResource("create-weather")
      .addMethod("POST", new apigw.LambdaIntegration(create_weather_lambda));

    /////////////////////////////////////////////////////////////////////////////////////////////////

    // LAmbda get resource

    const get_weather_lambda = new lambda.Function(
      this,
      "getWeatherLambdaFunction",
      {
        functionName: "GetWeatherFunction",
        runtime: lambda.Runtime.NODEJS_20_X,
        handler: "getWeather.lambdaHandler",
        code: lambda.Code.fromAsset("src"),
        environment: {
          TABLE_NAME: table.tableName,
        },
      }
    );

    // Lambda permissions
    table.grantReadData(get_weather_lambda);
    //  get item route
    const weathers = weather_api.root.addResource("weathers");
    const weather = weathers.addResource("{id}");
    weather.addMethod("GET", new apigw.LambdaIntegration(get_weather_lambda));

    //////////////////////////////////////////////////////////////////////////////

    // Lambda list resource

    const list_weather_lambda = new lambda.Function(
      this,
      "listWeatherLambdaFunction",
      {
        functionName: "ListWeatherFunction",
        runtime: lambda.Runtime.NODEJS_20_X,
        handler: "listWeathers.lambdaHandler",
        code: lambda.Code.fromAsset("src"),
        environment: {
          TABLE_NAME: table.tableName,
        },
      }
    );

    // Lambda permissions
    table.grantReadData(list_weather_lambda);
    //  list item route

    weathers.addMethod("GET", new apigw.LambdaIntegration(list_weather_lambda));

    //////////////////////////////////////////////////////////////////////////////////////

    // LAmbda delete resource

    const delete_weather_lambda = new lambda.Function(
      this,
      "deleteWeatherLambdaFunction",
      {
        functionName: "DeleteWeatherFunction",
        runtime: lambda.Runtime.NODEJS_20_X,
        handler: "deleteWeather.lambdaHandler",
        code: lambda.Code.fromAsset("src"),
        environment: {
          TABLE_NAME: table.tableName,
        },
      }
    );

    // Lambda permissions
    table.grantWriteData(delete_weather_lambda);
    //  Create item route
    weather.addMethod(
      "DELETE",
      new apigw.LambdaIntegration(delete_weather_lambda)
    );

    //////////////////////////////////////////////////////////////////////////////////////

    // Lambda update resource

    const update_weather_lambda = new lambda.Function(
      this,
      "updateWeatherLambdaFunction",
      {
        functionName: "UpdateWeatherFunction",
        runtime: lambda.Runtime.NODEJS_20_X,
        handler: "updateWeather.lambdaHandler",
        code: lambda.Code.fromAsset("src"),
        environment: {
          TABLE_NAME: table.tableName,
        },
      }
    );

    // Lambda permissions
    table.grantWriteData(update_weather_lambda);
    //  Create item route
    weather.addMethod(
      "PUT",
      new apigw.LambdaIntegration(update_weather_lambda)
    );
  }
}
