import antfu from '@antfu/eslint-config';

export default antfu({
  // Only code is linted: the lint scripts target src, and non-code formats are off
  jsonc: false,
  yaml: false,
  toml: false,
  markdown: false,
  react: true,
  nextjs: true,
  typescript: true,
  stylistic: {
    quotes: 'single',
    semi: true,
    // `commaDangle` is not forwarded by @antfu/eslint-config, so it is set as a rule
    overrides: {
      'style/comma-dangle': ['error', 'always-multiline'],
    },
  },
});
