#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { VpcStack } from "../lib/vpc-stack";
import { CommonConfig } from "../interfaces/common_config";
import { EnsureDrConfig } from '../config/config';


const app = new cdk.App();
var config: CommonConfig = new EnsureDrConfig().getConfig();

const vpc = new VpcStack(app, config).create();




