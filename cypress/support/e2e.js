afterEach(() => {
    // Captura uma screenshot ao final de cada teste
    cy.screenshot({ capture: 'viewport' })
  });


import './commands'
import 'cypress-plugin-api'
import 'cypress-mochawesome-reporter/register';
