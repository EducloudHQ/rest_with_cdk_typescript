## Create a Lambda Handler to list all Items in DynamoDB

Inside the `src` folder, create a file called `list_weather.py`.

Open up the `list_weather.py` file and type in the following code.

```python

# lambda function to get the current weather

import json
import os

import boto3

dynamodb = boto3.resource('dynamodb')

table_name = os.environ.get['TABLE_NAME']
table = dynamodb.Table(table_name)


def lambda_handler(event, context):
    try:
        response = table.scan(TableName=table_name)
        return {
            'statusCode': 200,
            'body': json.dumps(response['Items'])
        }
    except table_name:
        return {
            'statusCode': 500,
            'message': "Unable to get items"
        }
```

This code creates a new instance of the DynamoDB SDK with the desired region, and then constructs a params object that defines the scan operation. The scan method is then called on the table object to retrieve all items in the table.