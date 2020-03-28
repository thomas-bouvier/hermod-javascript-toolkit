/* eslint-disable no-console */

import path from 'path'
import webpack from 'webpack'
import chalk from 'chalk'

const defaultEntry = path.join(process.cwd(), 'src', 'index')
const defaultOutput = path.join(process.cwd(), 'dist')

export async function dev ({ entry = defaultEntry, output = defaultOutput, configPath, sandbox }) {
    console.log(chalk.bold('> Running in dev mode…\n'))

    const webpackConfig = require('../../config/webpack.dev.js')({
        entry,
        output,
        configPath,
        sandbox
    })

    return new Promise((resolve, reject) => {
        webpack(webpackConfig, (err, stats) => {
            if (err) {
                console.error(chalk.red(err.stack || err.toString()))
                if (err['details']) {
                  console.error(chalk.red(err['details']))
                }
                reject(err)
            }

            console.log(stats.toString({
                chunks: false,
                colors: true
            }) + '\n')

            resolve()
        })
    })
    .then(() => console.log(chalk.bold.green('\n> Dev mode started!')))
    .catch(error => error && error.message && console.error(chalk.bold.red('\n> Dev mode failed…\n\n', error)))
}
