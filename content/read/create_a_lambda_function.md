## Create a Lambda Resource

Create a Lambda resource to handle the API requests and get sigle weather data from DynamoDB table. Navigate to `lib/*-stack.ts` and modify it with the following code.


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
      

         const get_weather_lambda = new lambda.Function(this, "getWeatherLambdaFunction",
            {
            functionName: 'cdk-typescript-list',
            runtime:lambda.Runtime.NODEJS_14_X,
            handler: 'getWeathers.lambdaHandler',
            code : lambda.Code.fromAsset('src'),
            environment: { 
                'TABLE_NAME': table.tableName
            }
            })
 
     // Lambda permissions
     table.grantReadData(get_weather_lambda)
  }
}
```

This will create a Lambda function with the `NODEJS_14_X` runtime, using a handler function named `getWeather.lambdaHandler`. The code property is set to a directory named lambdaHandler, which contains the `code` for the Lambda function. The `environment` property is set with the name of the `DynamoDB table` and the `primary key field name`. The `grantReadData` method is called to give the function `permissions` to `read data` from `DynamoDB table`.