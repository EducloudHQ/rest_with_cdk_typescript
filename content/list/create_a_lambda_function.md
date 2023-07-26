Here, we'll create a Lambda function that will list all items in the DynamoDB table.


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
        
        // LAmbda delete resource

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
  }
}
```

This code creates a Lambda function with the `Python 3.8 runtime`, using a handler function named `listWeather.handler`. The code property is set to a directory named lambda, which contains the code for the Lambda function. The environment property is set with the name of the DynamoDB table and the primary key field name. Finally, the grant_read_data method is called to give the function permissions to read data from the DynamoDB table.