const { defineConfig } = require('cypress')

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'https://api-challenge.primecontrol.com.br', // Base URL para requisições

  },
};


