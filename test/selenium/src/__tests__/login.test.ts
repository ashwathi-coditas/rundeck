import {Context} from 'context'
import {CreateContext} from 'test/selenium'
import {LoginPage} from 'pages/login.page'
import {NavigationPage} from 'pages/navigation.page'

import {sleep} from 'async/util';
import 'test/rundeck'

// We will initialize and cleanup in the before/after methods
let ctx: Context
let loginPage: LoginPage
let navigation: NavigationPage

beforeAll( async () => {
    ctx = await CreateContext()
    loginPage = new LoginPage(ctx)
    navigation = new NavigationPage(ctx)
})

beforeEach( async () => {
    ctx.currentTestName = expect.getState().currentTestName
})

beforeEach( async () => {
    console.log(ctx.friendlyTestName())
})

/**
 * Ensure driver is cleaned up.
 */
afterAll( async () => {
    await ctx.dispose()
})

it('Logs in through the GUI', async () => {
    await loginPage.get()
    await loginPage.login('admin', 'admin')
    // await navigation.toggleSidebarExpand()
    const img = Buffer.from((await navigation.screenshot()), 'base64')
})
