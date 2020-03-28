import path from 'path'
import { run } from 'jest-cli'

const configLocation = path.join(__dirname, '../../jest.config.js')

export function test (files: string | undefined, { target, sandbox }) {
    global['runnerTarget'] = target
    global['sandboxedRunner'] = !!sandbox

    run([
        `--config=${configLocation}`, '--maxWorkers=20'
    ], files)
}