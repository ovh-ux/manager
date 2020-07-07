const TARGET = {
  eu: 'https://www.ovh.com',
  ca: 'https://ca.ovh.com',
  us: 'https://us.ovhcloud.com',
};

module.exports = (region) => ({
  target: TARGET[region.toLowerCase()],
  context: ['/engine', '/auth'],
  changeOrigin: true,
  logLevel: 'silent',
});
