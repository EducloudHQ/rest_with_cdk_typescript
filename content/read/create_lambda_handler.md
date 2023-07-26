## Create a Lambda Handler to Insert Items into DynamoDB

Inside the `src` folder, create a file called `get_weather.py`.

Open up the `get_weather.py` file and type in the following code.

```python
# lambda function to get single item from dynamodb table
import json
import boto3
import os
dynamodb = boto3.resource('dynamodb')
table_name = os.environ["TABLE_NAME"]


def lambda_handler(event, context):
    weather_id = str(event['pathParameters']['id'])
    table = dynamodb.Table(table_name)
    try:
        result = table.get_item(Key={'id': weather_id})
        return {
            'statusCode': 200,
            'body': json.dumps(result['Item'])
        }
    except:
        return {
            'statusCode': 500,
            'message': "Unable to get item"
        }
```
In the above code, we import dynamodb resource from boto3 then use that to access our dynamodb table.

The weather item id is gotten from pathParameters event object and used as a value in 
getting an item from dynamodb.

`response = table.get_item(Key={'id': weather_id})`

We then wrap the method in a `try-except` block and return a status and a message, based on the result.
