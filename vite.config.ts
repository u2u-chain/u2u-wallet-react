import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";
import inject from '@rollup/plugin-inject';
import nodePolyfills from 'vite-plugin-node-stdlib-browser'

export default defineConfig({
  plugins: [
    react(), tsconfigPaths(),
    inject({
      modules: { Buffer: ['buffer', 'Buffer'] }
    }),
    nodePolyfills()
  ],
})
