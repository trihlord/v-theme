import { onBeforeMount, ref, watch } from 'vue'

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
  const isDark = ref(false)

  watch(isDark, (isDarkValue) => {
    if (isDarkValue) {
      return themeStorage.set(themeEncoding.marshall(isDarkValue))
    }
    themeStorage.remove()
  })

  onBeforeMount(() => {
    isDark.value = themeEncoding.unmarshall(themeStorage.get())
  })

  return { isDark }
}
