import { GlobalConfig } from "./global_config";
import { LambdaConfig } from "./lambda_config";
export interface CommonConfig {
    global:GlobalConfig,
    lambda: LambdaConfig;
}