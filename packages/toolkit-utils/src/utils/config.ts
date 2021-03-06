import fs from 'fs'
import path from 'path'
import ini from 'ini'
import { camelize } from '../utils/camelize'
import { logger } from '../utils/logger'
import { DEFAULT_LOCALE } from '../defaults'

export type HermodConfig = {[key: string]: string}

let _config: HermodConfig = {}
/**
 * Configuration utilities.
 */
export const config = {
    /**
     * Get the configuration.
     */
    get(): HermodConfig {
        return _config
    },
    /**
     * Reads the configuration file located at `./config.ini`.
     */
    init(): HermodConfig {
        try {
            // Get the config file.
            const configFilePath = path.join(process.cwd(), 'config.ini')
            const iniConfig = ini.parse(fs.readFileSync(configFilePath, 'utf8'))
            // Assume that the file keys are in snake case, and camelize them.
            for (let section in iniConfig) {
                _config = {
                    ..._config,
                    ...camelize.camelizeKeys(iniConfig[section])
                }
            }
            // When in dev mode, add mocks.
            if (global['__DEV__']) {
                const initialConfig = { ..._config }
                const mockedConfig = { ...global['HermodToolkit'].config }
                _config = global['HermodToolkit'].config
                Object.assign(_config, initialConfig, mockedConfig)
            }
            // If no locale is specified, add default locale.
            if (!_config.locale) {
                _config.locale = DEFAULT_LOCALE
            }
        } catch (error) {
            logger.error(error)
            throw new Error('config')
        }

        return _config
    }
}
