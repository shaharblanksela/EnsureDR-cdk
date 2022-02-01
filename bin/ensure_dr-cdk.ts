#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { VpcStack } from "../lib/vpc-stack";
import { WAFStack } from "../lib/waf-stack";
import { CommonConfig } from "../interfaces/common_config";
import { EnsureDrConfig } from '../config/config';


const app = new cdk.App();
var config: CommonConfig = new EnsureDrConfig().getConfig();

//creation of VPC
const vpc = new VpcStack(app, config).create();

// creation of WAF 
for (let waf of config.waf.items) {
    new WAFStack(
      app,
      config,
      waf.ACLName,
      waf.IpSetName,
      waf.IpAddresses,
      waf.HostName,
    ).create();
}
  



