export const useColorMode = () => {
  const colorMode = useState<'light' | 'dark'>('color-mode', () => 'light')

  const applyMode = (mode: 'light' | 'dark') => {
    if (process.client) {
      // Always remove both classes first
      document.documentElement.classList.remove('light', 'dark')
      // Always add the explicit class
      document.documentElement.classList.add(mode)
    }
  }

  const setColorMode = (mode: 'light' | 'dark') => {
    colorMode.value = mode
    
    if (process.client) {
      applyMode(mode)
      
      // Save to localStorage
      localStorage.setItem('nuxt-color-mode', mode)
    }
  }

  const toggleColorMode = () => {
    const nextMode = colorMode.value === 'light' ? 'dark' : 'light'
    setColorMode(nextMode)
  }

  // Initialize on client side
  if (process.client) {
    onMounted(() => {
      // Check localStorage first
      const stored = localStorage.getItem('nuxt-color-mode') as 'light' | 'dark' | null
      
      let initialMode: 'light' | 'dark'
      
      if (stored) {
        // Use stored preference
        initialMode = stored
      } else {
        // Use system preference as default
        initialMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      
      colorMode.value = initialMode
      applyMode(initialMode)
      
      // Listen for system preference changes (only if no manual preference is stored)
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleSystemChange = (e: MediaQueryListEvent) => {
        // Always follow system changes and save them (like Nuxt 3 behavior)
        const newMode = e.matches ? 'dark' : 'light'
        colorMode.value = newMode
        applyMode(newMode)
        // Save system changes to localStorage
        localStorage.setItem('nuxt-color-mode', newMode)
      }
      
      mediaQuery.addEventListener('change', handleSystemChange)
      
      // Cleanup
      onBeforeUnmount(() => {
        mediaQuery.removeEventListener('change', handleSystemChange)
      })
    })
  }

  return {
    value: colorMode,
    setColorMode,
    toggleColorMode
  }
}