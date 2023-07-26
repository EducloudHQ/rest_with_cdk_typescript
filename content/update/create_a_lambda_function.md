## Create a Lambda Resource

Create a Lambda resource to handle the API requests and insert the data into the DynamoDB table. You can create the function using the AWS Management Console, AWS CLI, or the AWS SDK. 

Here's how to create a lambda function using the CDK with Python:


```py
from aws_cdk import Stack
from aws_cdk import aws_lambda as _lambda
from constructs import Construct


class RestWithCdkPythonStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

## Defining lambda resource
        update_weather_lambda = _lambda.Function(self,"UpdateWeatherLambdaFunction",
                                         runtime=_lambda.Runtime.PYTHON_3_8,
                                         handler='update_weather.lambda_handler',
                                         code=_lambda.Code.from_asset('src'),
                                         environment={ 
                                            'TABLE_NAME': table.table_name
                                         })
    table.grant_read_write_data(update_weather_lambda);
```

This code creates a Lambda function with the `Python 3.8 runtime`, using a handler function named `update_weather.handler`. The environment property is set with the name of the DynamoDB table and the primary key field name. Finally, the `grant_write_data` method is called to grant the function permissions to write data to the DynamoDB table.