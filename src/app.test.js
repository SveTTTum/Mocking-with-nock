/* eslint-disable no-undef */
const nock = require('nock')
const userDataHandler = require('./data_handlers/user_data_handler')

beforeEach(async () => {
  const usersResponse = [{
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: { lat: '-37.3159', lng: '81.1496' }
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: { name: 'Romaguera-Crona', catchPhrase: 'Multi-layered client-server neural-net', bs: 'harness real-time e-markets' }
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: { lat: '-43.9509',lng: '-34.4618' }
    },
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    company: { name: 'Deckow-Crist', catchPhrase: 'Proactive didactic contingency', bs: 'synergize scalable supply-chains' }
  }]
  nock('http://localhost:3000')
    .get('/users')
    .reply(200, usersResponse)
  await userDataHandler.loadUsers()
})

test('verify that users loaded successful', async () => {
  expect(userDataHandler.users[0].username).toEqual('Bret')
})

test('verify number of users', async () => {
  expect(userDataHandler.getNumberOfUsers()).toBe(2)
})

test('verify user emails list', async () => {
  expect(userDataHandler.getUserEmailsList()).toBe('Sincere@april.biz;Shanna@melissa.tv')
})

test('find user by parameters', async () => {
  const user = {
    id: 2,
    name: 'Ervin Howell'
  }
  expect(userDataHandler.findUsers(user)).toEqual([{"address": {"city": "Wisokyburgh", "geo": {"lat": "-43.9509", "lng": "-34.4618"}, 
  "street": "Victor Plains", "suite": "Suite 879", "zipcode": "90566-7771"}, "company": {"bs": "synergize scalable supply-chains", "catchPhrase": "Proactive didactic contingency", "name": "Deckow-Crist"}, "email": "Shanna@melissa.tv", "id": 2, "name": "Ervin Howell", "phone": "010-692-6593 x09125", "username": "Antonette", "website": "anastasia.net"}])
})
