<script setup lang="ts" vapor>
import { useTheme } from './composables/useTheme'

const { isDark } = useTheme()
</script>

<template>
  <span>Theme: {{ isDark ? 'dark' : 'light' }}</span>
  <button @click="isDark = !isDark">Toggle</button>
</template>

<style scoped></style>
