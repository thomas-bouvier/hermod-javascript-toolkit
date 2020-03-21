export declare type HermodConfig = {
    [key: string]: string;
};
/**
 * Configuration utilities.
 */
export declare const config: {
    /**
     * Get the configuration.
     */
    get(): HermodConfig;
    /**
     * Reads the configuration file located at `./config.ini`.
     */
    init(): HermodConfig;
};
