import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   https: true, // מפעיל HTTPS
  //   port: 5173,
  //   // אופציונלי: שימוש בתעודה אישית
  //   // https: {
  //   //   key: fs.readFileSync('./certs/key.pem'),
  //   //   cert: fs.readFileSync('./certs/cert.pem')
  //   // }
  // }
})
