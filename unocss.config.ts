import {
  defineConfig,
  presetIcons,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'
import { themeVars } from './src/plugins/theme';

export default defineConfig({
  presets: [
    presetWind3(),
    presetIcons(),
  ],
  theme: {
    colors: {
      ...themeVars.colors,
    },
  },
  transformers: [transformerDirectives(), transformerVariantGroup()]
})
