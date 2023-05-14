import { Browser, launch } from 'puppeteer'
import Logger from '@ioc:Adonis/Core/Logger'

let browser: Browser | undefined

async function getPage() {
  if (!browser) {
    Logger.info('opening browser')
    browser = await launch({
      executablePath: process.env.CHROME_BIN,
      args: ['--disable-gpu'],
    })
  }

  Logger.info('opening new page')

  const page = await browser.newPage()
  return page
}

export async function getScreenshot(html: string) {
  const page = await getPage()

  try {
    await page.setViewport({ width: 500, height: 800 })
    await page.setContent(html)
  } catch (error) {
    Logger.error(error)

    await page.close()
    return undefined
  }

  try {
    Logger.info('taking screenshot')

    await page.evaluate(() => {
      document.querySelector('#poem')?.classList.add('p-3')
      document.querySelector('#topbar')?.remove()
    })

    const poem = await page.$('#poem')
    const file = await poem?.screenshot({ type: 'png' })
    // await page.close()

    return file
  } catch (error) {
    Logger.error(error)

    await page.close()
    return undefined
  }
}
