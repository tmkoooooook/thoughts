Object.defineProperty(window, 'confirm', {
  writable: true,
  value: jest.fn().mockImplementation(confirm => confirm = true)
})
