const { withNxMetro } = require('@nx/expo');
const { getDefaultConfig } = require('@expo/metro-config');
const { mergeConfig } = require('metro-config');
const { withNativeWind } = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const customConfig = {
  cacheVersion: '@hannature-system/mobile',
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'cjs', 'mjs', 'svg'],
    // Workspace libs (e.g. @hannature/ui) target NodeNext, so their barrel
    // files use explicit `./Foo.js` imports. Without this, Metro takes the
    // `.js` literally and never tries `Foo.native.tsx`, which silently picks
    // the web variant on native and crashes at render time.
    resolveRequest: (context, moduleName, platform) => {
      if (
        (moduleName.startsWith('./') || moduleName.startsWith('../')) &&
        moduleName.endsWith('.js')
      ) {
        try {
          return context.resolveRequest(
            context,
            moduleName.slice(0, -3),
            platform,
          );
        } catch {
          // fall through to the default resolver below
        }
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

const nxConfig = withNxMetro(mergeConfig(defaultConfig, customConfig), {
  // Change this to true to see debugging info.
  // Useful if you have issues resolving modules
  debug: false,
  // all the file extensions used for imports other than 'ts', 'tsx', 'js', 'jsx', 'json'
  extensions: [],
  // Specify folders to watch, in addition to Nx defaults (workspace libraries and node_modules)
  watchFolders: [],
});

module.exports = withNativeWind(nxConfig, {
  input: './global.css',
  configPath: './tailwind.config.ts',
});
