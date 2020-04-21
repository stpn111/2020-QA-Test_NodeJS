const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './*_test.js', // glob pattern
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'https://cats.bobrovartem.ru/',
      show: true, //headless режим
      windowSize: '1200x900'
    },
    REST: {
      endpoint: 'https://cats.bobrovartem.ru/api',
    }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'cats-ui',

  plugins: {
    retryFailedStep: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    },
    allure: {
      enabled: true
    }
  }
}