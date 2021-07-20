import config from './config-BUILD'; // eslint-disable-line

/* Initialize iframe starting URL */
const iframe = window.document.querySelector('iframe');
const startingURL = config.getStartingURL();
startingURL.hash = window.location.hash;
iframe.src = startingURL.href;

/* Notify iframe on hashchange or popState event */
function updateURL() {
  const [, app, hash] = (window.location.hash || '').split(/#\/([^/]+)/);
  iframe.contentWindow.postMessage(
    {
      type: 'refresh',
      app,
      hash: `#${hash}`,
    },
    '*',
  );
}
window.addEventListener('hashchange', updateURL);
window.addEventListener('popState', updateURL);

/* Listen for messages */
window.addEventListener(
  'message',
  ({ data }) => {
    switch (data.type) {
      /* iframe url changed */
      case 'sync':
        window.location.replace(`#/${data.app}${data.hash.replace('#', '')}`);
        break;
      /* sso redirection */
      case 'redirect':
        window.location.assign(data.url);
        break;
      default:
        break;
    }
  },
  false,
);
