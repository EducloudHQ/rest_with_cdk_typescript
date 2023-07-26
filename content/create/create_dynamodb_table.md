## Creating Dynamodb Table.

Create a DynamoDB table to store the data.

Here's how to create a table using the CDK with typescript:

```ts
import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
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
  }
}
```

This will create a DynamoDB table with a `partition key` named `id` and `table name` `cdkWeatherRestTypescript`.

**Partition Key**: A Partition key is part of the primary key that determines the partition in which an item is stored