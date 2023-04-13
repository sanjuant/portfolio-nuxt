<template>
  <ColorScheme tag="div">
    <div class="switch-container">
      <input
          type="checkbox"
          id="theme-switch"
          class="theme-switch"
          @change="toggleTheme"
          :checked="$colorMode.preference === 'dark'"
      />
      <label for="theme-switch" class="theme-switch-label border-2 border-indigo-300 dark:border-indigo-500">
        <span class="switch-thumb bg-indigo-300 dark:bg-indigo-500">
          <span v-if="$colorMode.preference === 'dark'" class="dark-image">
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#f1f5f9">
              <path
                  d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73 8.15 8.15 0 0 1-8.14-8.1 8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 14 11.69 1 1 0 0 0-.36-1.05Zm-9.5 6.69A8.14 8.14 0 0 1 7.08 5.22v.27a10.15 10.15 0 0 0 10.14 10.14 9.79 9.79 0 0 0 2.1-.22 8.11 8.11 0 0 1-7.18 4.32Z"/>
            </svg>
          </span>
          <span v-else class="light-image">
            <svg width="18" height="18" viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg" fill="#111827">
              <path
                  d="M10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-15a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zM1 9h2a1 1 0 1 1 0 2H1a1 1 0 0 1 0-2zm16 0h2a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2zm.071-6.071a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM5.757 14.243a1 1 0 0 1 0 1.414L4.343 17.07a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM4.343 2.929l1.414 1.414a1 1 0 0 1-1.414 1.414L2.93 4.343A1 1 0 0 1 4.343 2.93zm11.314 11.314 1.414 1.414a1 1 0 0 1-1.414 1.414l-1.414-1.414a1 1 0 1 1 1.414-1.414z"/>
            </svg>
          </span>

        </span>
      </label>

    </div>
  </ColorScheme>
</template>

<script setup>
import {onMounted} from 'vue'

const colorMode = useColorMode()

const setTheme = (theme) => {
  colorMode.value = theme
  colorMode.preference = theme
}

const toggleTheme = () => {
  setTheme(colorMode.value === 'light' ? 'dark' : 'light')
}

onMounted(() => {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
  if (colorMode.preference === 'system' && prefersDarkScheme.matches || colorMode.value === 'dark') {
    setTheme('dark')
  } else {
    setTheme('light')
  }

  prefersDarkScheme.addEventListener('change', (e) => {
    setTheme(e.matches ? 'dark' : 'light')
  })
})
</script>

<style>
.switch-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
}

.theme-switch {
  display: none;
}

.theme-switch-label {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
  height: 100%;
  width: 24px;
  background-color: transparent;
  border-radius: 12px;
  box-sizing: border-box;
}

.light-image,
.dark-image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.switch-thumb {
  position: absolute;
  top: -2px;
  left: -2px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  transition: transform 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.theme-switch:checked + .theme-switch-label .switch-thumb {
  transform: translateY(100%);
}
</style>
