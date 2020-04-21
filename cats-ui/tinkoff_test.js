Feature('Suite');

Scenario('Add image to cat', I => {
    I.amOnPage('/');
    name = 'Тестыыыыыыыыыыыыы'; //задаем имя коту
    // I.catAddUI(name); //вызываем метод создания кота (steps_file.js)
    try {
        I.fillField('//div[@class="dropdown"]//input', name); //вводим имя в поле на главной
        I.click('//button[contains(@class, "main")]'); //жмем кнопку поиска
        I.click(`//a[text()="${name}"]`); //жмем на кнопку с нужным именем кота
        I.see('Добавить фото');
        result = I.attachFile("form input[type='file']", 'image1.png');
        I.wait(10000);
        // I.sendDeleteRequest('/core/cats/' + result[4] + '/remove');
    } catch (err) {
        console.error(err)
    }
});

Scenario('Add cat test', I => {
    I.amOnPage('/');
    name = 'Тестовыйкотэйй'; //задаем имя коту; учитывая невозможность ввода цифр, как задать уникальность - неясно, поэтому если тест отвалится до удаления кота, то кот останется в базе<div className=""></div>
    I.catAddUI(name);
    try {
        (async () => {
            I.fillField('//div[@class="dropdown"]//input', name); //вводим имя в поле на главной
            I.click('//button[contains(@class, "main")]'); //жмем кнопку поиска
            I.click(`//a[text()="${name}"]`); //жмем на кнопку с нужным именем кота
            await I.waitForElement('//div[contains(@class,"photos_photo")]'); //проверяем, что есть поле "Добавить фото -> кот реально создался
            let url = await I.grabCurrentUrl();
            result = url.split('/');
            I.sendDeleteRequest('/core/cats/' + result[4] + '/remove');
            console.log("All is OK");
        })()
    } catch (err) {
        console.error(err)
    }

});


//for history

// Data(['Саша', 'Аня']).Scenario('First test', (I, current) => {
//     // I.click('//a[@href="/all-names"]/span[text()="Все имена"]');
//     // I.waitForText('Ёлка'); I.waitForElement('[value="female"]:checked');
//     // I.click(); }); Scenario('First test', 
//     // I => { I.click('//a[@href="/all-names"]/span[text()="Все имена"]'); I.waitForText('Ёлка'); 
//     // I.waitForElement('[value="female"]:checked'); 
//     // I.click()
//     I.amOnPage('/');
//     I.fillField('Введите часть имени', current);
//     I.waitForElement(`//input[@value="${current}"]`); // I.waitForText('Ёлка'); });
// });


// Data(['Саша', 'Аня']).Scenario('First test', (I, current) => {
//     // I.click('//a[@href="/all-names"]/span[text()="Все имена"]');
//     // I.waitForText('Ёлка'); I.waitForElement('[value="female"]:checked');
//     // I.click(); }); Scenario('First test', 
//     // I => { I.click('//a[@href="/all-names"]/span[text()="Все имена"]'); I.waitForText('Ёлка'); 
//     // I.waitForElement('[value="female"]:checked'); 
//     // I.click()
//     I.amOnPage('/');
//     I.fillField('Введите часть имени', current);
//     I.waitForElement(`//input[@value="${current}"]`); // I.waitForText('Ёлка'); });
// });