import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    sourcemap: false,
  },
  resolve: {
    alias: {
      'react-quill-new/dist/quill.snow.css.map': false,
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
})
