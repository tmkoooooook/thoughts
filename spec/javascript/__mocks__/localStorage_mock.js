let localStorageMock = (() => {
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
Object.defineProperty(window, 'localStorage', {
  writable: true,
  value: localStorageMock
})
