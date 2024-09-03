# Desafio Cypress - API e WEB

Este projeto foi desenvolvido com o intuito de realizar testes automatizados com Cypress em uma API e WEB de cadastros de clientes. 
- A automação de API contempla os testes de **requisições RESTful** do tipo **POST, GET, PUT e DELETE** e gera um relatório de report detalhado com o plugin **mochawesome reporter**.
- A automação WEB contempla recursos de CRUD

## Pré-requisitos

- **Node.js** v18.16.0 ou superior
- **npm** v9.8.0 ou superior

## Instalação
Clone este repositório e navegue até a pasta raiz do projeto.
Execute o seguinte comando para instalar as dependências do projeto: 

- **npm install**

## Execução dos testes
Para executar os testes utilize o seguinte comando:

- **npx cypress run --spec "cypress/e2e/api/*.cy.js"** - Ciclo de testes API

- **npx cypress run --spec "cypress/e2e/web/*.cy.js"** - Ciclo de testes WEB


## Report dos testes
Para visualizar o report dos testes executados navegue até a pasta **"./reports/html"** do projeto.

Exemplo do report:
![image](https://github.com/user-attachments/assets/e6ffa069-90e4-450b-aced-d476c41bd981)

## Issues
Alguns testes estão com descritivo de "Issue #123". Essas Issues estão abertas no repositório para análise.
