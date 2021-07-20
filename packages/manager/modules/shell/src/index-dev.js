import bootstrapApp from './index';

function redirectToShell() {
  window.location.host = 'localhost:8000';
}

export default function bootstrapShellApplication({ app }) {
  return bootstrapApp({ app, redirectToShell, useAppPrefix: false });
}
