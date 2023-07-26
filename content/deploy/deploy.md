# Deploying our Rest API.

## Step 1: Package Your Application

Before you can deploy your CDK application, you need to package it for deployment. To package your application, run the following command:

```
cdk synth
```

This will generate a CloudFormation template for your application in the `cdk.out` directory.
## Step 2: Bootstrap your application

The process of provisioning resources for the AWS CDK before you can deploy AWS CDK apps into an AWS environment.

```
cdk bootstrap
```

![alt text](/assets/cdk_b.png)
## Step 3: Deploy Your Application

Once you have packaged your application, you can deploy it to AWS. To deploy your application, run the following command:

```
cdk deploy
```

This will deploy your application to AWS.

![alt text](/assets/cdk_d1.png)

![alt text](/assets/cdk_d2.png)


## Step 4: View Your Deployed Application

Once your application is deployed, you can view it in the AWS Management Console. To view your application, follow these steps:

1. Navigate to the AWS CloudFormation console.
2. Select the stack that you just created.
3. Click on the "Outputs" tab to view the outputs of your stack.

You should see the outputs of your stack, including any URLs or other resources that were created.