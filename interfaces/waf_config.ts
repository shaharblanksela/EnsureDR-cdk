export interface info {
    IpSetName: string;
    IpAddresses: string [];
    ACLName: string;
    HostName: string;
}
  
export interface WAFConfig {
    items: info[];
}
