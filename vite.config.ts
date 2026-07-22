import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Cast config to any to allow non-standard properties (e.g. vitest's `test`) without type errors
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
  },
} as any)