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
///////////////////////////////////////////////////////////////////////////////////////////////////////
    // LAmbda create resource

    const create_weather_lambda = new lambda.Function(this, "CreateWeatherLambdaFunction",
                                         {
                                          functionName: 'cdk-typescript-create',
                                          runtime:lambda.Runtime.NODEJS_14_X,
                                          handler: 'createWeather.lambdaHandler',
                                          code : lambda.Code.fromAsset('src'),
                                          environment: { 
                                              'TABLE_NAME': table.tableName
                                          }
                                        })
    // Api gateway resource
    const weather_api = new apigw.RestApi( this, 'weather_rest_api')
    // Lambda permissions
    table.grantReadWriteData(create_weather_lambda)
                                  //  Create item route
    weather_api.root.addResource("create-weather").addMethod(
                                              "POST",
                                              new apigw.LambdaIntegration(create_weather_lambda)
                                          )

/////////////////////////////////////////////////////////////////////////////////////////////////
  }
}
