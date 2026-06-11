import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        courses: resolve(__dirname, 'courses.html'),
        calendar: resolve(__dirname, 'calendar.html'),
        courseDetail: resolve(__dirname, 'course-detail.html'),
        grades: resolve(__dirname, 'grades.html'),
        files: resolve(__dirname, 'files.html'),
      }
    }
  }
})
