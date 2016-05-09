import React from 'react';

import createStore from 'lib/createStore';
import { Provider } from 'react-redux';

import HelloApp from 'components/HelloApp/HelloApp';

const store = createStore();

class App extends React.Component {

  render() {
    return (
      <Provider {...{ store }}>
        <HelloApp/>
      </Provider>
    );
  }
}

export default App;
