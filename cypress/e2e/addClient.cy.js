describe('Testes API - Suíte de testes endpoint addCliente', () => {

/* Variáveis */

const endpointAddClient = '/addClient';


/* Cenários de testes */

it('CT001— Teste de adição bem-sucedida', () => {
  // DADO que possuo todos os dados para realizar um novo cadastro
  cy.bodyNewClient().then((novoCadastro) => {

    // QUANDO realizar uma requisição do tipo POST
    cy.api({
      method: 'POST',
      url: endpointAddClient,
      body: novoCadastro,
    }).then((response) => {

      // ENTÃO a API deve retornar 200
      expect(response.status).to.eq(200);
      // E apresentar a mensagem no body de "Cliente cadastrado com sucesso!"
      expect(response.body.message).to.eq('Cliente cadastrado com sucesso!');
      // E o ID do usuário retornado não pode ser vazio
      expect(response.body.id).to.not.be.empty;

    })

  })

})

it('CT002 — Teste de campos obrigatórios', () => {

      // DADO que não possuo o dado do "Nome" para realizar um novo cadastro
      cy.bodyNewClient().then((novoCadastro) => {

      delete novoCadastro.nome;

      // QUANDO realizar uma requisição do tipo POST
      cy.api({
        method: 'POST',
        url: endpointAddClient,
        body: novoCadastro,
        failOnStatusCode: false
      }).then((response) => {

      // ENTÃO a API deve retornar 400
      expect(response.status).to.eq(400);
      // E apresentar a mensagem no body de "Informe o nome"
      expect(response.body.message).to.eq('Informe o nome');

    })

  })

})


it('CT003 — Teste de validação do e-mail', () => {

  // DADO que não possuo um email válido para realizar um novo cadastro
  cy.bodyNewClient().then((novoCadastro) => {

  novoCadastro.email = 'testeErroEmail.com';
  novoCadastro.fotoPerfil = 'teste1234'

  // QUANDO realizar uma requisição do tipo POST
  cy.api({
    method: 'POST',
    url: endpointAddClient,
    body: novoCadastro,
    failOnStatusCode: false
  }).then((response) => {

  // ENTÃO a API deve retornar 400
  expect(response.status).to.eq(400);
  // E apresentar a mensagem no body de "E-mail em formato inválido."
  expect(response.body.message).to.eq('E-mail em formato inválido.');

    })

  })

})

it('CT004 — Teste de validação de URL do perfil', () => {

  // DADO que não possuo uma URL válida para realizar um novo cadastro
  cy.bodyNewClient().then((novoCadastro) => {

  novoCadastro.fotoPerfil = 'teste1234'

  // QUANDO realizar uma requisição do tipo POST
  cy.api({
    method: 'POST',
    url: endpointAddClient,
    body: novoCadastro,
    failOnStatusCode: false
  }).then((response) => {

  // ENTÃO a API deve retornar 400
  expect(response.status).to.eq(400);
  // E apresentar a mensagem no body de "URL incorreta."
  expect(response.body.message).to.eq('URL incorreta.');

    })

  })

})

it('CT005 — Teste de adição com ferramentas vazias - Issue #2', () => {

  // DADO que não possuo dados de ferramentas para realizar um novo cadastro
  cy.bodyNewClient().then((novoCadastro) => {

  delete novoCadastro.ferramentas;

  // QUANDO realizar uma requisição do tipo POST
  cy.api({
    method: 'POST',
    url: endpointAddClient,
    body: novoCadastro,
    failOnStatusCode: false
  }).then((response) => {

  // ENTÃO a API deve retornar 400
  expect(response.status).to.eq(400);
  // E apresentar a mensagem no body de "Informe ao menos uma ferramenta que você conhece dentre: Robot Framework | Selenium WebDriver | Cypress | Appium | Protractor"
  expect(response.body.message).to.eq('Informe ao menos uma ferramenta que você conhece dentre: Robot Framework | Selenium WebDriver | Cypress | Appium | Protractor');

    })

  })

})



})