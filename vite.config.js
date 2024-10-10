import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Разрешаем доступ со всех IP
    port: 3000,        // Порт по умолчанию (можете изменить его при необходимости)
  }
})
