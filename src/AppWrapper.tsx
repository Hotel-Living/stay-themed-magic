
import { Suspense } from 'react';
import App from './App';

function AppWrapper() {
  return (
    <Suspense fallback={<div>Loading translations...</div>}>
      <App />
    </Suspense>
  );
}

export default AppWrapper;
