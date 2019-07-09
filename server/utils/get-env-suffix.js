module.exports = function getEnvSuffix(AppEnv) {
  switch (AppEnv) {
    case 'demo':
      return '-demo';
    case 'dev':
      return '-dev';
    case 'demo1':
      return '-demo1';
    default:
      return '';
  }
};
