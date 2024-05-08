import merge from 'webpack-merge';
import commonConfig from './webpack.common';

module.exports = (envVars: any) => {
  const { env } = envVars;
  const envConfig = require(`./webpack.${env}.ts`);
  const config = merge(commonConfig, envConfig);

  return config;
};
