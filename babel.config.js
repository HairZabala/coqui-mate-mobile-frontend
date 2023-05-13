module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json', '.bin'],
        alias: {
          '@components': './src/components',
          '@containers': './src/containers',
          '@navigators': './src/navigators',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@assets': './assets',
          '@features': './src/features',
        },
      },
    ],
  ],
};
