import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import dts from 'vite-plugin-dts'
// console.log(process.env);
export default defineConfig(({command, mode}) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isLibMode = env.BUILDTYPE === 'lib'
  console.log(env.BUILDTYPE);
  let buildOption = isLibMode ? {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'index',
    }
  } : {
  }
  const config = {
    plugins: [dts()],
    build: buildOption
  }

  if (!isLibMode) {
    config.base = './'
  }


  return config
})
