## Create an API Gateway REST API

Create an API Gateway `REST API` to handle the API requests and forward them to the Lambda function. 

```ts
import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as lambda from 'aws-cdk-lib/aws-lambda';
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
    // Lambda create resource

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
  }
}


```

This will create an API Gateway REST API with a single endpoint at `/create-weather` that accepts `POST` requests. 

The `LambdaProxyIntegration` method is used to `integrate` the Lambda function with the `API Gateway`.