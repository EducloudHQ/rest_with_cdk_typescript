## Create a Lambda Resource

Create a Lambda resource to handle the API requests and delete data from the DynamoDB table.


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
    const table = new dynamodb.Table(this, 'CdkTypescriptWeatherTable', {
            tableName:"cdkTypescript1",
            partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
        }
    );
        
        // LAmbda delete resource

         const delete_weather_lambda = new lambda.Function(this, "deleteWeatherLambdaFunction",
         {
           functionName: 'cdk-typescript-delete',
           runtime:lambda.Runtime.NODEJS_14_X,
           handler: 'deleteWeather.lambdaHandler',
           code : lambda.Code.fromAsset('src'),
           environment: { 
             'TABLE_NAME': table.tableName
           }
         })
      // Lambda permissions
         table.grantReadWriteData(delete_weather_lambda)  
  }
}
```


This will create a Lambda function with the PYTHON_3_8 runtime, using a handler function named `deleteWeather.lambdaHandler`. The code property is set to a directory named lambda_handler, which contains the `code` for the Lambda function. The `environment` property is set with the name of the `DynamoDB table` and the `primary key field name`. The `grantReadWriteData` method is called to give the function minimal `permissions` to `access DynamoDB table`.