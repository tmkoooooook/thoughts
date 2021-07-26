export default {
  get: () => Promise.resolve({ data: 'value' }),
  post: jest.fn(),
  delete: jest.fn(),
  patch: jest.fn(),
  put: jest.fn()
}
