import { App, Stack, StackProps} from 'aws-cdk-lib';
import * as wafv2 from 'aws-cdk-lib/aws-wafv2';
import { CommonConfig } from '../interfaces/common_config';

export class WAFStack extends Stack {
   private config: CommonConfig;
   private ACLName: string;
   private  IpSetName: string;
   private IpAddresses: string [];
   private HostName: string;
   constructor(scope: App, config: CommonConfig, ACLName: string, IpSetName: string, IpAddresses: string [], HostName: string, props?: StackProps) {
      super(scope, `waf-${ACLName}-dev`, props);
      this.config = config;
      this.ACLName = ACLName;
      this.IpSetName = IpSetName;
      this.IpAddresses = IpAddresses;
      this.HostName = HostName;
   }

   create() {
      const ipset = new wafv2.CfnIPSet(this,`${this.IpSetName}-ipset`,
      {
         addresses: this.IpAddresses,
         ipAddressVersion: 'IPV4',
         scope: 'REGIONAL',
         name: `${this.IpSetName}`
      })

      var rules: wafv2.CfnRuleGroup.RuleProperty = {
         name: `${this.ACLName}-rule`,
         priority: 0,
         statement: {
            andStatement: {
               statements: [
                  {
                     ipSetReferenceStatement: {
                        arn: ipset.attrArn
                     }
                  },
                  {
                     byteMatchStatement: {
                        searchString: this.HostName,
                        fieldToMatch: {
                           singleHeader: {
                              name: "host"
                           }
                        },
                        textTransformations: [
                           {
                              priority: 0,
                              type: "NONE"
                           }
                        ],
                        positionalConstraint: "STARTS_WITH"
                     }
                  }
            ]
            }
         },
         action: { allow: {} },
         visibilityConfig: {
            cloudWatchMetricsEnabled: true,
            metricName: `${this.ACLName}-rule`,
            sampledRequestsEnabled: true
         }
      }
      const waf = new wafv2.CfnWebACL(this,`acl-${this.ACLName}`,
      {
         name: `${this.ACLName}`,
         defaultAction: { block: {} },
         scope: "REGIONAL",
         visibilityConfig: {
            cloudWatchMetricsEnabled: true,
            metricName: `${this.ACLName}`,
            sampledRequestsEnabled: true
         },
      })
      waf.rules = [rules]
   }
}
