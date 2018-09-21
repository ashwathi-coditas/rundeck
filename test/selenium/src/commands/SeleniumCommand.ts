import {Argv} from 'yargs'

import {spawn} from 'async/child-process'
import { Rundeck, PasswordCredentialProvider } from 'ts-rundeck';
import { ProjectImporter } from 'projectImporter';

interface Opts {
    url: string
    jest: string
    headless: boolean
}

class SeleniumCommand {
    command = "selenium"
    describe = "Run selenium test suite"

    builder(yargs: Argv) {
        return yargs
            .option("u", {
                alias: "url",
                default: `http://${process.env.HOSTNAME}:4440`,
                describe: "Rundeck URL"
            })
            .option("j", {
                alias: "jest",
                describe: "Jest args",
                type: 'string',
                default: ''
            })
            .option("s", {
                alias: "suite",
                describe: "Sub suite of selenium tests to run",
                type: 'array',
                choices: ['all', 'visual-regression']
            })
            .option("h", {
                alias: "headless",
                describe: "Run Chrome in headless mode",
                type: 'boolean',
                default: false
            })
    }

    async handler(opts: Opts) {
        const args = `./node_modules/.bin/jest ${opts.jest}`

        const client = new Rundeck(new PasswordCredentialProvider(opts.url, 'admin', 'admin'), opts.url)

        const importer = new ProjectImporter('./lib', 'SeleniumBasic', client)
        await importer.importProject()

        const ret = await spawn('/bin/sh', ['-c', args], {
            stdio: 'inherit',
            env: {
                ...process.env,
                RUNDECK_URL: opts.url,
                HEADLESS: opts.headless.toString()
            }})
        if (ret != 0)
            process.exitCode = 1
    }
}

module.exports = new SeleniumCommand()