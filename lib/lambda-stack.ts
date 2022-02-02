import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import * as path from 'path';
import { Asset } from 'aws-cdk-lib/aws-s3-assets';
import { CommonConfig } from '../interfaces/common_config';
import { LambdaConfig, info } from '../interfaces/lambda_config';

export class LambdaStack extends cdk.Stack {
  private config: CommonConfig;
  private configItem : info;
  private Path: string;  
  private File: string;
  private Name: string;
  private Service: string;
  // constructor(scope: cdk.App, config: CommonConfig, configItem : info, props?: cdk.StackProps) {
  //   super(scope, `${configItem.Name}-${config.global.envIdentifier}`, props);
  //   this.config = config;
  //   this.configItem = configItem
  //   this.Path = configItem.Path;
  //   this.File = configItem.File;
  //   this.Name = configItem.Name;
  //   this.Service = configItem.Service;

  // }
  constructor(scope: cdk.App, config: CommonConfig, props?: cdk.StackProps) { // return configitems after testing and items moved to json
    super(scope, `lambda-${config.global.envIdentifier}`, props);
    this.config = config;
    // this.configItem = configItem
    // this.Path = configItem.Path;
    // this.File = configItem.File;
    // this.Name = configItem.Name;
    // this.Service = configItem.Service;

  }

  create(){ //need to move values to json after testing
    
    const lambdaFunction = new lambda.Function(this, 'lambda-function', {
      runtime: lambda.Runtime.NODEJS_14_X,
      timeout: cdk.Duration.seconds(5),
      handler: 'index.main',
      code: lambda.AssetCode.fromAsset(path.join(__dirname, '/../src/my-lambda')),
      environment: {
        REGION: cdk.Stack.of(this).region,
        AVAILABILITY_ZONES: JSON.stringify(
          cdk.Stack.of(this).availabilityZones,
        ),
      },
    });
  }
    
  //   // 👇 create a policy statement
  //   const listBucketsPolicy = new iam.PolicyStatement({
  //     effect: iam.Effect.ALLOW,
  //     actions: ['s3:ListAllMyBuckets'],
  //     resources: ['arn:aws:s3:::*'],
  //   });

  //   // 👇 attach the policy to the function's role
  //   lambdaFunction.role?.attachInlinePolicy(
  //     new iam.Policy(this, 'list-buckets', {
  //       statements: [listBucketsPolicy],
  //     }),
  //   );
  // }
}