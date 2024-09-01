
// Biblioteca faker para geração de massa de testes
import { faker } from '@faker-js/faker';

/* Variáveis */

const ferramentasDisponiveis = [
  'Robot Framework',
  'Selenium WebDriver',
  'Cypress',
  'Appium',
  'Protractor'
];

const ferramentasSelecionadas = ferramentasDisponiveis.sort(() => 0.5 - Math.random()).slice(0, 2);


// Função para gerar dados completos de cliente
Cypress.Commands.add('bodyNewClient', () => {
  return {
    nome: faker.person.firstName(),
    email: faker.internet.email(),
    fone: faker.phone.number(),
    fotoPerfil: faker.internet.url(),
    cep: faker.location.zipCode(),
    endereco: faker.location.streetAddress(),
    complemento: faker.lorem.text(5),
    pais: faker.location.country(),
    genero: faker.person.gender(),
    ferramentas: [ferramentasSelecionadas]
  };
});

