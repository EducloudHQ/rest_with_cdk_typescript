## Create an API Gateway REST API

Create an API Gateway `REST API` to handle the API requests and forward them to the Lambda function. 

```py
from aws_cdk import Stack
from aws_cdk import aws_apigateway as _apigateway
from aws_cdk import aws_dynamodb as _dynamodb
from aws_cdk import aws_lambda as _lambda
from constructs import Construct


class RestWithCdkPythonStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
##  Api Gateway resource
        weather_api = _apigateway.RestApi(
            self,
            'weather_rest_api'
        )

## Route and method to trigger the creat_weather_lambda function
        weather_api.root.add_resource("weather").add_method(
            "GET",
            _apigateway.LambdaIntegration(
                handler=read_weather_lambda
            )
        )
```

This will create an API Gateway REST API with a single endpoint at `/weather` that accepts `GET` requests. 

The `LambdaProxyIntegration` method is used to `integrate` the Lambda function with the `API Gateway`.