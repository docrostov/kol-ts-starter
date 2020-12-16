module.exports = function (api) {
  api.cache(true);
  return {
    exclude: ['node_modules/libram/kolmafia.d.ts'],
    presets: [
      '@babel/preset-typescript',
      [
        '@babel/preset-env',
        {
          targets: { rhino: '1.7' },
        },
      ],
    ],
    plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread'],
  };
};