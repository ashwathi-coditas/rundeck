import * as Url from 'url'

import {S3} from 'aws-sdk'

import {WebDriver} from 'selenium-webdriver'

export class Context {
    currentTestName!: string
    s3: S3
    uploadPromises: Promise<{}>[] = []

    constructor(readonly driver: WebDriver, readonly baseUrl: string, readonly isCI: boolean) {
        this.s3 = new S3({region: 'us-east-2'})
    }

    urlFor(path: string) {
        return Url.resolve(this.baseUrl, path)
    }

    friendlyTestName() {
        return this.currentTestName.toLowerCase().replace(/ /g, '_')
    }

    async screenshot() {
        return await this.driver.takeScreenshot()
    }

    async dispose() {
        await this.driver.close()
        await Promise.all(this.uploadPromises)
    }

    async screenSnap(name: string) {
        const snapFileName = `${this.friendlyTestName()}-${name}.png`
        const screen = await this.screenshot()
        await this.screenCapToS3(screen, snapFileName)
    }

    async screenCapToS3(screen: string, name: string) {
        this.uploadPromises.push(
            this.s3.putObject(
                {Bucket: 'ci.rundeck.org', Key: `projects/rundeck/selenium-images/${name}`, Body: Buffer.from(screen, 'base64'), ContentType: 'image/png'}
            ).promise()
        )
    }
}