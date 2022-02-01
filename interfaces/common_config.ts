import { VPCConfig } from "./vpc_config";
import { WAFConfig } from "./waf_config";


export interface CommonConfig {
    vpc: VPCConfig;
    waf: WAFConfig;
}