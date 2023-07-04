#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { RestWithCdkTypescriptStack } from '../lib/rest_with_cdk_typescript-stack';

const app = new cdk.App();
new RestWithCdkTypescriptStack(app, 'RestWithCdkTypescriptStack');
