
// Biblioteca faker para geração de massa de testes
import { faker } from '@faker-js/faker';

// Comando personalizado para gerar dados de cliente
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
    ferramentas: [faker.person.jobArea()]
  };
});


