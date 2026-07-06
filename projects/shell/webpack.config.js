const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  remotes: {
    // Maps the unique namespace to the Remote application port
    "profileMfe": "http://localhost:4201/remoteEntry.js",
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    'shared-assets': { singleton: true, import: 'shared-assets' }
  },
});
