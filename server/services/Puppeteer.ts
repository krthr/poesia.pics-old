import { Browser, launch } from "puppeteer";

let browser: Browser;

export async function Puppeteer() {
  return browser || launch({ headless: false });
}
