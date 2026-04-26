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

// Workspace libs (@hannature/ui) target NodeNext, so their compiled barrels
// use explicit `./Foo.js` imports. When that file exists (it does, in dist/),
// Metro treats it as fully resolved and never tries the `.native.js` sibling
// — so the web Button (raw <button>) gets bundled on iOS and the app crashes
// at render time. Wrap Nx's resolver: on native platforms, try `Foo.native.js`
// first, then fall back to the original request.
const nxResolveRequest = nxConfig.resolver.resolveRequest;

const wrappedResolveRequest = (context, moduleName, platform) => {
  if (
    platform &&
    platform !== 'web' &&
    (moduleName.startsWith('./') || moduleName.startsWith('../')) &&
    moduleName.endsWith('.js') &&
    !moduleName.endsWith('.native.js')
  ) {
    const nativeVariant = `${moduleName.slice(0, -3)}.native.js`;
    try {
      return nxResolveRequest(context, nativeVariant, platform);
    } catch {
      // fall through to the original request
    }
  }
  return nxResolveRequest(context, moduleName, platform);
};

const finalConfig = {
  ...nxConfig,
  resolver: {
    ...nxConfig.resolver,
    resolveRequest: wrappedResolveRequest,
  },
};

module.exports = withNativeWind(finalConfig, {
  input: './global.css',
  configPath: './tailwind.config.ts',
});
