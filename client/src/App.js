import React from 'react';

import AppContextProvider from 'contexts/AppContextProvider';
import ContextRoutes from 'routes/ContextRoutes';

const App = () => (
  <AppContextProvider>
    <ContextRoutes />
  </AppContextProvider>
);

export default App;
