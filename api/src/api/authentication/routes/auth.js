module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/auth/login',
      handler: 'auth.login',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/auth/linkAllUser',
      handler: 'auth.linkAllUser',
      config: {
        auth: false,
      },
    },
  ],
};
