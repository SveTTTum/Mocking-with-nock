/* eslint-disable no-undef */
const userDataHandler = require('./data_handlers/user_data_handler')
const axios = require('axios')

jest.mock('axios')

test('get fails', async () => {
  axios.get.mockRejectedValue(new Error('Custom error'))
  const handler = () => userDataHandler.loadUsers()

  expect(handler).rejects.toThrow('Failed to load users data: Error: Custom error')
})
