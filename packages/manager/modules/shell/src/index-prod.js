import bootstrapApp from './index';

function redirectToShell() {
  window.location.pathname = 'shell';
}

export default function bootstrapShellApplication({ app }) {
  return bootstrapApp({ app, redirectToShell, useAppPrefix: true });
}
