import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as lambda from 'aws-cdk-lib/aws-lambda';
// import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs';
import path = require('path');

// import lambda = require('@aws-cdk/aws-lambda');

export class RestWithCdkTypescriptStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'CdkTypescriptWeatherTable',
     {
      tableName:"cdkTypescript1",
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });
    const weather_api = new apigw.RestApi( this, 'weather_rest_api')


    const weathers = weather_api.root.addResource("weather")
    //////////////////////////////////////////////////////////////////////////////

     // LAmbda list resource

     const list_weather_lambda = new lambda.Function(this, "listWeatherLambdaFunction",
     {
       functionName: 'cdk-typescript-list',
       runtime:lambda.Runtime.NODEJS_14_X,
       handler: 'listWeathers.lambdaHandler',
       code : lambda.Code.fromAsset('src'),
       environment: { 
         'TABLE_NAME': table.tableName
       }
     })
 
     // Lambda permissions
     table.grantReadData(list_weather_lambda)
     //  list item route
         weathers.addMethod(
             "GET",
             new apigw.LambdaIntegration(list_weather_lambda)
         )

  }
}
