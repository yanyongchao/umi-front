import {
  defineConfig,
  presetIcons,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
    presetIcons(),
  ],
  theme: {
    colors: {
      brand: '#0078E7',
    },
  },
  transformers: [transformerDirectives(), transformerVariantGroup()]
})
