#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CommonConfig } from "../interfaces/common_config";
import { EnsureDrConfig } from '../config/config';
import { CognitoStack } from '../lib/cognito-stack';

const app = new cdk.App();
var config: CommonConfig = new EnsureDrConfig().getConfig();

new CognitoStack(app, 'cognito-starter-stack', {
    stackName: 'cognito-starter-stack',
    env: {
        region: process.env.CDK_DEFAULT_REGION,
        account: process.env.CDK_DEFAULT_ACCOUNT,
    }
}).create(config);




