import React from 'react';
import {Text} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import ApplicationNavigation from './Navigators/Application';

import {persistor, store} from './Store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <ApplicationNavigation />
      </PersistGate>
    </Provider>
  );
}

export default App;
