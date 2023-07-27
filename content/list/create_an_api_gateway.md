## Create an API Gateway REST API

Create an API Gateway `REST API` to handle the API requests and forward them to the Lambda function. Navigate to `lib/*-stack.ts` and modify it with the following code.

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

         const weathers = weather_api.root.addResource("weathers")
        weathers.addMethod(
            "GET",
            new apigw.LambdaIntegration(list_weather_lambda)
        )    
  }
}
```

This will create an API Gateway REST API with a single endpoint at `/weathers` that accepts `GET` requests and list all weather items in dynamodb table. 

The `LambdaProxyIntegration` method is used to `integrate` the Lambda function with the `API Gateway`.