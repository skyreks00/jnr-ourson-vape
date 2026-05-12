import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Changez en '/nom-du-repo/' si votre repo GitHub n'est pas votre site principal
})
