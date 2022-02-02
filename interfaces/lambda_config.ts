import { EnvVarConfig } from "./env_var_config";

export interface info {
    Path: string;  
    File: string;
    Name: string;
    Service: string;
    env: EnvVarConfig[];
}
  
export interface LambdaConfig {
    items: info[];
}
  