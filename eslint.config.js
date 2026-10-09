import antfu from '@antfu/eslint-config';

export default antfu({
  react: true,
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
