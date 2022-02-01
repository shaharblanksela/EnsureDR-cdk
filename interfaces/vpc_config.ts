export interface VPCConfig { 
    name: string;
    cidr: string;
    ciderMask: number;
    maxAzs: number;
    privateSubnets: number;
    publicSubnets: number;
    natGateways: number;   
}