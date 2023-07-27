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

         const weathers = weather_api.root.addResource("weather")
        const weather = weathers.addResource('{id}')
        weather.addMethod(
            "GET",
            new apigw.LambdaIntegration(get_weather_lambda)
        )  
             weather.addMethod(
                 "DELETE",
                 new apigw.LambdaIntegration(delete_weather_lambda)
             )   
  }
}
```

This will create an API Gateway REST API with a single endpoint at `/weather/{id}` that accepts `DELETE` requests. 

The `LambdaProxyIntegration` method is used to `integrate` the Lambda function with the `API Gateway`.