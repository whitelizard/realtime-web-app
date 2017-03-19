export default {
  title: 'Realtime Portal',
  basename: '/',
  startPage: '/overview',
  backend: {
    // url: 'ws://217.212.3.13/wsh',
    // tenant: '',
    serverAddress: 'ws://archmage.se/wsh',
    tenant: '',
  },
  i18n: {
    default: 'en',
    supported: ['en', 'se'],
  },
  formats: {
    time: {
      short: {
        hour: 'numeric',
        minute: 'numeric',
      },
      exact: {
        hour: 'numeric',
        minute: 'numeric',
      },
    },
  },
};
