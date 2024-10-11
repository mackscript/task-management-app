const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    // Specify the transformer for SVG files
    babelTransformerPath: require.resolve('react-native-svg-transformer'),

    // Optionally, you can set other transformer configurations here
    // For example, enabling minification in production
    // minifierPath: 'metro-minify-terser',
  },
  resolver: {
    // Exclude SVG from asset extensions to treat them as source files
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),

    // Include SVG in source extensions
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
