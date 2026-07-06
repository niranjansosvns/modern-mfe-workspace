const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'profileMfe',
  exposes: {
    // Public identification key : Local source code path
    './Routes': './projects/profile-mfe/src/app/app.routes.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    'shared-assets': { singleton: true, import: 'shared-assets' }
  },
});
