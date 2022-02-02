export interface EnvVarConfig{
    name: string;
    fromEnv?: boolean;
    value: string;
    prefix?: string;
    suffix?: string;
}

