module.exports = ({ env }) => ({
  endpoint: env('PLATFORM_ENDPOINT', ''),
  token: env('PLATFORM_TOKEN', ''),
});
