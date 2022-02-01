import { VPCConfig } from '../interfaces/vpc_config';
import { CommonConfig } from '../interfaces/common_config';
import { readFileSync } from 'fs';
import merge from 'ts-deepmerge';


export class EnsureDrConfig {
    vpc: VPCConfig;
    private commonConfig: CommonConfig;
    envConfig: CommonConfig;
    constructor() {
        var commonConfigRaw = readFileSync(
            'config/jsons/dev_config.json',
            'utf-8'   
        );
        var envConfigRaw = readFileSync(
            `config/jsons/dev_config.json`,
            'utf-8'
        );
        this.commonConfig = JSON.parse(commonConfigRaw);
        this.envConfig = JSON.parse(envConfigRaw);
    }

    public getConfig(): CommonConfig {
        let config = merge(this.commonConfig, this.envConfig);
        config.vpc.cidr = config.vpc.cidr;
        config.vpc.name = config.vpc.name;
        return config;
    }
}