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
    },
    baseUrl: 'https://api-challenge.primecontrol.com.br', // Base URL para requisições

  },
});