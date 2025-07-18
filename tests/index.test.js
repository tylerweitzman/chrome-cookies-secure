const chrome = require('../index')
const joi = require('joi')
const os = require('os')
const { jarCookie, puppeteerCookie } = require('./schemas/cookies.schemas')

// These tests are not part of a CI / CD
// To run locally, they assumes you have some cookies for google.com

const url = 'https://www.google.com'

const isMacOS = process.platform === 'darwin'
const isLinux = process.platform === 'linux'
const isWindows = process.platform === 'win32'

it('Should get basic cookies from the defined url', async () => {
    const cookies = await chrome.getCookiesPromised(url)
    await joi.validate(cookies, joi.object().required());
})

it('Should get curl cookies from the defined url', async () => {
    const cookies = await chrome.getCookiesPromised(url, 'curl')
    await joi.validate(cookies, joi.string().required());
})

it('Should get jar cookies from the defined url', async () => {
    const cookies = await chrome.getCookiesPromised(url, 'jar')
    await joi.validate(cookies, jarCookie);
})

it('Should get set-cookie cookies from the defined url', async () => {
    const cookies = await chrome.getCookiesPromised(url, 'set-cookie')
    await joi.validate(cookies, joi.array().items(joi.string()).required());
})

it('Should get header cookies from the defined url', async () => {
    const cookies = await chrome.getCookiesPromised(url, 'header')
    await joi.validate(cookies, joi.string().required());
})

it('Should get object cookies from the defined url', async () => {
    const cookies = await chrome.getCookiesPromised(url, 'object')
    await joi.validate(cookies, joi.object().required());
})

it('Should get puppeteer cookies for the default profile in puppeteer format', async () => {
    const cookies = await chrome.getCookiesPromised(url, 'puppeteer')
    await joi.validate(cookies, puppeteerCookie);
})

// Only passes if you alter the customProfile for your local machine
it('Should get puppeteer cookies for a custom profile in puppeteer format', async () => {
    const customProfile = 'Default';
    const cookies = await chrome.getCookiesPromised(url, 'puppeteer', customProfile)
    await joi.validate(cookies, puppeteerCookie);
})

// Only passes if you are on macOS
it('Should get puppeteer cookies for a path with /Cookies on macOS in puppeteer format', async function () {
    if (!isMacOS) {
        this.skip();
    }

    const customPath = `${process.env.HOME}/Library/Application Support/Google/Chrome/Default/Cookies`;
    const cookies = await chrome.getCookiesPromised(url, 'puppeteer', customPath)
    await joi.validate(cookies, puppeteerCookie);
})

it('Should get puppeteer cookies for a path without /Cookies on macOS in puppeteer format', async function () {
    if (!isMacOS) {
        this.skip();
    }

    const customPath = `${process.env.HOME}/Library/Application Support/Google/Chrome/Default`;
    const cookies = await chrome.getCookiesPromised(url, 'puppeteer', customPath)
    await joi.validate(cookies, puppeteerCookie);
})

// Only passes if you are on windows
it('Should get puppeteer cookies for a path on Windows in puppeteer format', async function ()  {
    if (!isWindows) {
        this.skip();
    }   
     
    const WINDOWS_PREFIX = os.homedir();
    const customPath = `${WINDOWS_PREFIX}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Network\\Cookies`;
    const cookies = await chrome.getCookiesPromised(url, 'puppeteer', customPath)
    await joi.validate(cookies, puppeteerCookie);
})

it('Should get puppeteer cookies for a path on Windows in puppeteer format', async function ()  {
    if (!isWindows) {
        this.skip();
    }   
    const WINDOWS_PREFIX = os.homedir();
    const customPath = `${WINDOWS_PREFIX}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Network`;
    const cookies = await chrome.getCookiesPromised(url, 'puppeteer', customPath)
    await joi.validate(cookies, puppeteerCookie);
})

// Only passes if you are on linux & have Chromium installed
it('Should getpuppeteer cookies for a path on Linux in puppeteer format', async function () {
    if (!isLinux) {
        this.skip();
    }   
    const customPath = `${process.env.HOME}/.config/chromium/Default/Cookies`;
    const cookies = await chrome.getCookiesPromised(url, 'puppeteer', customPath)
    await joi.validate(cookies, puppeteerCookie);
})

// Edge browser tests
it('Should get basic cookies from Edge browser', async function () {
    try {
        const cookies = await chrome.getCookiesPromised(url, 'object', 'Default', 'edge')
        await joi.validate(cookies, joi.object());
    } catch (err) {
        // Skip test if Edge is not installed or has no cookies
        if (err.message.includes('not found') || err.message.includes('SQLITE_CANTOPEN')) {
            this.skip();
        } else {
            throw err;
        }
    }
})

it('Should get Edge cookies in puppeteer format', async function () {
    try {
        const cookies = await chrome.getCookiesPromised(url, 'puppeteer', 'Default', 'edge')
        await joi.validate(cookies, puppeteerCookie);
    } catch (err) {
        // Skip test if Edge is not installed or has no cookies
        if (err.message.includes('not found') || err.message.includes('SQLITE_CANTOPEN')) {
            this.skip();
        } else {
            throw err;
        }
    }
})

// Only passes if you are on Windows and have Edge installed
it('Should get puppeteer cookies for Edge path on Windows', async function () {
    if (!isWindows) {
        this.skip();
    }
    
    try {
        const WINDOWS_PREFIX = os.homedir();
        const customPath = `${WINDOWS_PREFIX}\\AppData\\Local\\Microsoft\\Edge\\User Data\\Default\\Network\\Cookies`;
        const cookies = await chrome.getCookiesPromised(url, 'puppeteer', customPath)
        await joi.validate(cookies, puppeteerCookie);
    } catch (err) {
        // Skip test if Edge is not installed or path doesn't exist
        if (err.message.includes('not found') || err.message.includes('SQLITE_CANTOPEN')) {
            this.skip();
        } else {
            throw err;
        }
    }
})

// Only passes if you are on macOS and have Edge installed
it('Should get puppeteer cookies for Edge path on macOS', async function () {
    if (!isMacOS) {
        this.skip();
    }
    
    try {
        const customPath = `${process.env.HOME}/Library/Application Support/Microsoft Edge/Default/Cookies`;
        const cookies = await chrome.getCookiesPromised(url, 'puppeteer', customPath)
        await joi.validate(cookies, puppeteerCookie);
    } catch (err) {
        // Skip test if Edge is not installed or path doesn't exist
        if (err.message.includes('not found') || err.message.includes('SQLITE_CANTOPEN')) {
            this.skip();
        } else {
            throw err;
        }
    }
})
