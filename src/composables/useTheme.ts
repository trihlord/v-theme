import { ref, watchEffect } from 'vue'

const themeEncoding = {
  marshall(value: boolean) {
    try {
      return JSON.stringify(value)
    } catch {
      // Big integer
    }
    return 'null'
  },
  unmarshall(value: string) {
    try {
      return JSON.parse(value) === true
    } catch {
      // Invalid json
    }
    return false
  },
}

const themeStorage = {
  get() {
    try {
      return localStorage.getItem('isDark') as string
    } catch {
      // No available storage, maybe we are facing safari or private mode
    }
    return null as unknown as string
  },
  set(value: string) {
    try {
      localStorage.setItem('isDark', value)
    } catch {
      // No available storage, maybe we are facing safari or private mode
    }
  },
  remove() {
    try {
      localStorage.removeItem('isDark')
    } catch {
      // No available storage, maybe we are facing safari or private mode
    }
  },
}

export function useTheme() {
  const isDark = ref(themeEncoding.unmarshall(themeStorage.get()))

  watchEffect(() => {
    if (isDark.value) {
      return themeStorage.set(themeEncoding.marshall(isDark.value))
    }
    themeStorage.remove()
  })

  return { isDark }
}
