let sessionStorageMock = (() => {
  let store = {}
  return {
    getItem: (key) => {
      return store[key]
    },
    setItem: (key, value) => {
      store[key] = value.toString()
    },
    clear: () => {
      store = {}
    }
  }
})()
Object.defineProperty(window, 'sessionStorage', {
  writable: true,
  value: sessionStorageMock
})
