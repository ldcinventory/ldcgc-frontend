import { loadEnv } from "vite"
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
const load = ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const PORT = env.VITE_APP_PORT || '3000'

  return defineConfig({
    plugins: [react()],
    server: {
      open: true,
      port: parseInt(PORT),
      proxy: {
        '/*': '/'
      }
    },
    build: {
      outDir: "build",
      sourcemap: true,
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "src/setupTests",
      mockReset: true,
    },
  });
}

export default load