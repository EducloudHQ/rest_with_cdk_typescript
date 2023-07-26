Here, we'll create a Lambda function that will list all items in the DynamoDB table. You can create the function using the AWS Management Console, AWS CLI, or the AWS SDK. 


```py
from aws_cdk import Stack
from aws_cdk import aws_lambda as _lambda
from constructs import Construct


class RestWithCdkPythonStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

## Defining lambda resource
        list_weather_lambda = _lambda.Function(self,"ListWeatherLambdaFunction",
                                         runtime=_lambda.Runtime.PYTHON_3_8,
                                         handler='list_weather.lambda_handler',
                                         code=_lambda.Code.from_asset('src'),
                                         environment={ 
                                            'TABLE_NAME': table.table_name
                                         })
    table.grant_read_data(list_weather_lambda);
```

This code creates a Lambda function with the `Python 3.8 runtime`, using a handler function named `list_weather.handler`. The code property is set to a directory named lambda, which contains the code for the Lambda function. The environment property is set with the name of the DynamoDB table and the primary key field name. Finally, the grant_read_data method is called to grant the function permissions to read data from the DynamoDB table.