## Create a Lambda Resource

Create a Lambda resource to handle the API requests and insert the data into the DynamoDB table. Navigate to `lib/*-stack.ts` and modify it with the following code.


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

// Defining lambda resource
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
    table.grant_write_data(create_weather_lambda);
  }
}
```


This will create a Lambda function with the `NODEJS_14_X` runtime, using a handler function named `createWeather.lambdaHandler`. The code property is set to a directory named lambda_handler, which contains the `code` for the Lambda function. The `environment` property is set with the name of the `DynamoDB table` and the `primary key field name`. The `grantWriteData` method is called to give the function `permissions` to `write data` to the `DynamoDB table`.