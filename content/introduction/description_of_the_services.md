## AWS Lambda
[AWS Lambda](https://aws.amazon.com/lambda/)  is a serverless compute service that lets you run code without provisioning or managing servers, creating workload-aware cluster scaling logic, maintaining event integrations, or managing runtimes. With Lambda, you can run code for virtually any type of application or backend service - all with zero administration. Just upload your code as a ZIP file or container image, and Lambda automatically and precisely allocates compute execution power and runs your code based on the incoming request or event, for any scale of traffic. You can set up your code to automatically trigger from over 200 AWS services and SaaS applications or call it directly from any web or mobile app. You can write Lambda functions in your favorite language (Node.js, Python, Go, Java, Typescript and more) and use both serverless and container tools, such as AWS CDK or Docker CLI, to build, test, and deploy your functions.

### Overview of Building a Lambda Function

Building a Lambda function involves a few key steps:

1. Defining the function's code and dependencies
2. Creating an IAM role to give the function permissions to access AWS resources
3. Configuring any environment variables needed by the function
4. Deploying the function to AWS Lambda
5. Testing the function to ensure it works as expected

## Amazon API Gateway
[Amazon API Gateway](https://aws.amazon.com/api-gateway/)  is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale. APIs act as the "front door" for applications to access data, business logic, or functionality from your backend services. Using API Gateway, you can create RESTful APIs and WebSocket APIs that enable real-time two-way communication applications. API Gateway supports containerized and serverless workloads, as well as web applications.

API Gateway handles all the tasks involved in accepting and processing up to hundreds of thousands of concurrent API calls, including traffic management, CORS support, authorization and access control, throttling, monitoring, and API version management. API Gateway has no minimum fees or startup costs. You pay for the API calls you receive and the amount of data transferred out and, with the API Gateway tiered pricing model, you can reduce your cost as your API usage scales.

### Overview of Building an API Gateway

Building an API Gateway involves a few key steps:

1. Defining the API's resources and methods
2. Creating a Lambda function to handle requests
3. Integrating the Lambda function with the API Gateway
4. Deploying the API using the API Gateway console or AWS CDK

## Amazon DynamoDB
[Amazon DynamoDB](https://aws.amazon.com/dynamodb/)  is a key-value and document database that delivers single-digit millisecond performance at any scale. It's a fully managed, multi-region, multi-active, durable database with built-in security, backup and restore, and in-memory caching for internet-scale applications. DynamoDB can handle more than 10 trillion requests per day and can support peaks of more than 20 million requests per second.

### Overview of Building a DynamoDB

Building a DynamoDB involves a few key steps:

1. Designing the data model and determining the table schema
2. Creating the DynamoDB table with AWS Management Console, AWS CLI, or AWS SDK
3. Defining the access patterns and creating secondary indexes to support them
4. Configuring the table's read and write capacity
5. Creating and configuring table streams to capture changes to the table
6. Integrating the DynamoDB table with other AWS services or applications