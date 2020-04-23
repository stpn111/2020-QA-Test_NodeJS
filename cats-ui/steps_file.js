// in this file you can append custom step methods to 'I' object

module.exports = function () {
  return actor({

    catAddUI: function () {
      name = this.catRandomName();
      this.click({ xpath: "//a[@href='/cats/add']" });
      this.fillField({ xpath: "//div[contains(@class, 'control is-expanded')]/input" }, name);
      this.click({ xpath: "//input[@name='gender-0']" });
      this.click({ xpath: "//button[@class='button is-warning']" });
      return name;
    },
    catCheckAvailability: function (name) {
      this.fillField('//div[@class="dropdown"]//input', name); //вводим имя в поле на главной
      this.click('//button[contains(@class, "main")]'); //жмем кнопку поиска
      this.click(`//span/a[text()="${name}"]`); //жмем на кнопку с нужным именем кота
      this.waitForElement('//div[contains(@class,"photos_photo")]'); //проверяем, что есть поле "Добавить фото -> кот реально создался
    },
    catAddImage: function (path) {
      this.attachFile("form input[type='file']", path);
    },
    catRandomName: function () {
      var result = '';
      var characters = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
      var charactersLength = 35; //35 - лимит символов, на сколько я помню
      for (var i = 0; i < 35; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      result = result[0].toUpperCase() + result.slice(1); //приводим к Большой букве в начале
      return result;
      ;
    },
    catAddDescription: function (url) {
      this.amOnPage('https://cats.bobrovartem.ru/cats/' + url[4] + '/edit'); //переходим на страницу редактирования описания
      this.fillField("//textarea[@name='textControl']", 'Test description 12313') //добавляем описание в соотв. поле
      this.click("//button[@class='button is-success is-outlined']");
      this.waitForElement("//div[text()='Test description 12313']") //проверяем, что описание есть на странице
    }
  });
}