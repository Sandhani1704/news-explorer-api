const allowedCors = [
    'https://sandhani1704.github.io/news-explorer-frontend/',
    'https://news-explorer-api.nomoredomains.work/',
    'http://news-explorer-api.nomoredomains.work/',
    'localhost:3000',
  ];
  
  module.exports.requestCors = (req, res, next) => {
    const { origin } = req.headers;
  
    if (allowedCors.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
  
    const { method } = req;
    const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
    const requestHeaders = req.headers['access-control-request-headers'];
  
    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
      return res.end();
    }
  
    return next();
  };
