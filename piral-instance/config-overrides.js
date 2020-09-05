const webpack = require("webpack");
const { PiralInstanceWebpackPlugin } = require('piral-instance-webpack-plugin');
const piralPkg = require('./package.json');

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function(config, env) {
    console.log('running custom webpack config from config-overrides.js');
    
    const EnvironmentPlugin = webpack.EnvironmentPlugin;
    config.plugins.push(new EnvironmentPlugin({ SC_ATTR: "data-hp-styles" }));

    // Configure PiralInstanceWebpackPlugin
    const excludedDependencies = ['piral', 'piral-core', 'piral-base', piralPkg.name];
    const dependencies = piralPkg.pilets && piralPkg.pilets.externals ? piralPkg.pilets.externals : [];
    const externals = dependencies.filter((m) => !excludedDependencies.includes(m));

    config.plugins.push(new PiralInstanceWebpackPlugin({
      name: piralPkg.name,
      version: piralPkg.version,
      externals,
    }));

    // Configure parcel-codegen-loader.
    config.module.rules.push({
      test: /\.codegen$/i,
      use: [
        {
          loader: 'parcel-codegen-loader',
        }
      ]
    })
    console.log('excludedDependencies:');
    console.log(excludedDependencies);
    console.log('dependencies:');
    console.log(dependencies);
    console.log('externals');
    console.log(externals);

    return config;
  },
  // The function to use to create a webpack dev server configuration when running the development
  // server with 'npm run start' or 'yarn start'.
  // Example: set the dev server to use a specific certificate in https.
  devServer: function(configFunction) {
    // Return the replacement function for create-react-app to use to generate the Webpack
    // Development Server config. "configFunction" is the function that would normally have
    // been used to generate the Webpack Development server config - you can use it to create
    // a starting configuration to then modify instead of having to create a config from scratch.
    return function(proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);

      // Change the https certificate options to match your certificate, using the .env file to
      // set the file paths & passphrase.

      // Return your customised Webpack Development Server config.
      return config;
    };
  },
};
