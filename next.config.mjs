import('./env.mjs');
import pkg from './package.json' assert { type: 'json' };
import ChildProcess from 'child_process';

// starts a command line process to get the git hash
const commitHash = () => {
  try {

    return ChildProcess
      .execSync('git log --pretty=format:"%h" -n1')
      .toString()
      .trim();

  } catch (error) {
    // eslint-disable-next-line no-console
    console.info('Error getting the git hash:', error);
    return 'Unknown';
  }

}

/** @type {import("next").NextConfig} */
const config = {
  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    webpackBuildWorker: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(jpe?g|png|svg|gif|ico|eot|ttf|woff|woff2|mp4|pdf|webm|txt|wav)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/chunks/[path][name].[hash][ext]'
      },
    });

    return config;
  },
  env: {
    // add the package.json version and git hash to the environment
    APP_VERSION: pkg.version,
    COMMIT_HASH: commitHash(),
  }
};
export default config;
