import { App, Stack, StackProps, Tags } from 'aws-cdk-lib';
import {
  Vpc,
  SubnetConfiguration,
  SubnetType,
  GatewayVpcEndpointAwsService,
  SecurityGroup,
  Port,
  Peer,
} from 'aws-cdk-lib/aws-ec2'
import { CommonConfig } from "../interfaces/common_config";


export class VpcStack extends Stack {
    vpc: Vpc;
    sg: SecurityGroup;
    private config: CommonConfig;
    constructor(scope: App, config: CommonConfig, props?: StackProps) {
        super(scope, config.vpc.name, props);
        this.config = config;
    }

    public create(): Vpc {
        this.vpc = new Vpc(this, this.config.vpc.name, {
            cidr: this.config.vpc.cidr,
            maxAzs: this.config.vpc.maxAzs,
            natGateways: this.config.vpc.natGateways,
            subnetConfiguration: this.createSubnets(),
        });
        this.sg = this.createSecurityGroup(this.vpc);
        this.vpc.addGatewayEndpoint("s3-vpc-endpoint", {
            service: GatewayVpcEndpointAwsService.S3,
            subnets: [
              this.vpc.selectSubnets({
                subnetType: SubnetType.PRIVATE,
              }),
            ],
        });
        return this.vpc;
    }

    private createSubnets(): SubnetConfiguration[] {
        let subnets: SubnetConfiguration[] = [];
        subnets.push({
            cidrMask: this.config.vpc.ciderMask,
            name: `EnsureDR-Private-Subnet-1`,
            subnetType: SubnetType.PRIVATE,
          });
          subnets.push({
            cidrMask: this.config.vpc.ciderMask,
            name: `EnsureDR-public-Subnet-1`,
            subnetType: SubnetType.PUBLIC,
          });
        return subnets;
    }

    private createSecurityGroup(vpc: Vpc): SecurityGroup {
        let sg = new SecurityGroup(this, "SecurityGroup", {
            vpc: vpc,
            description: "bla-bla",
            allowAllOutbound: true, // Can be set to false
        });
        Tags.of(sg).add("name", "ensuredr-sg");
        // sg.addIngressRule(Peer.anyIpv4(), Port.allTraffic());
        // sg.connections.allowFrom(sg, Port.allTraffic());    
        return sg;
    }
}