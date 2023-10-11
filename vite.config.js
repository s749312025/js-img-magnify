import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import dts from 'vite-plugin-dts'
// console.log(process.env);
export default defineConfig(({command, mode}) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log(env.BUILDTYPE);
  let buildOption = env.BUILDTYPE === 'lib' ? {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'index',
    }
  } : {}
  console.log(buildOption);
  return {
    plugins: [dts()],
    build: buildOption
  }
})
