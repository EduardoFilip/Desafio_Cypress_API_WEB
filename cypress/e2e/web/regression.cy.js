import { faker } from '@faker-js/faker';
import { should } from 'chai';


describe('Testes WEB - Suíte de testes WEB', () => {
  beforeEach(function() {
      cy.visit(Cypress.env('baseUrlWeb'))
  })


 
  it('CT001— Criar uma nova Conta com sucesso', () => {

    // Dado que o usuário criou uma nova conta com sucesso
    const email = faker.lorem.words(3)
    const senha = faker.lorem.word(9)
  
    cy.newClientWeb(email, senha)

    // Quando efetuar o login informando o mesmo email e senha de cadastro
    cy.get('#floatingPassword').type(senha)
    cy.get('button').contains('Acessar').click()

    // Então o sistema deve efetuar o login com sucesso
    // E redirecioná-lo para a página 'app/home'
    cy.url().should('be.equal', `${Cypress.env('baseUrlWeb')}/app/home`)
    cy.get('h1').contains('Gestão de Clientes').should('be.visible')
  
    });

  it('CT002 — Validar criação de uma conta com Email já cadastrado', () => {

    // Dado que o usuário criou uma nova conta com sucesso
    const email = faker.lorem.words(3)
    const senha = faker.lorem.word(9)
   
    cy.newClientWeb(email, senha)

    // Quando tentar criar um novo cadastro com o mesmo email
    cy.get("[href='/app/novaconta']").as('a').contains('Criar uma conta').click()
    cy.url().should('be.equal', `${Cypress.env('baseUrlWeb')}/app/novaconta`)
    cy.get("input[type='email']").type(email + '@email.com')
    cy.get('#floatingPassword').type(senha)
    cy.get('button').contains('Criar conta').click()

    // Então o sistema deve apresentar uma mensagem de erro 'Esse email já está em uso por outra conta'
    // E não permitir a criação da conta
    cy.get('.alert').should('have.text','Esse email já está em uso por outra conta')
   
    });

  it('CT003 — Realizar Login com sucesso', () => {

    // Dado que o usuário criou uma nova conta com sucesso
    const email = faker.lorem.words(3)
    const senha = faker.lorem.word(9)
  
    cy.newClientWeb(email, senha)

    // Quando efetuar o login informando o mesmo email e senha de cadastro
    cy.get('#floatingPassword').type(senha)
    cy.get('button').contains('Acessar').click()

    // Então o sistema deve efetuar o login com sucesso
    // E redirecioná-lo para a página 'app/home'
    cy.url().should('be.equal', `${Cypress.env('baseUrlWeb')}/app/home`)
    cy.get('h1').contains('Gestão de Clientes').should('be.visible')
  
    });

  it('CT004 — Validar Login com senha inválida', () => {

    // Dado que o usuário criou uma nova conta com sucesso
    const email = faker.lorem.words(3)
    const senha = faker.lorem.word(9)
  
    cy.newClientWeb(email, senha)

    // Quando efetuar o login informando o mesmo email e senha incorreta
    cy.visit(Cypress.env('baseUrlWeb'))
    cy.get('.btn').contains('Fazer Login').click()
    cy.get("input[type='email']").clear()
    cy.get("input[type='email']").type(email + '@email.com')
    cy.get('#floatingPassword').type('senhaIncorreta')
    cy.get('button').contains('Acessar').click()

    // Então o sistema deve apresentar uma mensagem de erro 'E-mail ou senha inválida.'
    cy.get('.alert').should('have.text','E-mail ou senha inválida.')

    // E o login não deve ser efetuado
    cy.url().should('be.equal', `${Cypress.env('baseUrlWeb')}/app`)
  
    });

  it('CT005 — Realizar Cadastro de Clientes com sucesso na aba Perfil', () => {

    const email = faker.lorem.words(3)
    const senha = faker.lorem.word(9)
    const nomeCompleto = faker.person.fullName()
    const fone = faker.number.int()
    const cep = faker.location.zipCode("#####-###")
    const numResidencia = faker.number.int(1000)
    const endereco = faker.location.streetAddress()
    const complemento = faker.lorem.word(5)
  
    cy.newClientWeb(email, senha)

    cy.get('#floatingPassword').type(senha)
    cy.get('button').contains('Acessar').click()
    // Dado que o usuário está logado
    cy.url().should('be.equal', `${Cypress.env('baseUrlWeb')}/app/home`)
    cy.get('h1').contains('Gestão de Clientes').should('be.visible')
    // Quando acessar a tab Cadastrar Cliente
    // E preecher todos os dados
    // E salvar
    // Então o sistema deverá cadastrar o novo cliente
    // E retornar para a página "home"
    cy.newClientFormWeb(nomeCompleto, fone, email, cep, numResidencia, endereco, complemento)
  
    });

  it('CT006 — Validar Pesquisa de Cliente recém cadastrado e exibição dos dados em tela', () => {

    const email = faker.lorem.words(3)
    const senha = faker.lorem.word(9)
    const nomeCompleto = faker.person.fullName()
    const fone = faker.number.int()
    const cep = faker.location.zipCode("#####-###")
    const numResidencia = faker.number.int(1000)
    const endereco = faker.location.streetAddress()
    const complemento = faker.lorem.word(5)
  
    cy.newClientWeb(email, senha)

    cy.get('#floatingPassword').type(senha)
    cy.get('button').contains('Acessar').click()
    cy.url().should('be.equal', `${Cypress.env('baseUrlWeb')}/app/home`)
    cy.get('h1').contains('Gestão de Clientes').should('be.visible')

    // Dado que o usuário cadastrou um cliente com sucesso
    cy.newClientFormWeb(nomeCompleto, fone, email, cep, numResidencia, endereco, complemento)
    cy.wait(3000)

    // Quando pesquisar o cliente pelo nome
    cy.get('.form-control.inputSearch').type(nomeCompleto)
    cy.get('#button-addon2').click()
    cy.wait(1000)

    // Então o sistema irá exibir um modal com a foto do cliente
    cy.get('.modal-content-cliente').should('be.visible')
    cy.get('.foto-cliente-modal').should('have.attr', 'alt', nomeCompleto)
    
    // E exibir nome do cliente no modal
    cy.get('.dados_cliente').contains('Nome: ' + nomeCompleto)

    let emailReplace = email
    emailReplace = emailReplace.replace(/\s+/g, '')

    // E exibir o email do cliente no modal
    cy.get('.dados_cliente').contains('E-mail: ' + emailReplace + '@email.com')

    // E exibir o telefone do cliente no modal
    cy.get('.dados_cliente').contains('Telefone: ' + fone)
  
    });


  it('CT007 — Editar Cliente recém cadastrado através do botão na listagem de Clientes', () => {

    const email = faker.lorem.words(3)
    const senha = faker.lorem.word(9)
    const nomeCompleto = faker.person.fullName()
    const fone = faker.number.int()
    const cep = faker.location.zipCode("#####-###")
    const numResidencia = faker.number.int(1000)
    const endereco = faker.location.streetAddress()
    const complemento = faker.lorem.word(5)
  
    cy.newClientWeb(email, senha)

    cy.get('#floatingPassword').type(senha)
    cy.get('button').contains('Acessar').click()
    cy.url().should('be.equal', `${Cypress.env('baseUrlWeb')}/app/home`)
    cy.get('h1').contains('Gestão de Clientes').should('be.visible')

    // Dado que o usuário cadastrou um cliente com sucesso
    cy.newClientFormWeb(nomeCompleto, fone, email, cep, numResidencia, endereco, complemento)
    cy.wait(3000)

    let emailReplace = email
    emailReplace = emailReplace.replace(/\s+/g, '')

    // Quando atualizar o cadastro
    cy.get('tbody').contains('td', emailReplace + '@email.com').parent('tr').find('.fas.fa-edit.icone-acao').click()
    cy.get(`input[value="${nomeCompleto}"]`).type(' testeEdicaoNome')

    // E salvar
    cy.get('.btn').contains('Salvar').click()
    
    // Então o sistema deve aplicar a alteração
    cy.url().should('be.equal', `${Cypress.env('baseUrlWeb')}/app/home`)
    cy.get('tbody').contains('td', nomeCompleto + ' testeEdicaoNome')

    });

  it('CT008 — Excluir Cliente recém cadastrado através do botão “Excluir” na listagem de Clientes', () => {

    const email = faker.lorem.words(3)
    const senha = faker.lorem.word(9)
    const nomeCompleto = faker.person.fullName()
    const fone = faker.number.int()
    const cep = faker.location.zipCode("#####-###")
    const numResidencia = faker.number.int(1000)
    const endereco = faker.location.streetAddress()
    const complemento = faker.lorem.word(5)
  
    cy.newClientWeb(email, senha)

    cy.get('#floatingPassword').type(senha)
    cy.get('button').contains('Acessar').click()
    cy.url().should('be.equal', `${Cypress.env('baseUrlWeb')}/app/home`)
    cy.get('h1').contains('Gestão de Clientes').should('be.visible')

    // Dado que o usuário cadastrou um cliente com sucesso
    cy.newClientFormWeb(nomeCompleto, fone, email, cep, numResidencia, endereco, complemento)
    cy.wait(3000)

    let emailReplace = email
    emailReplace = emailReplace.replace(/\s+/g, '')

    // Quando excluir o cadastro deste cliente através da listagem de clientes
    cy.get('tbody').contains('td', emailReplace + '@email.com').parent('tr').find('i.far.fa-trash-alt.icone-acao.red').click()
    cy.get('.sweet-alert').should('be.visible')
    cy.get('.btn.btn-lg.btn-danger').click()
    cy.wait(2000)

    // Então o sistema deve aplicar a exclusão
    cy.url().should('be.equal', `${Cypress.env('baseUrlWeb')}/app/home`)
    cy.wait(1000)
    cy.get('.form-control.inputSearch').type(nomeCompleto)
    cy.get('#button-addon2').click()
    cy.get('.alert').should('be.visible').and('have.text', 'Cliente não encontrado.')
    
    });

  it('CT009— Validar Cadastro de Clientes com Email inválido na aba Perfil', () => {

    const email = faker.lorem.words(3)
    const senha = faker.lorem.word(9)
    const nomeCompleto = faker.person.fullName()
    const fone = faker.number.int()
    const cep = faker.location.zipCode("#####-###")
    const numResidencia = faker.number.int(1000)
    const endereco = faker.location.streetAddress()
    const complemento = faker.lorem.word(5)
  
    cy.newClientWeb(email, senha)

    cy.get('#floatingPassword').type(senha)
    cy.get('button').contains('Acessar').click()
    // Dado que o usuário está logado
    cy.url().should('be.equal', `${Cypress.env('baseUrlWeb')}/app/home`)
    cy.get('h1').contains('Gestão de Clientes').should('be.visible')

    // Quando acessar a tab Cadastrar Cliente
    // E preecher os dados completos mas com email incorreto
    cy.newClientFormWeb(nomeCompleto, fone, "", cep, numResidencia, endereco, complemento)

    // E clicar em salvar
    cy.get('button').contains('Salvar').click()

    // Então o sistema deve focar no campo email e exibir uma mensagem de erro "Insira uma parte seguida por "@". "@email.com" está incompleto."
    cy.get(':nth-child(2) > .row > :nth-child(2) > .form-control').should('be.focused')

  });

  it('CT010 — Validar preenchimento de campos obrigatórios na aba Perfil', () => {

    const email = faker.lorem.words(3)
    const senha = faker.lorem.word(9)
    const nomeCompleto = faker.person.fullName()
    const fone = faker.number.int()
    const cep = faker.location.zipCode("#####-###")
    const numResidencia = faker.number.int(1000)
    const endereco = faker.location.streetAddress()
    const complemento = faker.lorem.word(5)
  
    cy.newClientWeb(email, senha)

    cy.get('#floatingPassword').type(senha)
    cy.get('button').contains('Acessar').click()

    // Dado que o usuário está logado
    cy.url().should('be.equal', `${Cypress.env('baseUrlWeb')}/app/home`)
    cy.get('h1').contains('Gestão de Clientes').should('be.visible')

    // Quando acessar a tab Cadastrar Cliente
    // E não preencher os campos de cadastro
    cy.get('a.nav-link').contains('Cadastrar Cliente').click()
    
    // Então o botão de salvar deve estar desabilitado
    cy.get('button').contains('Salvar').should('be.disabled')


    });
    

  /* CT011- WIP
  it('CT011— Validar download XML na aba Fiscal e preenchimento dos campos através do XML', () => {

    // Dado que o usuário criou uma nova conta com sucesso
    const email = faker.lorem.words(3)
    const senha = faker.lorem.word(9)

    
    const cnpjDeclarante = faker.number.int()
    const tipoDeclarado = faker.number.int(1000)
    const niDeclarado = faker.number.int(1000)
    const paisEmissaoNIF = 'Brasil'
    const nomeDeclarado = faker.lorem.words(2)
    const nomePJ = faker.lorem.words(3)
    const endereco = faker.location.streetAddress()
    const paisBr = 'Brasil'
    const titulo = faker.lorem.words(3)
    const primeiroNome = faker.person.firstName()
    const nomeMeio = faker.person.firstName()
    const prefixo = faker.lorem.words(1)
    const ultimoNome = faker.person.lastName()
  
    cy.newClientWeb(email, senha)

    // Quando efetuar o login informando o mesmo email e senha de cadastro
    cy.get('#floatingPassword').type(senha)
    cy.get('button').contains('Acessar').click()

    // Então o sistema deve efetuar o login com sucesso
    // E redirecioná-lo para a página 'app/home'
    cy.url().should('be.equal', `${Cypress.env('baseUrlWeb')}/app/home`)
    cy.get('h1').contains('Gestão de Clientes').should('be.visible')

    cy.get('a.nav-link').contains('Fiscal').click()

    cy.get('#cnpjDeclarante').type(cnpjDeclarante)
    cy.get('#tipoDeclarado').type(tipoDeclarado)
    cy.get('#niDeclarado').type(niDeclarado)
    cy.get('#paisEmissaoNIF').type(paisEmissaoNIF)
    cy.get('#nomeDeclarado').type(nomeDeclarado)
    cy.get('#nomePJ').type(nomePJ)
    cy.get('#endereco').type(endereco)
    cy.get('#pais').type(paisBr)
    cy.get('#titulo').type(titulo)
    cy.get('#primeiroNome').type(primeiroNome)
    cy.get('#nomeMeio').type(nomeMeio)
    cy.get('#prefixo').type(prefixo)
    cy.get('#ultimoNome').type(ultimoNome)
  
    });
*/


  /* CT012 - WIP
  
  CT012 — Validar importar arquivo XLS e exibição dos dados na aba Gerenciador de Arquivos */

  /* CT013 - WIP
  
  CT013 — Validar preenchimento “Informações do Candidato” ao clicar em “Finalizar e Enviar” */

  /* CT014 - wip
  CT014— Recuperar senha de acesso

*/

it('CT015 — Realizar Logout com sucesso ao clicar em “Finalizar”', () => {

  const email = faker.lorem.words(3)
  const senha = faker.lorem.word(9)

  cy.newClientWeb(email, senha)

  cy.get('#floatingPassword').type(senha)
  cy.get('button').contains('Acessar').click()

  // Dado que o usuário está logado
  cy.url().should('be.equal', `${Cypress.env('baseUrlWeb')}/app/home`)
  cy.get('h1').contains('Gestão de Clientes').should('be.visible')

  // Quando clicar realizar o logout com sucesso
  cy.get('.navbar-finalizar > .nav-link').contains('Finalizar').click({force: true})
  cy.get('.modal-finalizar').should('be.visible')
  cy.wait(1000)
  cy.get('button').contains('Logout').click()

  // Então o sistema deve efetuar o logout e redirecioná-lo para a página de login
  cy.url().should('be.equal', `${Cypress.env('baseUrlWeb')}/app`)





  });





});



  
 