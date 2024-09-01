const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'https://api-challenge.primecontrol.com.br', // Base URL para requisições

  },
});


