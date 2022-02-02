import * as cognito from '@aws-cdk/aws-cognito';
import * as cdk from '@aws-cdk/core';
import { create } from 'domain';
import { CommonConfig } from "../interfaces/common_config";

export class CognitoStack extends cdk.Stack {
    private config: CommonConfig;
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    };

    create(config: CommonConfig) {

        // 👇 User Pool
        const userPool = new cognito.UserPool(this, 'userpool', {
          userPoolName: 'my-user-pool',
          selfSignUpEnabled: true,
          signInAliases: {
            email: true,
          },
          autoVerify: {
            email: true,
          },
          standardAttributes: {
            givenName: {
              required: true,
              mutable: true,
            },
            familyName: {
              required: true,
              mutable: true,
            },
          },
          customAttributes: {
            country: new cognito.StringAttribute({mutable: true}),
            city: new cognito.StringAttribute({mutable: true}),
            isAdmin: new cognito.StringAttribute({mutable: true}),
          },
          passwordPolicy: {
            minLength: 6,
            requireLowercase: true,
            requireDigits: true,
            requireUppercase: false,
            requireSymbols: false,
          },
          accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
          removalPolicy: cdk.RemovalPolicy.RETAIN,
        });
    
        // 👇 User Pool Client attributes, ## i left all attributes to see options avalable
        const standardCognitoAttributes = {
          givenName: true,
          familyName: true,
          email: true,
          emailVerified: true,
          address: true,
          birthdate: true,
          gender: true,
          locale: true,
          middleName: true,
          fullname: true,
          nickname: true,
          phoneNumber: true,
          phoneNumberVerified: true,
          profilePicture: true,
          preferredUsername: true,
          profilePage: true,
          timezone: true,
          lastUpdateTime: true,
          website: true,
        };
    
        const clientReadAttributes = new cognito.ClientAttributes()
          .withStandardAttributes(standardCognitoAttributes)
          .withCustomAttributes(...['country', 'city', 'isAdmin']);
    
        const clientWriteAttributes = new cognito.ClientAttributes()
          .withStandardAttributes({
            ...standardCognitoAttributes,
            emailVerified: false,
            phoneNumberVerified: false,
          })
          .withCustomAttributes(...['country', 'city']);
    
        // // 👇 User Pool Client
        const userPoolClient = new cognito.UserPoolClient(this, 'userpool-client', {
          userPool, 
          authFlows: {
            adminUserPassword: true,
            custom: true,
            userSrp: true,
          },
          supportedIdentityProviders: [
            cognito.UserPoolClientIdentityProvider.COGNITO,
          ],
          readAttributes: clientReadAttributes,
          writeAttributes: clientWriteAttributes,
        });
    
        // 👇 Outputs
        new cdk.CfnOutput(this, 'userPoolId', {
          value: userPool.userPoolId,
        });
        new cdk.CfnOutput(this, 'userPoolClientId', {
          value: userPoolClient.userPoolClientId,
        });
        const client = userPool.addClient('Client', {
            oAuth: {
              flows: {
                implicitCodeGrant: true,
              },
              callbackUrls: [
                'https://endsure-de-test123.com/home',
                'https://endsure-de-test123.com/users',
              ],
            },
          });

        const domain = userPool.addDomain('CognitoDomain', {
            cognitoDomain: {
              domainPrefix: 'my-awesome-endsure-de-test123',
            },
        });
        const signInUrl = domain.signInUrl(client, {
            redirectUri: 'https://endsure-de-test123.com/home', // must be a URL configured under 'callbackUrls' with the client
        });
        new cdk.CfnOutput(this, 'signInUrl', {
            value: signInUrl,
          });
        //tried to add a saving of id's with NO success ill come back to it later 
        // config.cognito.userPollId = userPool.userPoolId || "not defined yet";
        // config.cognito.userPollClientId = userPoolClient.userPoolClientId || "not defined yet";
        // return config;
    }
}
