<script setup lang="ts" vapor>
import { useTheme } from './composables/useTheme'

const { isDark } = useTheme()
</script>

<template>
  <span>Theme: {{ isDark }}</span>
  <button @click="isDark = !isDark">Invert</button>
</template>

<style scoped></style>
