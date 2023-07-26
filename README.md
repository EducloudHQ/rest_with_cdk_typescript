```
Content
    overview
    |- 1.introduction
        |- 1.1.intended_audience.md
        |- 1.2.what_is_the_aws_cloud_development_kit.md
        |- 1.3.description_of_the_services.md
    |- 2.prerequisite
        |-2.1.create_an_aws_account.md
        |-2.2.download_postman.md
        |-2.3.install_the_aws_cli.md
        |-2.4.install_the_cdk.md
    |- 3.setup
        |-3.1.initialize_project.md
    |- 4.the_cdk
        |-4.1.the_cdk_building_block_concept.md
    |- 5.create    
        |-5.1.overview.md  
        |-5.2.create_dynamodb_table.md  
        |-5.3.create_a_lambda_function.md 
        |-5.4.create_lambda_handler.md
        |-5.5.create_an_api_gateway.md 
        |-5.6.test.md      
        |-5.7.conclusion.md   
    |- 6.read
        |-6.1.overview.md   
        |-6.2.create_a_lambda_function.md 
        |-6.3.create_lambda_handler.md
        |-6.4.create_an_api_gateway.md 
        |-6.5.test.md      
        |-6.6.conclusion.md   
    |- 7.delete
        |-7.1.overview.md   
        |-7.2.create_lambda_function.md 
        |-7.3.create_lambda_handler.md
        |-7.4.create_api_gateway.md 
        |-7.5.test.md      
        |-7.6.conclusion.md     
    |- 8.update
        |-8.1.overview.md   
        |-8.2.create_lambda_function.md 
        |-8.3.create_lambda_handler.md
        |-8.4.create_api_gateway.md 
        |-8.5.test.md      
        |-8.6.conclusion.md   
    |- 9.list
        |-9.1.overview.md  
        |-9.2.create_lambda_function.md 
        |-9.3.create_lambda_handler.md
        |-9.4.create_api_gateway.md 
        |-9.5.test.md      
        |-9.6.conclusion.md   
    |- 10.deploy_the_full_project
        |-11.1.deploy.md
    |- 11.testing_the_full_project
        |-12.1.testing_create_weather_endpoint.md 
        |-12.1.testing_get_weather_endpoint.md 
        |-12.1.testing_update_weather_endpoint.md 
        |-12.1.testing_delete_weather_endpoint.md 
        |-12.1.testing_list_weathers_endpoint.md 
    |- 12.conclusion
        |-conclusion.md    
```


# Welcome to your CDK TypeScript project

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`RestWithCdkTypescriptStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
