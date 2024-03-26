const { expect } = require("chai");
const { clickElement } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Ticket booking tests", () => {
    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto("https://qamid.tmweb.ru/client/index.php");
      });

    test("buy one ticket", async () => {
      await clickElement(page, "a:nth-child(2)");
      await clickElement(page, "div:nth-child(2) > ul > li:nth-child(3) > a");  
      await clickElement(page, "div.buying-scheme__wrapper > div:nth-child(3) > span:nth-child(3)");
      await clickElement(page, ".acceptin-button");
       
      const actual = await page.$eval("h2", link => link.textContent);
      expect(actual).to.contains('Вы выбрали билеты:');  
    });  

    test("buy two ticket", async () => {
      await clickElement(page, "a:nth-child(2)");
      await clickElement(page, "div:nth-child(2) > ul > li:nth-child(3) > a");  
      await clickElement(page, "div.buying-scheme__wrapper > div:nth-child(3) > span:nth-child(4)");
      await clickElement(page, "div.buying-scheme__wrapper > div:nth-child(3) > span:nth-child(5)");
      await clickElement(page, ".acceptin-button");
       
      const actual = await page.$eval("h2", link => link.textContent);
      expect(actual).to.contains('Вы выбрали билеты:');  
    });      
    
    test("try to buy a place that is occupied", async () => {
      await clickElement(page, "a:nth-child(2)");
      await clickElement(page, "div:nth-child(2) > ul > li:nth-child(3) > a");  
      await clickElement(page, "div.buying-scheme__wrapper > div:nth-child(5) > span:nth-child(6)");
      
      const actual = await page.$eval(".acceptin-button", link => link.getAttribute("disabled"));
      expect(actual).to.contains('true');

    });


});