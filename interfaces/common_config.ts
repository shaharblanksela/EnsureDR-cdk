import { CognitoConfig} from "./cognito_config";
import { GlobalConfig } from "./global_config";
export interface CommonConfig {
    global:GlobalConfig,
    cognito: CognitoConfig;
   
    
}