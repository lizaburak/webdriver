const webdriver = require('selenium-webdriver');
const {By, until} = webdriver;
const { assert } = require('chai');

const capabilities = require("./capabilities.json");

const bstackURL = 'http://bsuser_qswnej:xsMrKvsNSzP7SsTw5D52@hub-cloud.browserstack.com/wd/hub';
const selectItemURL = 'https://znwr.ru/product/719-31-184/coat-mentor/';
const acceptCookiesLocator = `//*[@data-country-code='BY']`;
const addBagButtonId = 'product__add-cart-btn';
const addTextPopupLocator = `//*[@class='product__modal-cart-text-1']`;
const popupButtonCloseId = 'product__modal-cart-close';
const bagButtonLocator = `//a[@class='header__cart-btn']`;
const nameItemLocator = `//*[@class='checkout__cart-item-name']/a[text()='Mentor']`;
const priceItemLocator= `//*[@class='checkout__cart-item-final-price']/span[contains(text(),'750')]`;

describe("Adding item to the bag test", () => {

    it("Should add item to the bag", async function() {
        let driver = new webdriver.Builder()
        .usingServer(bstackURL)
        .withCapabilities({
          ...capabilities,
          ...capabilities['browser'] && { browserName: capabilities['browser']}
        })
        .build();
        await driver.manage().window().maximize();

        await driver.get(selectItemURL);

        await driver.findElement(By.xpath(acceptCookiesLocator)).click();

        await driver.wait(until.elementLocated(By.id(addBagButtonId)), 3000);
        await driver.findElement(By.id(addBagButtonId)).click();

        await driver.wait(until.elementLocated(By.xpath(addTextPopupLocator)), 3000);
        let textPopup = await driver.findElement(By.xpath(addTextPopupLocator));

        await driver.wait(until.elementLocated(By.id(popupButtonCloseId)), 3000);
        await driver.findElement(By.id(popupButtonCloseId)).click();

        await driver.wait(until.elementLocated(By.xpath(bagButtonLocator)), 3000);
        await driver.findElement(By.xpath(bagButtonLocator)).click();

        await driver.wait(until.elementLocated(By.xpath(nameItemLocator)), 3000);
        let nameItem = await driver.findElement(By.xpath(nameItemLocator));

        await driver.wait(until.elementLocated(By.xpath(priceItemLocator)), 3000);
        let priceItem = await driver.findElement(By.xpath(priceItemLocator));

        await driver.quit();

        assert(textPopup, 'Товар добавлен в корзину');
        assert(nameItem, 'Пальто Mentor');
        assert(priceItem,'750');
    }).timeout(60000);
});
