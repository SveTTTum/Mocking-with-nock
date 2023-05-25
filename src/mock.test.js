/* eslint-disable no-undef */
const userDataHandler = require('./data_handlers/user_data_handler')
const axios = require('axios')

const usersResponse = [{
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz'
},
{
  id: 2,
  name: 'Ervin Howell',
  username: 'Antonette',
  email: 'Shanna@melissa.tv',
}]

jest.mock('axios')

test('get fails for loadUsers()', async () => {
  axios.get.mockRejectedValue(new Error('Custom error'))
  const handler = () => userDataHandler.loadUsers()

  expect(handler).rejects.toThrow('Failed to load users data: Error: Custom error')
})

test('get fails for getUserEmailsList()', async () => {
  axios.get.mockResolvedValue({
    data: [
    ]
  })
  await userDataHandler.loadUsers()
  expect(() => userDataHandler.getUserEmailsList()).toThrow('No users loaded!')
})

test('get fails for findUsers() without parameters', async () => {
  axios.get.mockResolvedValue({
    data: usersResponse
  })
  await userDataHandler.loadUsers()
  expect(() => userDataHandler.findUsers()).toThrow('No search parameters provoded!')
})

test('get fails for findUsers() without users', async () => {
  axios.get.mockResolvedValue({
    data: [
    ]
  })
  await userDataHandler.loadUsers()
  expect(() => userDataHandler.findUsers('Svetlana')).toThrow('No users loaded!')
})

test('get fails for findUsers() by incorrect parameter', async () => {
  axios.get.mockResolvedValue({
    data: usersResponse
  })
  await userDataHandler.loadUsers()
  expect(() => userDataHandler.findUsers('Svetlana')).toThrow('No matching users found!')
})
