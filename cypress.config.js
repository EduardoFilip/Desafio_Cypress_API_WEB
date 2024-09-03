const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: '',
    embeddedScreenshots: true,
    overwrite: false,
    inlineAssets: true,
    saveAllAttempts: false,
    reportFilename: "Report_de_testes"

  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      // Base URL de API e WEB
      config.env.baseUrlApi = 'https://api-challenge.primecontrol.com.br';
      config.env.baseUrlWeb = 'https://challenge.primecontrol.com.br';
      
      return config;
    },
    
    browser: 'chrome',
  },
});



  