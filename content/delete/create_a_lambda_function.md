## Create a Lambda Resource

Create a Lambda resource to handle the API requests and delete data from the DynamoDB table. You can create the function using the AWS Management Console, AWS CLI, or the AWS SDK. 

Here's how to create a lambda function using the CDK with Python:


```py
from aws_cdk import Stack
from aws_cdk import aws_lambda as _lambda
from constructs import Construct


class RestWithCdkPythonStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

## Defining lambda resource
        delete_weather_lambda = _lambda.Function(self,"DeleteWeatherLambdaFunction",
                                         runtime=_lambda.Runtime.PYTHON_3_8,
                                         handler='delete_weather.lambda_handler',
                                         code=_lambda.Code.from_asset('src'),
                                         environment={ 
                                            'TABLE_NAME': table.table_name
                                         })
    table.grant_read_write_data(read_weather_lambda);
```


This will create a Lambda function with the PYTHON_3_8 runtime, using a handler function named `delete_weather.lambda_handler`. The code property is set to a directory named lambda_handler, which contains the `code` for the Lambda function. The `environment` property is set with the name of the `DynamoDB table` and the `primary key field name`. The `grant_read_write_data` method is called to `grant` the function minimal `permissions` to `access DynamoDB table`.