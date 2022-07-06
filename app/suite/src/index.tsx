import { createRoot } from 'react-dom/client';
import './index.css';

import App from './App';

const el = document.getElementById('app') as HTMLElement;

createRoot(el).render(<App></App>);
