import 'chromedriver'
import {Options} from 'selenium-webdriver/chrome'
import webdriver from 'selenium-webdriver'
import {toMatchImageSnapshot} from 'jest-image-snapshot'


import {Context} from 'context'

const opts = new Options()

jest.setTimeout(60000)

expect.extend({ toMatchImageSnapshot })

const envOpts = {
    RUNDECK_URL: process.env.RUNDECK_URL || 'http://127.0.0.1:4440'
}

export async function CreateContext() {
    opts.addArguments('window-size=1200,1000')

    if (process.env.CI)
        opts.addArguments('--headless')

    let driver = await new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(opts)
        .build()

    // await driver.manage().window().setRect({height: 1000, width: 1200})

    let ctx = new Context(driver, envOpts.RUNDECK_URL)
    return ctx
}
