// in this file you can append custom step methods to 'I' object

module.exports = function () {
  return actor({

    catAddUI: function (name) {
      this.click({ xpath: "//a[@href='/cats/add']" });
      this.fillField({ xpath: "//div[contains(@class, 'control is-expanded')]/input" }, name);
      this.click({ xpath: "//input[@name='gender-0']" });
      this.click({ xpath: "//button[@class='button is-warning']" });
      // Define custom steps here, use 'this' to access default methods of I.
      // It is recommended to place a general 'login' function here.

    },
    catAddImage: function () {

      this.attachFile("form input[type='file']", 'image1.png');
      this.wait(10000);
    }
  });
}