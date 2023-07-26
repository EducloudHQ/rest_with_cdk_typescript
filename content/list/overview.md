## Create an API to Insert Items into DynamoDB with CDK Typescript

This guide will walk you through the process of creating an API to insert items into DynamoDB using the AWS Cloud Development Kit (CDK) with Typescript.

## Prerequisites

Before you begin, make sure you have the following:

- An AWS account
- AWS CLI installed and configured
- NodeJs and npm installed
- Basic knowledge of Typescript and AWS CDK

## Libraries used

The following AWS libraries are utilized:

- `aws-cdk`: This library is used to create and deploy AWS infrastructure as code using the AWS Cloud Development Kit (CDK).
- `aws-cdk-lib`: Library used to import CDK constucts needed in the project
- `aws-cdk-lib/aws-dynamodb`: This library is used to create a DynamoDB table to store the data.
- `aws-cdk-lib/aws-lambda`: This library is used to create a Lambda function to handle the API requests and insert the data into the DynamoDB table.
- `aws-cdk-lib/aws-apigateway`: This library is used to create an API Gateway REST API to handle the API requests and forward them to the Lambda function.
- `APIGatewayProxyEvent`: This is an event object that is passed to an AWS Lambda function by Amazon API Gateway. It contains information about the HTTP request that triggered the function, including the request method, path, headers, and body.
to access all aws resources.
- `Math.random`: This library is used to generate unique random numbers that are used to uniquely identify weather items.

Other technologies used in the process include:

- NodeJs and npm: These are used to write and manage the CDK code.
- AWS CLI: This tool is used to interact with AWS services from the command line.
- AWS account: An AWS account is required to create and deploy the infrastructure.

The process consists of four steps:

1. Create a DynamoDB table to store the data.
2. Create a Lambda function to handle the API requests and insert the data into the DynamoDB table.
3. Create an API Gateway REST API to handle the API requests and forward them to the Lambda function.
4. Create a lambda handler to perform our logic.
5. Test the API by sending POST requests to the API endpoint.