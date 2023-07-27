## Create a Lambda Resource

Create a Lambda resource to handle the API requests and insert the data into the DynamoDB table. Navigate to `lib/*-stack.ts` and modify it with the following code.


```ts
import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs';
import path = require('path');

export class RestWithCdkTypescriptStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const table = new dynamodb.Table(this, 'CdkTypescriptWeatherTable', {
            tableName:"cdkTypescript1",
            partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
        }
    );
        
    const update_weather_lambda = new lambda.Function(this, "updateWeatherLambdaFunction",
         {
           functionName: 'cdk-typescript-update',
           runtime:lambda.Runtime.NODEJS_14_X,
           handler: 'updateWeather.lambdaHandler',
           code : lambda.Code.fromAsset('src'),
           environment: { 
             'TABLE_NAME': table.tableName
           }
         })
     
         // Lambda permissions
         table.grantReadWriteData(update_weather_lambda)
  }
}
```

This code creates a Lambda function with the `NODEJS_14_X runtime`, using a handler function named `updateWeather.handler`. The environment property is set with the name of the DynamoDB table and the primary key field name. Finally, the `grantReadWriteData` method is called to grant the function permissions to write data to the DynamoDB table.