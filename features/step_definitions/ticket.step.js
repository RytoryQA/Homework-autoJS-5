const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given('user is on page {string}', async function (string) {
  return await this.page.goto(`http://qamid.tmweb.ru/client${string}`, {
      setTimeout: 20000,
  });
});

When('user selects a date', { timeout: 20000 }, async function () {
  return clickElement(this.page, "a:nth-child(2)");
});

When('user selects a time', { timeout: 20000 }, async function () {
  return clickElement(this.page, "div:nth-child(2) > ul > li:nth-child(3) > a");
});

When('user selects a seat1', { timeout: 20000 }, async function () {
  return clickElement(this.page, "div.buying-scheme__wrapper > div:nth-child(3) > span:nth-child(3)");
 });

 When('user selects a seat2', { timeout: 20000 }, async function () {
  return clickElement(this.page, "div.buying-scheme__wrapper > div:nth-child(3) > span:nth-child(4)");
 });

 When('user click the register button', async function () {
  return clickElement(this.page, ".acceptin-button");
});

When('user click on the reserved seat', async function () {
  return clickElement(this.page, "div.buying-scheme__wrapper > div:nth-child(5) > span:nth-child(6)");
});

Then('user goes to the page {string}', async function (string) {
  const actual = await this.page.url();
  const expected = string;
  expect(actual).to.include(expected);
});

Then('user sees the register button disabled', async function () {
  const actual = await this.page.$eval(".acceptin-button", link => link.getAttribute("disabled"));
  expect(actual).contains('true');
});
