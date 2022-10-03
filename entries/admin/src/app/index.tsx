import { createRoot } from 'react-dom/client';

import { initMainApi } from 'admin/shared/api';
import { App } from 'admin/app/App';

const container = document.querySelector('#app');

if (!container) {
  throw new Error('container is not defined');
}

(async () => {
  const root = createRoot(container);

  await initMainApi();

  root.render(<App />);
})();
