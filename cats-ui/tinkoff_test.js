Feature('Suite');

Scenario('Add cat test', async I => {
    I.amOnPage('/');
    name = I.catAddUI(); //вызываем метод создания кота (steps_file.js)
    try {
        I.catCheckAvailability(name); //вызываем метод проверки существует ли кот
        let url = await I.grabCurrentUrl();
        result = url.split('/'); //получаем id кота из URL
        I.sendDeleteRequest('/core/cats/' + result[4] + '/remove'); //удаляем кота через API
    } catch (err) {
        console.error(err)
    }

});


Scenario('Add image to cat', async I => {
    I.amOnPage('/');
    name = I.catAddUI(); //вызываем метод создания кота (steps_file.js)
    try {
        I.catCheckAvailability(name); //вызываем метод проверки существует ли кот
        let url = await I.grabCurrentUrl();
        result = url.split('/');
        I.catAddImage('/img/image.jpeg');//Загружаем файл в галерею к коту
        // I.sendDeleteRequest('/core/cats/' + result[4] + '/remove');  //удаляем кота через API
    } catch (err) {
        console.error(err)
    }
});

Data(['Тинькоша', 'Кот']).Scenario('Test dropdown result for specific cat', async (I, current) => {
    I.amOnPage('/');
    try {
        I.fillField('//div[@class="dropdown"]//input', current); //вводим имя в поле на главной
        I.waitForElement(`//div[@class='dropdown-content']/a[text()="${current}"]`); //проверяем, что имя есть в дропдауне (имя уже существует)
    } catch (err) {
        console.error(err)
    }
});


Scenario('Test add description to cat', async (I) => {
    I.amOnPage('/');
    name = I.catAddUI();  //вызываем метод создания кота (steps_file.js)
    try {
        I.catCheckAvailability(name); //вызываем метод проверки существует ли кот
        let url = await I.grabCurrentUrl();
        result = url.split('/');
        I.catAddDescription(result); //вызываем метод добавления описания
        I.sendDeleteRequest('/core/cats/' + result[4] + '/remove'); //удаляем кота через API
    } catch (err) {
        console.error(err)
    }
});