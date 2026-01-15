import { defineConfig } from "wxt"
import Components from "unplugin-vue-components/vite"
import { NaiveUiResolver } from "unplugin-vue-components/resolvers"

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-vue"],

  vite: () => ({
    plugins: [
      Components({
        resolvers: [NaiveUiResolver()],
        dts: "components.d.ts", // 自动生成类型声明，TS/IDE 体验更好
      }),
    ],
  }),
})
