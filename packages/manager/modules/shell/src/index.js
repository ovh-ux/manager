export default function bootstrapShellApplication({
  app,
  redirectToShell,
  useAppPrefix,
}) {
  /* redirect to shell if not inside iframe */
  if (window.self === window.top) {
    redirectToShell();
  }

  /* notify shell on hash change */
  window.addEventListener('hashchange', () => {
    window.parent.postMessage(
      {
        type: 'sync',
        hash: window.location.hash,
        app,
      },
      '*', // @TODO replace '*' with valid host
    );
  });

  /* listen for url refresh message */
  window.addEventListener('message', ({ data }) => {
    switch (data.type) {
      case 'refresh': {
        let target = '';
        if (useAppPrefix && data.app !== app) {
          target += `/${data.app}/`;
        }
        if (data.hash !== window.location.hash) {
          target += data.hash;
        }
        if (target) {
          window.location.replace(target);
        }
        break;
      }
      default:
        break;
    }
  });
}
