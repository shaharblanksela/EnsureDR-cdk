#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from "@aws-cdk/core";
// import * as cdk from 'aws-cdk-lib';
import { CommonConfig } from "../interfaces/common_config";
import { EnsureDrConfig } from '../config/config';
import { LambdaStack } from "../lib/lambda-stack";




const app = new cdk.App();

var config: CommonConfig = new EnsureDrConfig().getConfig();
const env = {
  region: config.global.region,
  account: config.global.account,
};

var lambda = new LambdaStack(
    app,
    config
  ).create();
    
  





