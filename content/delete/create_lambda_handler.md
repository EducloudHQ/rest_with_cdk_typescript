## Create a Lambda Handler to Insert Items into DynamoDB

Inside the `src` folder, create a file called `delete_weather.py`.

Open up the `delete_weather.py` file and type in the following code.

```python
# lambda function to delete a single item from dynamodb table
import json
import os

import boto3

dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get("TABLE_NAME")


def lambda_handler(event, context):
    table = dynamodb.Table(table_name)
    weather_id = str(json.loads(event['pathParameters'])['id'])
    id_key = {
        "id": weather_id
    }
    print(event)
    try:
        table.delete_item(Key=id_key)
        return {
            'statusCode': 200,
            'body': "Weather Delete Succeessfull"
        }
    except table_name:
        return {
            'statusCode': 500,
            'body': "An error occured. Weather not deleted"
        }

```
In the above code, we import dynamodb resource from boto3 then use that to access our dynamodb table.

The weather item id is gotten from pathParameters event object and used as a value in identify the item to be deleted from dynamodb.

`response = table.delete_item(Key={'id': weather_id})`

We then wrap the method in a `try-except` block and return a status and a message, based on the result.
