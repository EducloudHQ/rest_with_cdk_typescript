Create a Lambda Handler to Insert Items into DynamoDB

Here, we'll create our lambda handler implementation. We want to be able to save weather 
item details to dynamodb.

Create `src` folder in the root directory of your project. 

Inside the `src` folder, create a file called `update_weather.py`.

Open up the `update_weather.py` file and type in the following code.


```python
# lambda function to update weather item in dynamodb
import json
import boto3
import os
dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get("TABLE_NAME")
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    weather = json.loads(event['body'])['weather']
    town = json.loads(event['body'])['town']
    print(event)
    key = str(json.loads(event['pathParameters'])['id'])
    item = {
        'id': key,
        'weather': weather,
        'town': town
    }
    try:
        table.update_item(
            TableName=table_name, 
            Item=item,
            ReturnValues='NONE',
        )
        return {
            'statusCode': 200,
            'message': 'Weather Updated Successfully!'
        }
    except table_name:
        return {
            'statusCode': 500,
            'message': 'Ooops! An error occured.'
        }

```

Get the dynamodb resource from boto3, import the `TABLE_NAME` environment variable we defined in 
the Global Section of the `rest_weather_api_stack.py` file and then initialized our table.

```python 
dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get("TABLE_NAME")
table = dynamodb.Table(table_name)
```
In order to add or update a weather item in the database table, our lambda function expects the event body
to contain either `weather` or `town` or both `weather` and `town` values.

We use the `json.loads()` method to get the above values from the `event` body like so where the `event` holds the weather item information

<!-- 

```python
 weather = json.loads(event['body'])['weather']
 town = json.loads(event['body'])['town']
```
Remember we specified `id` as the primary key for the table. When inserting data 
into the table, we must have an `id` key value pair.

This `id` value must be unique for each item. For this case, generate a random number and assign to the id.

```python
 id = str(random.randrange(100, 999))
    item = {

        'id': id,
        'weather': weather,
        'town': town

    }
```
Finally, inside a `try` `except` block, we put the item into the table,
using `put_item` method.

```python
table.put_item(Item=item)
```
Then we return messages and appropriate status codes, depending on the success or failure of the 
process. -->
