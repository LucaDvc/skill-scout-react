const { legacyCreateProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    legacyCreateProxyMiddleware({
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    '/judge0',
    legacyCreateProxyMiddleware({
      target: process.env.REACT_APP_JUDGE0_HOST,
      changeOrigin: true,
    })
  );
};
