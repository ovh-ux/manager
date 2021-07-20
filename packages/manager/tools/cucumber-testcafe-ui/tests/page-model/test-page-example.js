const testPage = {
  linkAbout: 'a[href*="about.google"]',
  header: '.header',
};

testPage.linkOurProducts = `${testPage.header} a[title="Our products"]`;

module.exports = testPage;
