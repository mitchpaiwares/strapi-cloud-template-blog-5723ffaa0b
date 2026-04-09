import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  // Allow ngrok and other external hosts for demo purposes
  return mergeConfig(config, {
    // server: {
    //   host: true,
    //   hmr: {
    //     clientPort: 1337,
    //   },
    //   allowedHosts: [
    //     'localhost',
    //     '.ngrok.io',
    //     '.ngrok-free.app',
    //     '.ngrok-free.dev',
    //     'guillermo-psephological-valorously.ngrok-free.dev',
    //   ],
    // },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  });
};
